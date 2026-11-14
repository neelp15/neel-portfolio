
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";

function EnergyCore() {
  const coreRef = useRef();
  const ringRef = useRef();
  const innerRef = useRef();

  
useFrame((state, delta) => {
  const smoothness = Math.min(1, delta * 4);

  if (coreRef.current) {
    const targetX = state.pointer.y * 0.35;
    const targetY =
      state.pointer.x * 0.55 +
      state.clock.elapsedTime * 0.45;

    coreRef.current.rotation.x +=
      (targetX - coreRef.current.rotation.x) * smoothness;

    coreRef.current.rotation.y +=
      (targetY - coreRef.current.rotation.y) * smoothness;
  }

  if (ringRef.current) {
    ringRef.current.rotation.z += delta * 0.35;
  }

  if (innerRef.current) {
    innerRef.current.rotation.y -= delta * 0.65;
  }
});


  return (
    <Float
  speed={2}
  rotationIntensity={0.35}
  floatIntensity={0.8}
>
      <group ref={coreRef}>

        {/* Main geometric core */}
        <mesh>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshStandardMaterial
            color="#6d28d9"
            emissive="#7c3aed"
            emissiveIntensity={1.4}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner energy sphere */}
        <mesh scale={0.65}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#17102f"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>

        {/* Inner rotating torus */}
        <mesh ref={innerRef}>
          <torusGeometry args={[0.7, 0.018, 16, 100]} />
          <meshBasicMaterial color="#00d9ff" />
        </mesh>

      </group>

      {/* Outer orbit rings */}
      <group ref={ringRef}>
        <mesh rotation={[1.15, 0.2, 0]}>
          <torusGeometry args={[1.9, 0.012, 16, 120]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.8}
          />
        </mesh>

        <mesh rotation={[0.7, 0.8, 0.5]}>
          <torusGeometry args={[2.15, 0.008, 16, 120]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />

      <pointLight
        position={[3, 3, 4]}
        intensity={25}
        color="#8b5cf6"
      />

      <pointLight
        position={[-3, -2, 2]}
        intensity={15}
        color="#00d9ff"
      />

      <EnergyCore />

      {/* Background particles */}
      <Stars
        radius={30}
        depth={30}
        count={450}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="three-scene">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
