
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  graphite: "#41475e",
  dark: "#202638",
  helmet: "#66718d",
  face: "#080d1c",
  silver: "#aab8d0",
  cyan: "#00e5ff",
  purple: "#a78bfa",
  pink: "#f472d0",
};

/* -----------------------------------------
   ROBOT EYES
----------------------------------------- */

function RobotEye({ position }) {
  return (
    <group position={position}>
      {/* Soft cyan eye glow */}
      <mesh position={[0, 0, -0.015]}>
        <sphereGeometry args={[0.105, 16, 12]} />
        <meshBasicMaterial
          color={COLORS.cyan}
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Bright eye */}
      <mesh>
        <sphereGeometry args={[0.062, 16, 12]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* -----------------------------------------
   ROBOT ARMS
----------------------------------------- */

function RobotArm({ side = 1, armRef }) {
  const accentColor =
    side === 1 ? COLORS.cyan : COLORS.purple;

  return (
    <group
      ref={armRef}
      position={[side * 0.64, 0.18, 0]}
    >
      {/* Shoulder joint */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 12]} />
        <meshStandardMaterial
          color={COLORS.silver}
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>

      {/* Upper arm */}
      <group position={[side * 0.06, -0.3, 0]}>
        <RoundedBox
          args={[0.23, 0.55, 0.29]}
          radius={0.1}
          smoothness={3}
        >
          <meshStandardMaterial
            color={COLORS.graphite}
            metalness={0.55}
            roughness={0.32}
          />
        </RoundedBox>

        {/* Arm accent */}
        <mesh position={[0, -0.06, 0.155]}>
          <boxGeometry args={[0.12, 0.045, 0.015]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* Wrist */}
      <mesh position={[side * 0.06, -0.62, 0]}>
        <sphereGeometry args={[0.105, 16, 12]} />
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Rounded robotic hand */}
      <mesh position={[side * 0.06, -0.76, 0]}>
        <sphereGeometry args={[0.13, 16, 12]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.3}
          roughness={0.3}
          emissive={accentColor}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

/* -----------------------------------------
   MAIN ROBOT
----------------------------------------- */

export default function Robot({ variant = "about" }) {
  const isHero = variant === "hero";

  const robotRef = useRef();
  const headRef = useRef();
  const eyesRef = useRef();

  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const reactorRef = useRef();

  /* -----------------------------------------
     ROBOT ANIMATIONS
  ----------------------------------------- */

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    const mouseX = THREE.MathUtils.clamp(
      state.pointer.x,
      -1,
      1
    );

    const mouseY = THREE.MathUtils.clamp(
      state.pointer.y,
      -1,
      1
    );

    // Frame-rate-independent smoothing
    const smooth = 1 - Math.exp(-5 * delta);

    // Body subtly follows the cursor
    if (robotRef.current) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        mouseX * 0.16,
        smooth
      );

      robotRef.current.rotation.z = THREE.MathUtils.lerp(
        robotRef.current.rotation.z,
        -mouseX * 0.035,
        smooth
      );
    }

    // Head follows the cursor
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.38,
        smooth
      );

      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseY * 0.22,
        smooth
      );
    }

    // Eyes track cursor independently
    if (eyesRef.current) {
      eyesRef.current.position.x = THREE.MathUtils.lerp(
        eyesRef.current.position.x,
        mouseX * 0.035,
        smooth
      );

      eyesRef.current.position.y = THREE.MathUtils.lerp(
        eyesRef.current.position.y,
        mouseY * 0.025,
        smooth
      );
    }

    // Gentle arm movements
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z =
        -0.08 + Math.sin(time * 1.5) * 0.045;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        0.08 - Math.sin(time * 1.5 + 1) * 0.045;
    }

    // Pulsing reactor
    if (reactorRef.current) {
      const pulse =
        1 + Math.sin(time * 2.5) * 0.07;

      reactorRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float
      speed={1.6}
      rotationIntensity={0.08}
      floatIntensity={0.28}
    >
      <group
        ref={robotRef}
        position={
          isHero ? [0, -0.38, 0] : [0, -0.08, 0]
        }
        scale={isHero ? 1.15 : 0.85}
      >
        {/* =====================================
            ROBOT BODY
        ===================================== */}

        <group position={[0, -0.16, 0]}>
          {/* Main body */}
          <RoundedBox
            args={[1.12, 1.12, 0.62]}
            radius={0.23}
            smoothness={3}
          >
            <meshStandardMaterial
              color={COLORS.graphite}
              metalness={0.65}
              roughness={0.28}
            />
          </RoundedBox>

          {/* Front chest armor */}
          <RoundedBox
            args={[0.87, 0.79, 0.1]}
            radius={0.14}
            smoothness={3}
            position={[0, 0.05, 0.36]}
          >
            <meshStandardMaterial
              color={COLORS.dark}
              metalness={0.5}
              roughness={0.32}
            />
          </RoundedBox>

          {/* Chest decorative strips */}
          {[-0.29, 0.29].map((x) => (
            <mesh
              key={x}
              position={[x, 0.22, 0.42]}
            >
              <boxGeometry
                args={[0.035, 0.24, 0.015]}
              />
              <meshBasicMaterial
                color={COLORS.purple}
              />
            </mesh>
          ))}

          {/* =====================================
              CHEST REACTOR
          ===================================== */}

          <group
            ref={reactorRef}
            position={[0, -0.08, 0.44]}
          >
            {/* Outer cyan ring */}
            <mesh>
              <torusGeometry
                args={[0.19, 0.035, 8, 32]}
              />
              <meshStandardMaterial
                color={COLORS.cyan}
                emissive={COLORS.cyan}
                emissiveIntensity={2.5}
                toneMapped={false}
              />
            </mesh>

            {/* Dark reactor center */}
            <mesh position={[0, 0, -0.025]}>
              <circleGeometry args={[0.145, 32]} />
              <meshBasicMaterial
                color={COLORS.face}
              />
            </mesh>

            {/* Purple inner core */}
            <mesh position={[0, 0, 0.01]}>
              <circleGeometry args={[0.09, 32]} />
              <meshBasicMaterial
                color={COLORS.purple}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        </group>

        {/* =====================================
            NECK
        ===================================== */}

        <mesh position={[0, 0.47, 0]}>
          <cylinderGeometry
            args={[0.15, 0.17, 0.2, 16]}
          />
          <meshStandardMaterial
            color={COLORS.silver}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* =====================================
            HEAD
        ===================================== */}

        <group
          ref={headRef}
          position={[0, 0.94, 0.04]}
        >
          {/* Helmet */}
          <RoundedBox
            args={[1.1, 0.82, 0.7]}
            radius={0.24}
            smoothness={3}
          >
            <meshStandardMaterial
              color={COLORS.helmet}
              metalness={0.55}
              roughness={0.27}
            />
          </RoundedBox>

          {/* Face screen */}
          <RoundedBox
            args={[0.9, 0.57, 0.07]}
            radius={0.19}
            smoothness={3}
            position={[0, -0.015, 0.37]}
          >
            <meshStandardMaterial
              color={COLORS.face}
              metalness={0.2}
              roughness={0.18}
            />
          </RoundedBox>

          {/* Eye tracking group */}
          <group
            ref={eyesRef}
            position={[0, 0.045, 0.43]}
          >
            <RobotEye
              position={[-0.21, 0, 0]}
            />

            <RobotEye
              position={[0.21, 0, 0]}
            />
          </group>

          {/* Friendly smile */}
          <mesh
            position={[0, -0.18, 0.416]}
            rotation={[0, 0, Math.PI]}
          >
            <torusGeometry
              args={[0.11, 0.012, 8, 24, Math.PI]}
            />
            <meshBasicMaterial
              color={COLORS.cyan}
            />
          </mesh>

          {/* =====================================
              SIDE PANELS
          ===================================== */}

          {[-1, 1].map((side) => (
            <group
              key={side}
              position={[side * 0.56, 0, 0]}
            >
              <RoundedBox
                args={[0.1, 0.31, 0.32]}
                radius={0.04}
                smoothness={3}
              >
                <meshStandardMaterial
                  color={COLORS.dark}
                  metalness={0.6}
                  roughness={0.3}
                />
              </RoundedBox>

              {/* Side indicator */}
              <mesh
                position={[
                  side * 0.055,
                  0,
                  0.02,
                ]}
              >
                <sphereGeometry
                  args={[0.055, 12, 10]}
                />
                <meshBasicMaterial
                  color={COLORS.purple}
                />
              </mesh>
            </group>
          ))}

          {/* =====================================
              ANTENNA
          ===================================== */}

          {/* Antenna stem */}
          <mesh position={[0, 0.51, 0]}>
            <cylinderGeometry
              args={[0.025, 0.035, 0.3, 12]}
            />
            <meshStandardMaterial
              color={COLORS.silver}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* Glowing antenna tip */}
          <mesh position={[0, 0.69, 0]}>
            <sphereGeometry
              args={[0.075, 16, 12]}
            />
            <meshStandardMaterial
              color={COLORS.cyan}
              emissive={COLORS.cyan}
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* =====================================
            ROBOT ARMS
        ===================================== */}

        <RobotArm
          side={-1}
          armRef={leftArmRef}
        />

        <RobotArm
          side={1}
          armRef={rightArmRef}
        />

        {/* =====================================
            LOWER BODY
        ===================================== */}

        <RoundedBox
          args={[0.7, 0.23, 0.46]}
          radius={0.08}
          smoothness={3}
          position={[0, -0.83, 0]}
        >
          <meshStandardMaterial
            color={COLORS.dark}
            metalness={0.6}
            roughness={0.3}
          />
        </RoundedBox>

        {/* Lower accent */}
        <mesh position={[0, -0.83, 0.245]}>
          <boxGeometry
            args={[0.28, 0.025, 0.012]}
          />
          <meshBasicMaterial
            color={COLORS.purple}
          />
        </mesh>
      </group>
    </Float>
  );
}
