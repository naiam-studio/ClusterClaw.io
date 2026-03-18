
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Fragmented Mesh Geometry
    const geometry = new THREE.IcosahedronGeometry(4, 15);
    const positions = geometry.attributes.position;
    const count = positions.count;
    
    const originalPositions = new Float32Array(positions.array);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Brand Colors: Light Orange (#fb923c), Red (#dc2626), Dark (#0a0a0a)
    const brandColors = [
      new THREE.Color(0xfb923c),
      new THREE.Color(0xdc2626),
      new THREE.Color(0x0a0a0a),
      new THREE.Color(0xfb923c), 
    ];

    for (let i = 0; i < count; i++) {
      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(-100, -100);
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const clickImpact = new THREE.Vector3();
      raycaster.ray.at(5, clickImpact);

      for (let i = 0; i < count; i++) {
        const px = positions.getX(i);
        const py = positions.getY(i);
        const pz = positions.getZ(i);
        
        const dist = clickImpact.distanceTo(new THREE.Vector3(px, py, pz));
        if (dist < 2) {
          const force = (2 - dist) * 0.5;
          velocities[i * 3] += (px - clickImpact.x) * force;
          velocities[i * 3 + 1] += (py - clickImpact.y) * force;
          velocities[i * 3 + 2] += (pz - clickImpact.z) * force;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onClick);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const posArray = positions.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        velocities[idx] += (originalPositions[idx] - posArray[idx]) * 0.02;
        velocities[idx + 1] += (originalPositions[idx + 1] - posArray[idx + 1]) * 0.02;
        velocities[idx + 2] += (originalPositions[idx + 2] - posArray[idx + 2]) * 0.02;

        velocities[idx] *= 0.95;
        velocities[idx + 1] *= 0.95;
        velocities[idx + 2] *= 0.95;

        posArray[idx] += velocities[idx];
        posArray[idx + 1] += velocities[idx + 1];
        posArray[idx + 2] += velocities[idx + 2];

        const wave = Math.sin(time * 0.5 + originalPositions[idx] * 0.5) * 0.002;
        posArray[idx] += wave;
        posArray[idx + 1] += wave;
      }

      positions.needsUpdate = true;
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
};

export default Background3D;
