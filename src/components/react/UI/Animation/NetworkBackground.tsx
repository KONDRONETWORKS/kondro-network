import React, { useState, useEffect, useMemo } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

interface NetworkBackgroundProps {
  nodeCount?: number;
  baseColor?: string;
  connectionDistance?: number;
  mouseRepulsion?: number;
  nodeSize?: [number, number];
  connectionWidth?: number;
  animationSpeed?: number;
  className?: string;
}

const NetworkBackground = ({
  nodeCount = 50,
  baseColor = '#3b82f6',
  connectionDistance = 15,
  mouseRepulsion = 15,
  nodeSize = [0.5, 3],
  connectionWidth = 0.1,
  animationSpeed = 0.05,
  className = '',
}: NetworkBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 100, height: 100 });
  const [frameCount, setFrameCount] = useState(0);

  // Animation optimization - throttle mouse position updates
  useEffect(() => {
    let animationFrameId: number;
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
        lastX = e.clientX;
        lastY = e.clientY;
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate initial nodes
  const initialNodes = useMemo<Node[]>(() => {
    return Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (nodeSize[1] - nodeSize[0]) + nodeSize[0],
      opacity: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * animationSpeed,
      speedY: (Math.random() - 0.5) * animationSpeed,
    }));
  }, [nodeCount, nodeSize, animationSpeed]);

  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  // Animation loop with optimized updates
  useEffect(() => {
    let animationFrameId: number;
    const mouseX = (mousePosition.x / windowSize.width) * 100;
    const mouseY = (mousePosition.y / windowSize.height) * 100;

    const animate = () => {
      setNodes(prevNodes => 
        prevNodes.map(node => {
          // Calculate distance to mouse
          const dx = node.x - mouseX;
          const dy = node.y - mouseY;
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

          // Mouse repulsion effect
          let newSpeedX = node.speedX;
          let newSpeedY = node.speedY;
          
          if (distanceToMouse < mouseRepulsion) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRepulsion - distanceToMouse) * 0.003 * animationSpeed;
            newSpeedX += Math.cos(angle) * force;
            newSpeedY += Math.sin(angle) * force;
          }

          // Update position with bounds checking
          let newX = node.x + newSpeedX;
          let newY = node.y + newSpeedY;

          if (newX < 0 || newX > 100) newSpeedX *= -0.8;
          if (newY < 0 || newY > 100) newSpeedY *= -0.8;

          return {
            ...node,
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY)),
            speedX: newSpeedX * 0.99, // slight damping
            speedY: newSpeedY * 0.99,
          };
        })
      );

      setFrameCount(prev => prev + 1);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition, windowSize, mouseRepulsion, animationSpeed]);

  // Memoize SVG elements for better performance
  const connections = useMemo(() => {
    const elements: React.JSX.Element[] = [];
    const mouseX = (mousePosition.x / windowSize.width) * 100;
    const mouseY = (mousePosition.y / windowSize.height) * 100;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node = nodes[i];
        const otherNode = nodes[j];
        const distance = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
        );

        if (distance < connectionDistance) {
          // Calculate mouse influence
          const mouseDistance = Math.min(
            Math.sqrt(Math.pow(node.x - mouseX, 2) + Math.pow(node.y - mouseY, 2)),
            Math.sqrt(Math.pow(otherNode.x - mouseX, 2) + Math.pow(otherNode.y - mouseY, 2))
          );

          const baseOpacity = 0.3 - (distance / connectionDistance) * 0.2;
          const hoverEffect = Math.max(0, (mouseRepulsion - mouseDistance) * 0.02);
          const strokeWidth = connectionWidth + hoverEffect * 0.2;

          elements.push(
            <line
              key={`${node.id}-${otherNode.id}`}
              x1={node.x}
              y1={node.y}
              x2={otherNode.x}
              y2={otherNode.y}
              stroke={baseColor}
              strokeWidth={strokeWidth}
              opacity={Math.min(0.6, baseOpacity + hoverEffect)}
              className="transition-all duration-75"
            />
          );
        }
      }
    }
    return elements;
  }, [nodes, mousePosition, windowSize, baseColor, connectionDistance, mouseRepulsion, connectionWidth]);

  const nodeElements = useMemo(() => {
    const mouseX = (mousePosition.x / windowSize.width) * 100;
    const mouseY = (mousePosition.y / windowSize.height) * 100;

    return nodes.map(node => {
      const dx = node.x - mouseX;
      const dy = node.y - mouseY;
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
      const hoverEffect = Math.max(0, (mouseRepulsion - distanceToMouse) * 0.03);
      const currentSize = node.size * 0.2 + hoverEffect * 0.5;

      return (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={currentSize}
          fill={`url(#nodeGradient-${baseColor.replace('#', '')})`}
          opacity={Math.min(0.8, node.opacity + hoverEffect)}
          className="transition-all duration-100"
        />
      );
    });
  }, [nodes, mousePosition, windowSize, baseColor, mouseRepulsion]);

  return (
    <div className={`${className} inset-0 overflow-hidden pointer-events-none -z-10 `}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        key={`svg-${frameCount % 2}`} // Force re-render every 2 frames for Safari bug workaround
      >
        <defs>
          <radialGradient id={`nodeGradient-${baseColor.replace('#', '')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {connections}
        {nodeElements}
      </svg>
      
      {/* Interactive glow effect */}
      <div 
        className="absolute w-[20vw] h-[20vw] rounded-full opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${baseColor} 0%, transparent 70%)`,
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.15s linear',
          willChange: 'left, top',
        }}
      />
    </div>
  );
};

export default NetworkBackground;