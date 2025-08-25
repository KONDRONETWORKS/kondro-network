import React, { useState, useEffect } from 'react';
import logo from '/WhiteLogoH.png?url';

const SplashScreen = ({ onComplete=true }:any) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initialisation des services...",
    "Connexion aux serveurs...",
    "Chargement des données...",
    "Préparation de l'interface...",
    "KONDRO-NETWORKS"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onComplete && onComplete();
            }, 500);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentText(prev => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(textTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(textTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-1000 flex items-center justify-center bg-gradient-to-br from-it4a-primary\ via-black to-it4a-secondary transition-all duration-1000 ease-int-out ${
        isVisible ? 'opacity-100' : 'opacity-0 hidden'
      }`}
    >
      {/* Animated Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Connecting Lines Animation */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
              className="animate-pulse"
              style={{
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Logo Container */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Rotating Ring */}
            <div className="absolute inset-0 border-4  border-it4a-secondary border-r-it4a-primary rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-b-it4a-accent border-l-it4a-secondary rounded-full animate-spin animate-reverse"></div>
            
            {/* Logo/Icon */}
            <div className="absolute P-8 inset-4 bg-gradient-to-br from-white/50 to-it4a-secondary/20  rounded-full flex items-center justify-center">
                <img src={logo}  className="w-16 h-16 object-center object-contain" alt="it4a"  />
            </div>
          </div>
          
          {/* Company Name */}
          <h1 className="text-2xl font-bold text-white mb-2 animate-pulse">
            <span className="text-4xl text-it4a-primary">KONDRO</span><br/>NETWORKS
          </h1>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <p className="text-lg text-gray-300 h-6 transition-all duration-300">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 px-20  mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Chargement</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-it4a-secondary to-it4a-primary h-2 rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Pulsing Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-it4a-primary rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-8">
          Solutions technologiques avancées pour l'Afrique
        </p>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-it4a-secondary opacity-50"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-it4a-primary  opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-it4a-secondary opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-it4a-secondary opacity-50"></div>
    </div>
  );
};

export default SplashScreen;