"use client";
import { useState } from "react";

export default function Gallery({ images, caption }) {
  const [i, setI] = useState(0);

  function prev() {
    setI((x) => (x - 1 + images.length) % images.length);
  }
  function next() {
    setI((x) => (x + 1) % images.length);
  }

  return (
    <div>
      <div className="bvFrame">
        <img
          src={images[i]}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <button className="bvArrow bvArrowLeft" onClick={prev} aria-label="Prev">
          ‹
        </button>
        <button className="bvArrow bvArrowRight" onClick={next} aria-label="Next">
          ›
        </button>
      </div>

      <div className="bvCaption">{caption} • {i + 1}/{images.length}</div>
    </div>
  );
}