"use client";
import { useState } from "react";

const items = [
  { text: "React", img: "/images/react.png" },
  { text: "GSAP", img: "/images/gsap.png" },
  { text: "Three.js", img: "/images/three.png" },
];

export default function HoverPreview() {
  const [img, setImg] = useState<string | null>(null);

  return (
    <div className="hover-layer">
      {items.map((item, i) => (
        <span
          key={i}
          onMouseEnter={() => setImg(item.img)}
          onMouseLeave={() => setImg(null)}
        >
          {item.text}
        </span>
      ))}

      {img && <img src={img} className="preview-img" />}
    </div>
  );
}
