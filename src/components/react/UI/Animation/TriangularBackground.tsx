// src/components/TriangularBackground.tsx
import React, { useRef, useEffect, useState} from 'react';



interface TriangleBacgrounndProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
  speed?: number;
  pointCount?: number;
  maxDistance?: number;
  minDistance?: number;
  fadeSpeed?: number;
  lineOpacity?: number;
  pointSize?: number;
  lightParticlesCount?: number;
}

// Définition des types
type Point = {
  x: number;
  y: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  connections: Point[];
};

type LightParticle = {
  path: { from: Point; to: Point };
  position: number; // 0 à 1
  speed: number;
  size: number;
  color: string;
};

type AnimationConfig = {
  pointCount: number;
  maxDistance: number;
  minDistance: number;
  fadeSpeed: number;
  lineOpacity: number;
  pointSize: number;
  lightParticlesCount: number;
  colors: {
    light: { background: string; points: string; lines: string; particles: string };
    dark: { background: string; points: string; lines: string; particles: string };
  };
};

const TriangularBackground: React.FC<TriangleBacgrounndProps> = ({
  children,
  className,
  theme,

  pointCount = 180,
  maxDistance = 180,
  minDistance = 60,
  fadeSpeed = 0.02,
  lineOpacity = 0.15,
  pointSize = 2,
  lightParticlesCount = 30

}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showParticles, setShowParticles] = useState(true);
  
  // Configuration de l'animation
  const config: AnimationConfig = {
    pointCount: 180,
    maxDistance: 180,
    minDistance: 60,
    fadeSpeed: 0.02,
    lineOpacity: 0.15,
    pointSize: 2,
    lightParticlesCount: 30,
    colors: {
      light: { 
        background: '#d4d4d4', 
        points: '#0a84c1', 
        lines: '#000000',
        particles: '#5dbbe9'
      },
      dark: { 
        background: '#1d3446', 
        points: '#e2e2e2', 
        lines: '#0a84c1',
        particles: '#5dbbe9'
      }
    }
  };

  config.pointCount = pointCount;
  config.maxDistance = maxDistance;
  config.minDistance = minDistance;
  config.fadeSpeed = fadeSpeed;
  config.lineOpacity = lineOpacity;
  config.pointSize = pointSize;
  config.lightParticlesCount = lightParticlesCount;

  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<LightParticle[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const lastConnectionUpdateRef = useRef<number>(0);

  // Initialisation du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generatePoints(canvas);
      generateLightParticles();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Démarrer l'animation
    animate(ctx, canvas);
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);
  
  // Générer les points
  const generatePoints = (canvas: HTMLCanvasElement) => {
    const points: Point[] = [];
    const rows = Math.sqrt(config.pointCount);
    const cols = Math.sqrt(config.pointCount);
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    
    for (let i = 0; i < config.pointCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const offsetX = (row % 2 === 0) ? cellWidth / 2 : 0;
      
      const point: Point = {
        x: offsetX + col * cellWidth + (Math.random() - 0.5) * cellWidth * 0.4,
        y: row * cellHeight + (Math.random() - 0.5) * cellHeight * 0.4,
        opacity: Math.random(),
        targetOpacity: Math.random(),
        speed: 0.01 + Math.random() * 0.03,
        connections: []
      };
      
      points.push(point);
    }
    
    updateConnections(points);
    pointsRef.current = points;
  };
  
  // Générer les particules lumineuses
  const generateLightParticles = () => {
    const particles: LightParticle[] = [];
    const colors = theme === 'dark' ? config.colors.dark : config.colors.light;
    
    // Récupérer toutes les connexions disponibles
    const allConnections: { from: Point; to: Point }[] = [];
    pointsRef.current.forEach(point => {
      point.connections.forEach(connection => {
        allConnections.push({ from: point, to: connection });
      });
    });
    
    if (allConnections.length === 0) return [];
    
    for (let i = 0; i < config.lightParticlesCount; i++) {
      // Choisir une connexion aléatoire
      const randomConnection = allConnections[Math.floor(Math.random() * allConnections.length)];
      
      particles.push({
        path: randomConnection,
        position: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        size: 1.5 + Math.random() * 2,
        color: colors.particles
      });
    }
    
    particlesRef.current = particles;
  };
  
  // Mettre à jour les connexions
  const updateConnections = (points: Point[]) => {
    points.forEach(point => point.connections = []);
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.maxDistance && distance > config.minDistance) {
          points[i].connections.push(points[j]);
        }
      }
    }
  };
  
  // Animation principale
  const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {

    
    const colors = theme === 'dark' ? config.colors.dark : config.colors.light;
    const currentTime = Date.now();
    
    // Mettre à jour les connexions périodiquement
    if (currentTime - lastConnectionUpdateRef.current > 3000) {
      updateConnections(pointsRef.current);
      lastConnectionUpdateRef.current = currentTime;
    }
    
    // Effacer le canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Mettre à jour les points
    pointsRef.current.forEach(point => {
      // Animation de fondu
      if (Math.abs(point.opacity - point.targetOpacity) < 0.01) {
        point.targetOpacity = Math.random();
      }
      
      if (point.opacity < point.targetOpacity) {
        point.opacity = Math.min(point.opacity + point.speed, point.targetOpacity);
      } else {
        point.opacity = Math.max(point.opacity - point.speed, point.targetOpacity);
      }
      
      // Dessiner les lignes
      ctx.strokeStyle = `${colors.lines}${Math.floor(config.lineOpacity * point.opacity * 100)}`;
      ctx.lineWidth = 0.5;
      
      point.connections.forEach(connection => {
        if (connection.opacity > 0.1) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(connection.x, connection.y);
          ctx.stroke();
        }
      });
      
      // Dessiner le point
      if (point.opacity > 0.1) {
        ctx.fillStyle = `${colors.points}${Math.floor(point.opacity * 100)}`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, config.pointSize * point.opacity, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Mettre à jour et dessiner les particules lumineuses
    if (showParticles) {
      particlesRef.current.forEach(particle => {
        // Mettre à jour la position
        particle.position += particle.speed;
        
        // Si la particule arrive au bout du chemin, choisir un nouveau chemin
        if (particle.position > 1) {
          particle.position = 0;
          
          // Trouver une nouvelle connexion aléatoire
          const allConnections: { from: Point; to: Point }[] = [];
          pointsRef.current.forEach(point => {
            point.connections.forEach(connection => {
              allConnections.push({ from: point, to: connection });
            });
          });
          
          if (allConnections.length > 0) {
            const randomConnection = allConnections[Math.floor(Math.random() * allConnections.length)];
            particle.path = randomConnection;
          }
        }
        
        // Calculer la position actuelle sur la ligne
        const from = particle.path.from;
        const to = particle.path.to;
        const progress = particle.position;
        
        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;
        
        // Dessiner la particule lumineuse
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner un halo lumineux
        ctx.fillStyle = `${particle.color}33`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    // Demander la prochaine frame
    animationIdRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  };

  return (
    <div className= {`${className} inset-0 z-0 relative overflow-hidden`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute top-0 left-0 -z-1"
      />
      {children}
    </div>
  );
};

export default TriangularBackground;