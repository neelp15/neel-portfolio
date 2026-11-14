
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Robot from "./Robot";

export default function RobotScene({ variant = "about" }) {
  const isHero = variant === "hero";

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobile();

    mediaQuery.addEventListener("change", updateMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateMobile);
    };
  }, []);

  return (
    <div className={`robot-scene robot-scene--${variant}`}>
      <Canvas
        camera={{
          position: isHero ? [0, 0.3, 6.2] : [0, 0.1, 5],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile
            ? "low-power"
            : "high-performance",
        }}
      >
        {/* GENERAL LIGHTING */}
        <ambientLight intensity={1.6} />

        {/* ENVIRONMENT LIGHT */}
        <hemisphereLight
          args={["#c4d5ff", "#29203f", 2]}
        />

        {/* FRONT LIGHT */}
        <directionalLight
          position={[2, 4, 6]}
          intensity={3.5}
          color="#ffffff"
        />

        {/* CYAN SIDE LIGHT */}
        <pointLight
          position={[-3, 2, 4]}
          intensity={12}
          distance={10}
          decay={2}
          color="#00d9ff"
        />

        {/* VIOLET SIDE LIGHT */}
        <pointLight
          position={[3, 2, 4]}
          intensity={14}
          distance={10}
          decay={2}
          color="#a78bfa"
        />

        {/* LOWER ACCENT LIGHT */}
        <pointLight
          position={[0, -2, 3]}
          intensity={6}
          distance={8}
          decay={2}
          color="#8b5cf6"
        />

        {/* BACK LIGHT */}
        <directionalLight
          position={[-2, 1, -3]}
          intensity={1.5}
          color="#7c3aed"
        />

        {/* INTERACTIVE ROBOT */}
        <Suspense fallback={null}>
          <Robot variant={variant} />
        </Suspense>

        {/* BACKGROUND STARS */}
        <Stars
          radius={15}
          depth={10}
          count={isMobile ? 45 : isHero ? 130 : 100}
          factor={1.2}
          saturation={0}
          fade
          speed={0.25}
        />
      </Canvas>
    </div>
  );
}
