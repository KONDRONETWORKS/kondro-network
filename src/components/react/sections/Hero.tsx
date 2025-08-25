import { ChevronRight } from 'lucide-react';
import GlowButton from '../UI/components/GlowButton';
import NetworkBackground from '../UI/Animation/NetworkBackground';
import FloatingCard from '../UI/components/FloatingCard';
import DecryptedText from "../UI/Text/DecryptedText";
import CountUp from "../UI/Text/CountUp";
import { motion } from 'framer-motion';

const Hero = () => {

  return (
    <motion.section
    initial={{x:-2, opacity:0 }} 
    transition={{delay:.4}} 
    whileInView={{x:0, opacity:1}} 
    viewport={{once:true}} 
    className=" 
    box-border 
    relative
    h-svh
    py-95
    p-4
    flex 
    items-center 
    justify-center  
    backdrop-blur-xs 
    md:backdrop-blur-none ">
      <NetworkBackground 
        animationSpeed={5}
        baseColor={`#5dbbe9`}
        connectionDistance={10}
        mouseRepulsion={20}
        className='absolute z-0 sm:-z-10 h-full w-full top-0 left-0' 
      />

      <div className={`max-w-7xl grid lg:grid-cols-2 lg:gap-5 items-center relative z-10 `}>
        <div className="space-y-3" >
          <div >
            <h1 className=" text-4xl font-bold md:text-5xl  xxl:text-7xl text-white leading-tight">
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-it4a-primary to-it4a-secondary">
                <DecryptedText speed={70}   animateOn='view' text={`KONDRO`} />
              </span>
              <DecryptedText  speed={70}  animateOn='view'  text={`NETWORKS`} />
            </h1>
            <p className="text-xs md:text-sm md:line-clamp-5 line-clamp-3  text-gray-300  leading-relaxed">
              <DecryptedText speed={100} useOriginalCharsOnly={true}   animateOn='view'  text={`Accélérez la croissance et la compétitivité de votre entreprise grâce à notre expertise.

Chez Kondro Networks, nous aidons les PME comme les grandes organisations à transformer leur système d’information en un véritable levier de performance.
De l’architecture réseau à la cybersécurité, en passant par la gestion et l’optimisation des infrastructures, nous concevons et opérons des solutions fiables et évolutives, au service de vos enjeux métiers.`}
                 />
            </p>
          </div>

          <div className="flex text-xs md:text-xl flex-col sm:flex-row gap-4">
              <GlowButton href='/about' variant="primary" className="group">
                En savoir plus
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </GlowButton>

             <FloatingCard delay={15}>
                <GlowButton href='/services' variant="outline">
                  Nos services
                </GlowButton>
             </FloatingCard>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-it4a-primary/20">
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-it4a-primary">
                {/* <CountUpAnimation end={10} suffix="+" /> */}
                <CountUp  from={0} to={15} delay={.5} duration={10}/>
              </div>
              <p className="text-xs md:text-sm text-gray-400">ans d'expérience</p>
            </div>
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-it4a-primary">
                {/* <CountUpAnimation end={100} suffix="+" /> */}
                <CountUp  from={0} to={10} delay={1} duration={10}/>+
              </div>
              <p className="text-xs md:text-sm text-gray-400">clients satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-3xs md:text-3xl lg:text-4xl font-black text-it4a-primary">
                {/* <CountUpAnimation end={400} suffix="+" /> */}
                <CountUp  from={0} to={20} delay={1.5} duration={10}/>+ 
              </div>
              <p className="text-xs md:text-sm text-gray-400">projets réalisés</p>
            </div>
          </div>
        </div>
        {/* 
        <div className="relative  hidden md:flex   ">
          <div className={`relative w-full h-96 lg:h-[500px]  bg-[url(${backgroundHero})] bg-cover bg-no-repeat bg-bottom-right `}></div>
        </div> 
        */}
      </div>
    </motion.section>
  );
};

export default Hero;