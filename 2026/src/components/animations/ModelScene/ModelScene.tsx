"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

export default function ModelParallaxScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // prevent duplicate canvas
    if (mountRef.current.childNodes.length > 0) return;

    // ---------------- SCENE ----------------
    const scene = new THREE.Scene();

    const width = mountRef.current.clientWidth;
    const height = 600;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);

    // ---------------- HDR ENV (REALISM) ----------------
    const rgbeLoader = new RGBELoader();

    rgbeLoader.load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = null; // keep transparent
      },
    );

    // ---------------- LIGHT (SOFT SUPPORT) ----------------
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // ---------------- MODEL ----------------
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;

    loader.load("/models/scene.gltf", (gltf) => {
      model = gltf.scene;

      // 🔥 Apply GLASS MATERIAL
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0,
            transmission: 1, // glass
            thickness: 0.8,
            envMapIntensity: 1.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
          });
        }
      });

      scene.add(model);

      // 🧠 Auto center + scale
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      model.scale.setScalar(scale);
    });

    // ---------------- PARALLAX (FIXED) ----------------
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const container = mountRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      targetX = (x - 0.5) * 0.8;
      targetY = (y - 0.5) * 0.8;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // ---------------- ANIMATION LOOP ----------------
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (model) {
        model.rotation.y = currentX;
        model.rotation.x = -currentY;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // ---------------- RESIZE ----------------
    const handleResize = () => {
      const width = container.clientWidth;
      const height = 600;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // ---------------- CLEANUP ----------------
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "600px",
      }}
    />
  );
}
