import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MousePosition {
  x: number;
  y: number;
  worldPos: THREE.Vector3;
}

interface LineRef {
  geometry: THREE.BufferGeometry;
  mesh: THREE.LineSegments;
}

interface Particle extends THREE.Mesh {
  userData: {
    originalPosition: THREE.Vector3;
    velocity: THREE.Vector3;
    originalOpacity: number;
    pulsPhase: number;
    targetScale: number;
    connectionIntensity: number;
  };
}

interface AnimatedNetworkBackgroundProps {
  className?: string;
}

const AnimatedNetworkBackground: React.FC<AnimatedNetworkBackgroundProps> = ({className}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const linesRef = useRef<LineRef | null>(null);
  const mouseRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    worldPos: new THREE.Vector3()
  });
  const mouseParticleRef = useRef<THREE.Mesh | null>(null);
  const mouseConnectionsRef = useRef<LineRef | null>(null);
  const animationRef = useRef<number | null>(null);
  const isMouseOverRef = useRef(false);
  const lastMouseMoveRef = useRef(0);
  const mouseVelocityRef = useRef(new THREE.Vector2(0, 0));
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const connectionIntensityRef = useRef<number[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuration
    const PARTICLE_COUNT = 70;
    const MAX_DISTANCE = 230;
    const MOUSE_INFLUENCE_DISTANCE = 1500;
    const MOUSE_CONNECTION_DISTANCE = 100;
    const MOUSE_FORCE = 0.03;
    const MOUSE_ATTRACTION_FORCE = 0.015;
    const MOUSE_PULSE_INTENSITY = 0.4;
    const CONNECTION_SMOOTHING = 0.15;

    // Initialisation de la scène
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Initialisation du tableau d'intensité des connexions
    connectionIntensityRef.current = new Array(PARTICLE_COUNT).fill(0);

    // Création des particules
    const particles: Particle[] = [];
    const particleGeometry = new THREE.CircleGeometry(2, 16);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const opacity = Math.random() * 0.6 + 0.4;
      const size = Math.random() * 0.7 + 0.7;
      const hue = 0.08; // Orange
      const saturation = 0.85;
      const lightness = 0.5 + Math.random() * 0.3;
      
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, saturation, lightness),
        transparent: true,
        opacity: opacity
      });

      const mesh = new THREE.Mesh(
        particleGeometry, 
        particleMaterial
      );
      
      mesh.position.x = (Math.random() - 0.5) * window.innerWidth;
      mesh.position.y = (Math.random() - 0.5) * window.innerHeight;
      mesh.position.z = (Math.random() - 0.5) * 200;
      
      mesh.scale.setScalar(size);
      
      // Propriétés personnalisées pour l'animation
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          0
        ),
        originalOpacity: opacity,
        pulsPhase: Math.random() * Math.PI * 2,
        targetScale: size,
        connectionIntensity: 0
      };
      
      const particle = mesh as unknown as Particle;
      particles.push(particle);
      scene.add(particle);
    }
    particlesRef.current = particles;

    // Création de la particule curseur
    const mouseParticleGeometry = new THREE.CircleGeometry(10, 32);
    const mouseParticleMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.08, 1, 0.75),
      transparent: true,
      opacity: 0,
      depthTest: false
    });
    
    const mouseParticle = new THREE.Mesh(mouseParticleGeometry, mouseParticleMaterial);
    mouseParticle.position.set(0, 0, 0);
    mouseParticle.visible = false;
    scene.add(mouseParticle);
    mouseParticleRef.current = mouseParticle;

    // Création des lignes de connexion entre particules
    const lineGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
    const colors = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      linewidth: 1
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = { geometry: lineGeometry, mesh: lines };

    // Création des lignes de connexion au curseur
    const mouseLineGeometry = new THREE.BufferGeometry();
    const mousePositions = new Float32Array(PARTICLE_COUNT * 6);
    const mouseColors = new Float32Array(PARTICLE_COUNT * 6);
    
    mouseLineGeometry.setAttribute('position', new THREE.BufferAttribute(mousePositions, 3));
    mouseLineGeometry.setAttribute('color', new THREE.BufferAttribute(mouseColors, 3));
    
    const mouseLineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
      linewidth: 10
    });
    
    const mouseLines = new THREE.LineSegments(mouseLineGeometry, mouseLineMaterial);
    scene.add(mouseLines);
    mouseConnectionsRef.current = { geometry: mouseLineGeometry, mesh: mouseLines };

    // Gestion des événements souris
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveRef.current;
      lastMouseMoveRef.current = now;
      
      const rect = mountRef.current.getBoundingClientRect();
      
      // Position précise relative au canvas
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      
      // Calcul de la vitesse de la souris
      const deltaX = clientX - lastMousePosRef.current.x;
      const deltaY = clientY - lastMousePosRef.current.y;
      // const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (timeSinceLastMove > 0) {
        mouseVelocityRef.current.set(
          deltaX / timeSinceLastMove * 0.5,
          deltaY / timeSinceLastMove * 0.5
        );
      }
      
      lastMousePosRef.current = { x: clientX, y: clientY };
      
      // Conversion en coordonnées normalizées
      mouseRef.current.x = (clientX / rect.width) * 2 - 1;
      mouseRef.current.y = -(clientY / rect.height) * 2 + 1;
      
      // Position 3D exacte du curseur dans le monde
      mouseRef.current.worldPos.set(
        mouseRef.current.x * (rect.width / 2),
        mouseRef.current.y * (rect.height / 2),
        0
      );
      
      // Mise à jour de la position de la particule curseur
      if (mouseParticleRef.current) {
        mouseParticleRef.current.position.copy(mouseRef.current.worldPos);
      }
    };

    const handleMouseEnter = () => {
      isMouseOverRef.current = true;
      if (mouseParticleRef.current) {
        mouseParticleRef.current.visible = true;
        // Animation d'apparition du curseur
        const material = mouseParticleRef.current.material;
        const startTime = Date.now();
        
        const animateIn = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / 300, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          (material as THREE.MeshBasicMaterial).opacity = easeOut * 0.85;
          if (mouseParticleRef.current) {
            mouseParticleRef.current.scale.setScalar(easeOut * 1.2);
          }
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateIn);
          }
        };
        animateIn();
      }
    };

    const handleMouseLeave = () => {
      isMouseOverRef.current = false;
      if (mouseParticleRef.current) {
        // Animation de disparition du curseur
        const material = mouseParticleRef.current.material;
        const startTime = Date.now();
        const startOpacity = (material as THREE.MeshBasicMaterial).opacity;
        const startScale = mouseParticleRef.current.scale.x;
        
        const animateOut = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / 250, 1);
          const easeIn = Math.pow(progress, 2);
          
          (material as THREE.MeshBasicMaterial).opacity = startOpacity * (1 - easeIn);
          if (mouseParticleRef.current) {
            mouseParticleRef.current.scale.setScalar(startScale * (1 - easeIn * 0.5));
            
            if (progress === 1) {
              mouseParticleRef.current.visible = false;
            }
          }
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateOut);
          }
        };
        animateOut();
      }
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    mountRef.current.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Fonction d'animation
    const animate = (time: number) => {
      const t = time * 0.001;
      
      // Animation des particules
      particlesRef.current.forEach((particle, index) => {
        const userData = particle.userData;
        
        // Mouvement naturel
        particle.position.x += userData.velocity.x * 0.8;
        particle.position.y += userData.velocity.y * 0.8;
        
        // Rebond sur les bords
        const boundsX = window.innerWidth / 2;
        const boundsY = window.innerHeight / 2;
        
        if (Math.abs(particle.position.x) > boundsX) {
          userData.velocity.x *= -0.8;
          particle.position.x = Math.sign(particle.position.x) * boundsX * 0.95;
        }
        if (Math.abs(particle.position.y) > boundsY) {
          userData.velocity.y *= -0.8;
          particle.position.y = Math.sign(particle.position.y) * boundsY * 0.95;
        }
        
        // Animation de pulsation
        const pulse = 0.85 + 0.15 * Math.sin(t * 1.5 + userData.pulsPhase);
        particle.scale.setScalar(pulse * userData.targetScale);
        
        // Influence de la souris
        if (mouseParticleRef.current && isMouseOverRef.current) {
          const distance = particle.position.distanceTo(mouseRef.current.worldPos);
          
          // Calcul de l'intensité de connexion (avec effet de lissage)
          const targetIntensity = Math.max(0, 1 - distance / MOUSE_CONNECTION_DISTANCE);
          connectionIntensityRef.current[index] += (targetIntensity - connectionIntensityRef.current[index]) * CONNECTION_SMOOTHING;
          const intensity = connectionIntensityRef.current[index];
          
          if (intensity > 0.01) {
            // Force de répulsion/attraction
            const force = new THREE.Vector3()
              .subVectors(particle.position, mouseRef.current.worldPos)
              .normalize();
            
            const proximityFactor = 1 - distance / MOUSE_INFLUENCE_DISTANCE;
            const proximitySquared = proximityFactor * proximityFactor;
            
            // Répulsion douce + légère attraction
            const repulsionForce = force.clone().multiplyScalar(MOUSE_FORCE * proximitySquared);
            const attractionForce = force.clone().multiplyScalar(-MOUSE_ATTRACTION_FORCE * proximitySquared * 0.4);
            
            particle.position.add(repulsionForce).add(attractionForce);
            
            // Augmentation de l'opacité et de la taille
            (particle.material as THREE.MeshBasicMaterial).opacity = Math.min(1, userData.originalOpacity + proximitySquared * 0.6);
            
            // Effet de pulsation supplémentaire près du curseur
            const pulseBoost = 1 + proximitySquared * MOUSE_PULSE_INTENSITY;
            userData.targetScale = particle.userData.originalOpacity * (1 + proximitySquared * 0.5) * pulseBoost;
          } else {
            (particle.material as THREE.MeshBasicMaterial).opacity = userData.originalOpacity;
            userData.targetScale = particle.userData.originalOpacity;
          }
        } else {
          (particle.material as THREE.MeshBasicMaterial).opacity = userData.originalOpacity;
          userData.targetScale = particle.userData.originalOpacity;
        }
      });

      // Mise à jour des connexions entre particules
      if (linesRef.current) {
        const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
        const colors = linesRef.current.geometry.attributes.color.array as Float32Array;
        let vertexIndex = 0;
        
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const distance = p1.position.distanceTo(p2.position);
            
            if (distance < MAX_DISTANCE) {
              // Position des points de la ligne
              positions[vertexIndex * 3] = p1.position.x;
              positions[vertexIndex * 3 + 1] = p1.position.y;
              positions[vertexIndex * 3 + 2] = p1.position.z;
              
              positions[vertexIndex * 3 + 3] = p2.position.x;
              positions[vertexIndex * 3 + 4] = p2.position.y;
              positions[vertexIndex * 3 + 5] = p2.position.z;
              
              // Couleur basée sur la distance
              const intensity = 1 - distance / MAX_DISTANCE;
              const intensitySquared = intensity * intensity;
              const hue = 0.6; // Bleu
              const color = new THREE.Color().setHSL(
                hue, 
                0.85, 
                0.4 + 0.3 * intensitySquared
              );
              
              colors[vertexIndex * 3] = color.r;
              colors[vertexIndex * 3 + 1] = color.g;
              colors[vertexIndex * 3 + 2] = color.b;
              
              colors[vertexIndex * 3 + 3] = color.r;
              colors[vertexIndex * 3 + 4] = color.g;
              colors[vertexIndex * 3 + 5] = color.b;
              
              vertexIndex += 2;
            }
          }
        }
        
        // Mise à jour des attributs de géométrie
        linesRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.color.needsUpdate = true;
        linesRef.current.geometry.setDrawRange(0, vertexIndex);
      }
      
      // Mise à jour des connexions du curseur
      if (mouseConnectionsRef.current && mouseParticleRef.current) {
        const mousePositions = mouseConnectionsRef.current.geometry.attributes.position.array as Float32Array;
        const mouseColors = mouseConnectionsRef.current.geometry.attributes.color.array as Float32Array;
        let mouseVertexIndex = 0;
        
        if (isMouseOverRef.current && (mouseParticleRef.current.material as THREE.MeshBasicMaterial).opacity > 0.1) {
          for (let i = 0; i < particlesRef.current.length; i++) {
            const intensity = connectionIntensityRef.current[i];
            
            if (intensity > 0.01) {
              const particle = particlesRef.current[i];
              
              // Ligne du centre exact du curseur vers la particule
              mousePositions[mouseVertexIndex * 3] = mouseRef.current.worldPos.x;
              mousePositions[mouseVertexIndex * 3 + 1] = mouseRef.current.worldPos.y;
              mousePositions[mouseVertexIndex * 3 + 2] = mouseRef.current.worldPos.z;
              
              mousePositions[mouseVertexIndex * 3 + 3] = particle.position.x;
              mousePositions[mouseVertexIndex * 3 + 4] = particle.position.y;
              mousePositions[mouseVertexIndex * 3 + 5] = particle.position.z;
              
              // Couleur avec dégradé basé sur l'intensité
              const pulseIntensity = 0.7 + 0.3 * Math.sin(t * 3 + i * 0.5);
              const intensitySquared = intensity * intensity;
              
              // Couleur au centre du curseur (plus intense)
              const centerColor = new THREE.Color().setHSL(0.08, 1, 0.85);
              mouseColors[mouseVertexIndex * 3] = centerColor.r * intensitySquared * pulseIntensity;
              mouseColors[mouseVertexIndex * 3 + 1] = centerColor.g * intensitySquared * pulseIntensity;
              mouseColors[mouseVertexIndex * 3 + 2] = centerColor.b * intensitySquared * pulseIntensity;
              
              // Couleur à la particule (plus douce)
              const particleColor = new THREE.Color().setHSL(0.08, 0.8, 0.6);
              mouseColors[mouseVertexIndex * 3 + 3] = particleColor.r * intensitySquared * 0.7;
              mouseColors[mouseVertexIndex * 3 + 4] = particleColor.g * intensitySquared * 0.7;
              mouseColors[mouseVertexIndex * 3 + 5] = particleColor.b * intensitySquared * 0.7;
              
              mouseVertexIndex += 2;
            }
          }
        }
        
        // Animation de pulsation du curseur
        if (isMouseOverRef.current) {
          const breathe = 1 + 0.15 * Math.sin(t * 3);
          if (mouseParticleRef.current) {
            const currentScale = mouseParticleRef.current.scale.x;
            mouseParticleRef.current.scale.setScalar(currentScale * breathe);
            
            // Effet de halo autour du curseur
            const haloIntensity = 0.5 + 0.3 * Math.sin(t * 2.5);
            (mouseParticleRef.current.material as THREE.MeshBasicMaterial).opacity = Math.min(
              0.85,
              (mouseParticleRef.current.material as THREE.MeshBasicMaterial).opacity * haloIntensity
            );
          }
        }
        
        // Mise à jour des attributs de géométrie
        mouseConnectionsRef.current.geometry.attributes.position.needsUpdate = true;
        mouseConnectionsRef.current.geometry.attributes.color.needsUpdate = true;
        mouseConnectionsRef.current.geometry.setDrawRange(0, mouseVertexIndex);
      }

      if (rendererRef.current && sceneRef.current && camera) {
        rendererRef.current.render(sceneRef.current, camera);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Nettoyage
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose particles
      if (particlesRef.current) {
        particlesRef.current.forEach((particle) => {
          if (particle.geometry) particle.geometry.dispose();
          if (particle.material) (particle.material as THREE.Material).dispose();
        });
      }

      // Dispose mouse particle
      if (mouseParticleRef.current) {
        if (mouseParticleRef.current.geometry) mouseParticleRef.current.geometry.dispose();
        if (mouseParticleRef.current.material) (mouseParticleRef.current.material as THREE.Material).dispose();
      }

      // Dispose lines
      if (linesRef.current) {
        if (linesRef.current.geometry) linesRef.current.geometry.dispose();
        if (linesRef.current.mesh.material) (linesRef.current.mesh.material as THREE.Material).dispose();
      }

      // Dispose mouse connections
      if (mouseConnectionsRef.current) {
        if (mouseConnectionsRef.current.geometry) mouseConnectionsRef.current.geometry.dispose();
        if (mouseConnectionsRef.current.mesh.material) (mouseConnectionsRef.current.mesh.material as THREE.Material).dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-1 overflow-hidden pointer-events-none ${className || ''}`}
    />
  );
};

export default AnimatedNetworkBackground;