"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "01",
    title: "Experience",
    skills: [
      "UI/UX Design",
      "User Flows",
      "Wireframes",
      "Prototyping",
      "Design Systems",
      "UX Strategy",
    ],
  },
  {
    id: "02",
    title: "Visual",
    skills: [
      "Visual Design",
      "Typography",
      "Color Systems",
      "Layout & Grid",
      "Brand Direction",
      "Pixel Precision",
    ],
  },
  {
    id: "03",
    title: "Motion",
    skills: [
      "Advanced Animations",
      "Micro Interactions",
      "Scroll Experiences",
      "GSAP",
      "Three.js",
      "Shader Effects",
    ],
  },
  {
    id: "04",
    title: "Code",
    skills: [
      "HTML / CSS",
      "JavaScript",
      "React / TSX",
      "Tailwind / CSS",
      "Performance",
      "Responsive Design",
    ],
  },
  {
    id: "05",
    title: "Stack",
    skills: [
      "Figma",
      "After Effects",
      "Blender / Spline",
      "Framer / Webflow",
      "VS Code",
      "Git",
    ],
  },
];

export default function WhatIDoNextGen() {
  const container = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLDivElement[]>([]);
  const scenesNavRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = scenesRef.current;
      const scenesNav = scenesNavRef.current;

      // RESET ALL
      gsap.set(scenes, { opacity: 0, y: 80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${scenes.length * 800}`,
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const index = Math.min(
              scenes.length - 1,
              Math.floor(self.progress * scenes.length),
            );
            scenes.forEach((scene, i) => {
              const nav = scenesNav[i];
              if (i === index) {
                scene.classList.add("active");
                if (nav) nav.classList.add("active");
              } else {
                scene.classList.remove("active");
                if (nav) nav.classList.remove("active");
              }
            });
          },
        },
      });

      scenes.forEach((scene, i) => {
        const words = scene.querySelectorAll(".wordTab");

        // ENTER
        tl.to(scene, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        });

        // WORD ANIMATION
        tl.fromTo(
          words,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.6,
          },
          "<",
        );

        // HOLD
        tl.to({}, { duration: 0.6 });

        // EXIT
        tl.to(scene, {
          opacity: 0,
          y: -80,
          duration: 0.5,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="nextgen-container"
      // style={{ height: `${data.length * 100}vh` }}
    >
      <div className="stickyContainer flex">
        {/* LEFT */}
        <div className="w-1/4 gap-10 flex flex-col justify-center whitespace-nowrap">
          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) scenesNavRef.current[i] = el;
              }}
              className="nav-items gap-2 flex item-start justify-start text-left text-white text-2xl"
            >
              <span>{item.id}</span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="w-3/4 relative">
          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) scenesRef.current[i] = el;
              }}
              className="scene"
            >
              {item.skills.map((skill, j) => (
                <h2 className="text-2xl text-white gap-3 flex" key={j}>
                  {skill.split(" ").map((word, k) => (
                    <span key={k} className="wordTab">
                      {word}
                    </span>
                  ))}
                </h2>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
