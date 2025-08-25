// src/components/LightCommunicationBackground.tsx
"use client";

import React, { 
  useRef, 
  useEffect, 
  type CSSProperties,
  useState,
  useCallback
} from 'react';

type Point = {
  id: string;
  x: number;
  y: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  connections: Point[];
  baseX: number;
  baseY: number;
  size: number;
  pulse: number;
  pulseDirection: number;
};

type LightParticle = {
  id: string;
  from: Point;
  to: Point;
  position: number;
  speed: number;
  size: number;
  color: string;
  fading: boolean;
  life: number;
};

type AnimationConfig = {
  pointCount: number;
  maxDistance: number;
  minDistance: number;
  fadeSpeed: number;
  lineOpacity: number;
  minPointSize: number;
  maxPointSize: number;
  lightParticlesCount: number;
  colors: {
    light: { background: string; points: string; lines: string; particles: string };
    dark: { background: string; points: string; lines: string; particles: string };
  };
  parallaxIntensity: number;
  showParticles: boolean;
  animationSpeed: number;
  communicationFrequency: number;
};

type LightCommunicationBackgroundProps = {
  theme?: 'light' | 'dark' | 'auto';
  pointCount?: number;
  showParticles?: boolean;
  parallaxIntensity?: number;
  className?: string;
  style?: CSSProperties;
  gradient?: string;
  animationSpeed?: number;
  children?: React.ReactNode;
  communicationFrequency?: number;
};

