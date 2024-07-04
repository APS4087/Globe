import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import earthMap from './assets/textures/earthmap1k.jpg';
import getStarfield from './starfield';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Globe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Adding sunlight
    const sunlight = new THREE.DirectionalLight(0xffffff, 1); // Increased intensity to 1
    sunlight.position.set(-2, 0.5, 1.5);
    scene.add(sunlight);

    // Tilt the globe
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, 12);
    // Changed to MeshPhongMaterial to react to light
    const material = new THREE.MeshPhongMaterial({ 
      map: loader.load(earthMap),
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // Putting stars
    const stars = getStarfield({ numStars: 3000 });
    scene.add(stars);

    camera.position.z = 5;

    // Instantiate OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = function () {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default Globe;