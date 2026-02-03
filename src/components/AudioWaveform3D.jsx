import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';

const AnimatedShape = () => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2.2} ref={meshRef}>
            <MeshDistortMaterial
                color="#C5A059"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
};

const AudioWaveform3D = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#D7E9B9" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F2ECE4" />
                <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                    <AnimatedShape />
                </Float>
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default AudioWaveform3D;
