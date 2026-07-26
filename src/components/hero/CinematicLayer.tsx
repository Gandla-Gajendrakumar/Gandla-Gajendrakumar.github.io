"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Starfield network over the hero — small blue star points with faint lines
 * connecting nearby stars (constellation / particles-network look), matching
 * the source portfolio. Renders only while the hero + tab are visible.
 * Points, lines, materials, sprite and renderer are all disposed on unmount.
 */
export function CinematicLayer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = isMobile ? 70 : 130;
    const CONNECT = 1.8; // world-unit distance to draw a line
    const CONNECT2 = CONNECT * CONNECT;
    const MAX_SEG = isMobile ? 700 : 1600; // line-segment cap (perf guard)
    const SPREAD_X = 8;
    const SPREAD_Y = 5;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;

    const group = new THREE.Group();
    scene.add(group);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });

    // Soft round star sprite.
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.5)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    })();

    // Stars: position, velocity, colour (mostly blue, some white, rare coral).
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velX = new Float32Array(COUNT);
    const velY = new Float32Array(COUNT);
    const blue = new THREE.Color(0x5b8cff);
    const white = new THREE.Color(0xeaeef7);
    const coral = new THREE.Color(0xff6a3d);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * SPREAD_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * SPREAD_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      velX[i] = (Math.random() - 0.5) * 0.12;
      velY[i] = (Math.random() - 0.5) * 0.12;
      const r = Math.random();
      const col = r < 0.7 ? blue : r < 0.94 ? white : coral;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.14 : 0.12,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    group.add(stars);

    // Line network: preallocated buffer, redrawn each frame via draw range.
    const linePositions = new Float32Array(MAX_SEG * 6);
    const lineGeo = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", linePosAttr);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5b8cff,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Rebuild the line network from current star positions.
    const rebuildLines = () => {
      const pos = starGeo.attributes.position.array as Float32Array;
      let seg = 0;
      for (let i = 0; i < COUNT && seg < MAX_SEG; i++) {
        const xi = pos[i * 3];
        const yi = pos[i * 3 + 1];
        const zi = pos[i * 3 + 2];
        for (let j = i + 1; j < COUNT && seg < MAX_SEG; j++) {
          const dx = xi - pos[j * 3];
          const dy = yi - pos[j * 3 + 1];
          if (dx * dx + dy * dy < CONNECT2) {
            const o = seg * 6;
            linePositions[o] = xi;
            linePositions[o + 1] = yi;
            linePositions[o + 2] = zi;
            linePositions[o + 3] = pos[j * 3];
            linePositions[o + 4] = pos[j * 3 + 1];
            linePositions[o + 5] = pos[j * 3 + 2];
            seg++;
          }
        }
      }
      lineGeo.setDrawRange(0, seg * 2);
      linePosAttr.needsUpdate = true;
    };

    // Sizing.
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer parallax (off for reduced motion), smoothed.
    const target = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    // Render gating.
    let heroVisible = true;
    const io = new IntersectionObserver(([entry]) => (heroVisible = entry.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(mount);
    let docVisible = !document.hidden;
    const onVis = () => (docVisible = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    const clock = new THREE.Clock();

    if (reduced) {
      // Static constellation, no motion.
      rebuildLines();
      renderer.render(scene, camera);
    } else {
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!heroVisible || !docVisible) return;

        const dt = Math.min(clock.getDelta(), 0.05);
        const pos = starGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          let x = pos[i * 3] + velX[i] * dt;
          let y = pos[i * 3 + 1] + velY[i] * dt;
          // wrap at bounds
          if (x > SPREAD_X) x = -SPREAD_X;
          else if (x < -SPREAD_X) x = SPREAD_X;
          if (y > SPREAD_Y) y = -SPREAD_Y;
          else if (y < -SPREAD_Y) y = SPREAD_Y;
          pos[i * 3] = x;
          pos[i * 3 + 1] = y;
        }
        starGeo.attributes.position.needsUpdate = true;
        rebuildLines();

        pointer.x += (target.x - pointer.x) * 0.04;
        pointer.y += (target.y - pointer.y) * 0.04;
        group.rotation.y = pointer.x * 0.1;
        group.rotation.x = pointer.y * 0.06;

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      starGeo.dispose();
      starMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