const LightCommunicationBackground: React.FC<LightCommunicationBackgroundProps> = ({
  theme = 'dark',
  pointCount = 100,
  showParticles = true,
  parallaxIntensity = 0.2,
  className = '',
  style = {},
  gradient = "",
  animationSpeed = 1,
  communicationFrequency = 100,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [computedTheme, setComputedTheme] = useState<'light' | 'dark'>('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Configuration de l'animation avec valeurs par défaut
  const config: AnimationConfig = {
    pointCount,
    maxDistance: 180,
    minDistance: 60,
    fadeSpeed: 0.02,
    lineOpacity: 0.15,
    minPointSize: 1.5,
    maxPointSize: 3.5,
    lightParticlesCount: 25,
    parallaxIntensity,
    showParticles,
    animationSpeed,
    communicationFrequency,
    colors: {
      light: { 
        background: gradient || 'rgba(248, 250, 252, 0.95)', 
        points: '#5dbbe9', 
        lines: '#09090b',
        particles: '#5dbbe9'
      },
      dark: { 
        background: gradient || 'rgba(15, 23, 42, 0.95)', 
        points: '#ffffff', 
        lines: '#ffffff',
        particles: '#5dbbe9'
      }
    }
  };

  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<LightParticle[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const lastConnectionUpdateRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const lastCommunicationTimeRef = useRef<number>(0);

  // Déterminer le thème
  useEffect(() => {
    if (theme === 'auto') {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        setComputedTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
      };
      
      updateTheme();
      darkModeMediaQuery.addEventListener('change', updateTheme);
      
      return () => darkModeMediaQuery.removeEventListener('change', updateTheme);
    } else {
      setComputedTheme(theme);
    }
  }, [theme]);

  // Gestion du mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Générer les points
  const generatePoints = useCallback((canvas: HTMLCanvasElement) => {
    const points: Point[] = [];
    const rows = Math.sqrt(config.pointCount);
    const cols = Math.sqrt(config.pointCount);
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    
    for (let i = 0; i < config.pointCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const offsetX = (row % 2 === 0) ? cellWidth / 2 : 0;
      
      const baseX = offsetX + col * cellWidth;
      const baseY = row * cellHeight;
      
      const size = config.minPointSize + Math.random() * (config.maxPointSize - config.minPointSize);
      
      const point: Point = {
        id: `point-${i}`,
        x: baseX + (Math.random() - 0.5) * cellWidth * 0.4,
        y: baseY + (Math.random() - 0.5) * cellHeight * 0.4,
        opacity: Math.random(),
        targetOpacity: Math.random(),
        speed: 0.01 + Math.random() * 0.03,
        connections: [],
        baseX,
        baseY,
        size,
        pulse: Math.random(),
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      };
      
      points.push(point);
    }
    
    updateConnections(points);
    pointsRef.current = points;
  }, [config]);
  
  // Mettre à jour les connexions
  const updateConnections = useCallback((points: Point[]) => {
    points.forEach(point => point.connections = []);
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.maxDistance && distance > config.minDistance) {
          points[i].connections.push(points[j]);
          points[j].connections.push(points[i]);
        }
      }
    }
  }, [config]);

  // Créer une nouvelle communication
  const createCommunication = useCallback(() => {
    const points = pointsRef.current;
    if (points.length === 0) return;
    
    const colors = computedTheme === 'dark' ? config.colors.dark : config.colors.light;
    
    // Trouver un point avec des connexions
    const activePoints = points.filter(p => p.connections.length > 0 && p.opacity > 0.5);
    if (activePoints.length === 0) return;
    
    const fromPoint = activePoints[Math.floor(Math.random() * activePoints.length)];
    const toPoint = fromPoint.connections[Math.floor(Math.random() * fromPoint.connections.length)];
    
    // Créer une nouvelle particule de communication
    const newParticle: LightParticle = {
      id: `particle-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      from: fromPoint,
      to: toPoint,
      position: 0,
      speed: (0.005 + Math.random() * 0.005) * config.animationSpeed,
      size: 2 + Math.random() * 2,
      color: colors.particles,
      fading: false,
      life: 1
    };
    
    // Ajouter à la liste des particules
    particlesRef.current = [...particlesRef.current, newParticle];
  }, [computedTheme, config]);

  // Appliquer l'effet de parallaxe
  const applyParallax = useCallback(() => {
    const intensity = config.parallaxIntensity * 15;
    
    pointsRef.current.forEach(point => {
      const dx = mousePosition.x * intensity;
      const dy = mousePosition.y * intensity;
      
      point.x = point.baseX + dx;
      point.y = point.baseY + dy;
    });
  }, [mousePosition, config]);

  // Initialisation du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      generatePoints(canvas);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Démarrer l'animation
    const animateFrame = (timestamp: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      
      animate(ctx, canvas, deltaTime);
      animationIdRef.current = requestAnimationFrame(animateFrame);
    };
    
    animationIdRef.current = requestAnimationFrame(animateFrame);
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [generatePoints]);
  
  // Animation principale
  const animate = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, deltaTime: number) => {
    const colors = computedTheme === 'dark' ? config.colors.dark : config.colors.light;
    const currentTime = Date.now();
    
    // Mettre à jour les connexions périodiquement
    if (currentTime - lastConnectionUpdateRef.current > 5000) {
      updateConnections(pointsRef.current);
      lastConnectionUpdateRef.current = currentTime;
    }
    
    // Créer de nouvelles communications
    if (currentTime - lastCommunicationTimeRef.current > 1000 / config.communicationFrequency) {
      createCommunication();
      lastCommunicationTimeRef.current = currentTime;
    }
    
    // Appliquer l'effet de parallaxe
    if (config.parallaxIntensity > 0) {
      applyParallax();
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
        point.opacity = Math.min(point.opacity + point.speed * config.animationSpeed, point.targetOpacity);
      } else {
        point.opacity = Math.max(point.opacity - point.speed * config.animationSpeed, point.targetOpacity);
      }
      
      // Animation de pulsation
      point.pulse += 0.01 * point.pulseDirection * config.animationSpeed;
      if (point.pulse > 1 || point.pulse < 0) {
        point.pulseDirection *= -1;
        point.pulse = Math.max(0, Math.min(1, point.pulse));
      }
      
      const pulseEffect = 0.5 + 0.5 * point.pulse;
      
      // Dessiner les lignes
      ctx.strokeStyle = `${colors.lines}${Math.floor(config.lineOpacity * point.opacity * 100)}`;
      ctx.lineWidth = 0.7 * point.opacity;
      
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
        const currentSize = point.size * point.opacity * pulseEffect;
        
        // Créer un dégradé pour le point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, currentSize * 1.5
        );
        gradient.addColorStop(0, `${colors.points}ff`);
        gradient.addColorStop(0.7, `${colors.points}aa`);
        gradient.addColorStop(1, `${colors.points}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentSize * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Mettre à jour et dessiner les particules de communication
    if (config.showParticles && particlesRef.current.length > 0) {
      const updatedParticles: LightParticle[] = [];
      
      particlesRef.current.forEach(particle => {
        // Mettre à jour la position
        particle.position += particle.speed;
        
        // Calculer la position actuelle
        const from = particle.from;
        const to = particle.to;
        const progress = particle.position;
        
        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;
        
        // Vérifier si la particule arrive au point de destination
        if (progress >= 1) {
          // Faire disparaître la particule
          particle.fading = true;
        }
        
        // Faire disparaître la particule
        if (particle.fading) {
          particle.life -= 0.05 * config.animationSpeed;
          if (particle.life <= 0) {
            return; // Supprimer cette particule
          }
        }
        
        // Dessiner la particule
        const size = particle.size * particle.life;
        
        // Créer un dégradé pour la particule
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, size * 2
        );
        gradient.addColorStop(0, `${particle.color}ff`);
        gradient.addColorStop(0.5, `${particle.color}aa`);
        gradient.addColorStop(1, `${particle.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        updatedParticles.push(particle);
      });
      
      particlesRef.current = updatedParticles;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative  ${className}`} 
      style={style}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full "
      />
      
      {/* Contenu par-dessus l'animation */}
      <div className="relative z-10 size-full">
        {children}
      </div>
    </div>
  );
};

export default LightCommunicationBackground;