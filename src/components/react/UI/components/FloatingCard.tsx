


interface FloationgCardProst {
  children:React.ReactNode;
  delay: number;
}

const FloatingCard : React.FC<FloationgCardProst> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="grid  transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 "
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s`,
      }}
    >
      {children}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default FloatingCard;