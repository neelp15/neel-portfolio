
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Robot from "./Robot";

export default function RobotScene({ variant = "about" }) {
  const isHero = variant === "hero";

  return (
    <div className={`robot-scene robot-scene--${variant}`}>
      <Canvas
        camera={{
          position: isHero ? [0, 0.3, 6.2] : [0, 0.1, 5],
          fov: isHero ? 42 : 42,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
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
          count={isHero ? 130 : 100}
          factor={1.2}
          saturation={0}
          fade
          speed={0.25}
        />
      </Canvas>
    </div>
  );
}
