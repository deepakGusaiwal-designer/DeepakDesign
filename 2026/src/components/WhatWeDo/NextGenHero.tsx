"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NextGenHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (mountRef.current.childNodes.length > 0) return;

    // ---------------- SCENE ----------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);

    // ---------------- HDR ----------------
    new RGBELoader().load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr",
      (env) => {
        env.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = env;
      },
    );

    // ---------------- LIQUID SHADER BG ----------------
    const bgGeo = new THREE.PlaneGeometry(20, 20);
    const bgMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        void main() {
          vec2 uv = gl_FragCoord.xy / vec2(1920.,1080.);
          float wave = sin(uv.y*10. + time)*0.1;
          float color = smoothstep(0.4,0.5,abs(uv.x-0.5+wave));
          gl_FragColor = vec4(vec3(color),0.15);
        }
      `,
      transparent: true,
    });

    const bg = new THREE.Mesh(bgGeo, bgMat);
    scene.add(bg);

    // ---------------- 3D TEXT ----------------
    const loader = new FontLoader();
    let textMesh: THREE.Mesh;

    loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const geo = new TextGeometry("CREATIVE", {
        font,
        size: 1,
        height: 0.3,
        curveSegments: 12,
      });

      geo.center();

      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.1,
        transmission: 0.4,
        thickness: 0.5,
      });

      textMesh = new THREE.Mesh(geo, mat);
      scene.add(textMesh);

      // 🎥 CAMERA SCROLL ANIMATION
      gsap
        .timeline({
          scrollTrigger: {
            trigger: mountRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
          },
        })
        .to(camera.position, { z: 4 })
        .to(textMesh.rotation, { y: Math.PI }, 0);
    });

    // ---------------- MOUSE RIPPLE ----------------
    const mouse = new THREE.Vector2();
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (textMesh) {
        textMesh.rotation.y = mouse.x * 0.5;
        textMesh.rotation.x = mouse.y * 0.3;
      }
    });

    // ---------------- LOOP ----------------
    const clock = new THREE.Clock();

    const animate = () => {
      bgMat.uniforms.time.value += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // ---------------- CLEANUP ----------------
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
