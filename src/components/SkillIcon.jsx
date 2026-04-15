import { useState } from "react";
import "./SkillIcon.css";

export default function SkillIcon({ name, src, size = 36 }) {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    const initials = name
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div
        className="skill-icon-fallback"
        style={{ width: size, height: size }}
      >
        {initials || name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className="skill-icon-img"
      onError={() => setBroken(true)}
    />
  );
}
