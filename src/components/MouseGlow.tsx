import { useEffect, useState } from "react";

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(43 52% 54% / 0.06), transparent 40%)`,
      }}
    />
  );
};

export default MouseGlow;
