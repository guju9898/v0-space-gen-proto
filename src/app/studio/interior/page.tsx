// File: src/app/studio/interior/page.tsx
"use client";
import { useState } from "react";

export default function InteriorStudio() {
  const [wallColor, setWallColor] = useState("White");
  return (
    <section className="py-20 px-4">
      <h2 className="text-2xl font-semibold mb-4">Interior Design Studio</h2>
      <label className="block mb-4">
        <span className="block mb-1 font-medium">Wall Color:</span>
        <select
          className="border rounded px-3 py-2"
          value={wallColor}
          onChange={(e) => setWallColor(e.target.value)}
        >
          <option>White</option>
          <option>Gray</option>
          <option>Blue</option>
        </select>
      </label>
      <p className="mt-4">Selected wall color: <strong>{wallColor}</strong></p>
    </section>
  );
}
