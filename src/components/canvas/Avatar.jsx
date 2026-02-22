import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, Environment, ContactShadows, Float, Sparkles } from "@react-three/drei";
import { useState, Suspense } from "react";
import AvatarModel from "./Avtarmodel";

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "14px" }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function Avatar() {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Lighting */}
        <Environment preset="city" />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-4, 2, -4]} intensity={2} color="#a855f7" />
        <pointLight position={[4, 0, 2]} intensity={1.5} color="#38bdf8" />

        {/* Subtle particles */}
        <Sparkles count={50} scale={4} size={1.2} speed={0.3} color="#a78bfa" opacity={0.4} />

        {/* Gentle floating animation */}
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
          <AvatarModel isInteracting={isInteracting} />
        </Float>

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.4}
          scale={6}
          blur={2.5}
          far={3}
          color="#7c3aed"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          onStart={() => setIsInteracting(true)}
          onEnd={() => setIsInteracting(false)}
        />
      </Suspense>
    </Canvas>
  );
}