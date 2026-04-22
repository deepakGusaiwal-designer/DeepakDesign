"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import gsap from "gsap";

const skills = [
  "React",
  "JavaScript",
  "GSAP",
  "Three.js",
  "HTML",
  "CSS",
  "Animations",
];

export default function InsaneSkillPhysics() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ---------------- SCENE ----------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 600,
      0.1,
      100,
    );
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current?.appendChild(renderer.domElement);

    // ---------------- LIGHT ----------------
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 10, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xff0000, 0.5);
    scene.add(ambient);

    // ---------------- PHYSICS ----------------
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -5.82, 0),
    });

    // FLOOR
    const floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
    });
    floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(floorBody);

    // ---------------- TEXTURE ----------------
    const createTextTexture = (text: string) => {
      const canvas = document.createElement("canvas");
      const size = 512;
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 80px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 2, size / 2);

      return new THREE.CanvasTexture(canvas);
    };

    // ---------------- BALLS ----------------
    const balls: any[] = [];

    skills.forEach((skill) => {
      const radius = 1;

      // THREE mesh
      const geo = new THREE.SphereGeometry(radius, 64, 64);
      const texture = createTextTexture(skill);

      const mat = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.5,
        metalness: 0.5,
        transmission: 0.5, // GLASS 🔥
        thickness: 0.6,
        clearcoat: 1,
      });

      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // CANNON body
      const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Sphere(radius),
        position: new CANNON.Vec3(
          (Math.random() - 0.5) * 6,
          Math.random() * 5 + 5,
          0,
        ),
      });

      world.addBody(body);

      balls.push({ mesh, body });
    });

    // ---------------- DRAG INTERACTION ----------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selected: any = null;

    const onMouseDown = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / 600) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(balls.map((b) => b.mesh));

      if (intersects.length > 0) {
        selected = balls.find((b) => b.mesh === intersects[0].object);
        selected.body.mass = 0; // lock
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!selected) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / 600) * 2 + 1;

      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
      selected.body.position.set(vector.x * 5, vector.y * 5, 0);
    };

    const onMouseUp = () => {
      if (selected) {
        selected.body.mass = 1;
        selected.body.velocity.set((Math.random() - 0.5) * 5, 5, 0);
      }
      selected = null;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // ---------------- GSAP INTRO ----------------
    gsap.from(
      balls.map((b) => b.body.position),
      {
        y: 15,
        stagger: 0.5,
        duration: 1.5,
        ease: "power4.out",
      },
    );

    // ---------------- LOOP ----------------
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      world.step(1 / 60, delta);

      balls.forEach((b) => {
        b.mesh.position.copy(b.body.position);
        b.mesh.quaternion.copy(b.body.quaternion);
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
}
