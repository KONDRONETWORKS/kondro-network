// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowButton from '@/components/react/UI/components/GlowButton'

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

interface HeaderProps {
  bannerText?: string;
  logo: string;
  navItems: NavItem[];
  ctaButton: {
    label: string;
    onClick?: () => void;
    href?:string;
  };
  // Vous pouvez ajouter d'autres props si nécessaire
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Header component for the site, featuring a promotional banner, logo, navigation menu (with support for submenus),
 * call-to-action button, and responsive mobile menu with animated transitions.
 *
 * @component
 * @param {HeaderProps} props - The props for the Header component.
 * @param {string} [props.bannerText] - The text to display in the promotional banner. Defaults to a launch offer message.
 * @param {string} props.logo - The source URL for the logo image.
 * @param {Array<NavItem>} props.navItems - The navigation items to display, each potentially with subItems for dropdowns.
 * @param {CtaButton} props.ctaButton - The call-to-action button configuration, including label and onClick handler.
 * @param {string} [props.className] - Additional class names to apply to the header.
 *
 * @returns {JSX.Element} The rendered Header component.
 *
 * @example
 * <Header
 *   logo="/logo.png"
 *   navItems={[
 *     { label: "Home", href: "home" },
 *     { label: "Services", href: "services", subItems: [{ label: "Web", href: "web" }] }
 *   ]}
 *   ctaButton={{ label: "Contact Us", onClick: () => alert("Contact!") }}
 * />
 */
const Header: React.FC<HeaderProps> = ({ 
  bannerText = "🔔 Nouveau ! Profitez de notre offre spéciale de lancement", 
  logo,
  navItems,
  ctaButton,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Effet pour gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Activer l'effet "flottant" après 50px de défilement
      setIsScrolled(scrollPosition > 50);
      
      // Cacher la bannière après .1px de défilement
      setIsBannerVisible(scrollPosition <= .1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gérer le défilement du corps lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

 

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1 },
    }
  }

  return (
    <header 
      ref={headerRef}
      className={` ${className}  fixed top-el0 z-150 w-full transition-all duration-200 dark:bg-none 
      ${isScrolled ? 'p-5 ' : ' bg-gradient-to-r from-white via-it4a-secondary to-it4a-primary/15  transition-all .1s '}
      `}
    >
      {/* Bannière promotionnelle avec animation de disparition */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-transparent backdrop-blur-xs dark:bg-gradient-to-r  from-it4a-secondary to-it4a-primary/15 text-white overflow-hidden"
          >
            <div className="container mx-auto flex items-center justify-center px-4 py-2">
              <span className="mr-2 animate-pulse">✨</span>
              <p className="text-sm md:text-base truncate">{bannerText}</p>
              

              <a href='mailto:info@ite4fa.com'  className="ml-4 bg-white text-it4a-secondary px-3 py-1 rounded-md text-xs font-Poppins hover:bg-it4a-primary transition-colors whitespace-nowrap">
                {ctaButton.label = "Nous Contacter"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation principale */}
      <nav className={`container mx-auto flex flex-col content-evenly px-4  ${
        isScrolled 
          ? ' backdrop-blur-lg border border-it4a-secondary  dark:shadow-gray-300 py-0 rounded-xl' 
          : ' py-2'
      }`}>
        <div className="flex  items-center justify-between py-3">
          {/* Logo avec transition */}
          <div className="flex items-center">
            <motion.img 
              src={logo} 
              alt="Logo" 
              className={`transition-all duration-300  ${
                isScrolled ? 'h-10 md:h-15' : 'h-13 md:h-17'
              }`}
              whileHover={{ rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
          
          {/* Navigation desktop */}
          <div className=" hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <ul 
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveSubMenu(item.label)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <motion.li
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`dark:text-white/70 text-white text-shadow-white hover:text-it4a-primary font-medium transition-colors group relative py-2`}
                >
                  <a href={item.href}>
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-it4a-primary transition-all duration-300 group-hover:w-full`}></span>
                  </a>
                </motion.li>
                
                {/* Sous-menu */}
                {item.subItems && activeSubMenu === item.label && (
                  <motion.ul
                    initial={{ opacity: 0, y: 0}}
                    animate={{opacity:1, y:40}}
                    className={`absolute backdrop-blur-2xl  top-0 left-0 mt-0 md:w-md text-white  outline-white  border-l border-l-it4a-primary shadow-it4a-primary rounded-md py-2 z-30  ${isScrolled && `bg-it4a-secondary/60 backdrop-blur-xs` } `}
                  >
                    {item.subItems.map((subItem) => (
                      <motion.li
                        variants={itemVariants}
                        className='flex items-center flex-col'
                        whileHover={
                          {x:5}
                        }
                      >
                        <a
                          key={subItem.label}
                          href={`${subItem.href}`}
                          className="flex flex-1 itmes-start px-4 py-2  hover:bg-it4a-secondary hover:text-it4a-primary hover:border-b border-it4a-primary group-hover: transition-colors w-[100%]"
                        >
                          <svg className="w-4 h-4 mt-1 mr-2 text-it4a-primary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          {subItem.label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </ul>
            ))}
          </div>
          
          {/* Bouton CTA */}
            <GlowButton href={ctaButton.href} onClick={ctaButton.onClick} className='hidden md:block' variant='outline'>
              {ctaButton.label}
            </GlowButton>
          
          {/* Menu mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-6 z-20 relative">
              <span className={`absolute block w-6 h-0.5 bg-it4a-primary transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-it4a-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-3'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-it4a-primary transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </motion.button>
        </div>
      </nav>
      
      {/* Menu mobile - Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 h-full w-4/5 bg-it4a-secondary/40 backdrop-blur-xl shadow-xl max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-it4a-primary flex justify-between items-center">
                <img src={logo} alt="Logo" className="h-10" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-it4a-primary px-2 py-1   text-center rounded-full transition-all .4s ease-linear active:border border-it4a-primary "
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label} className="border-b border-it4a-primary/40 acitve:border-it4a-primary ">
                      <a
                        href={!item.subItems ? item.href : '#'}
                        onClick={() => {
                          if (item.subItems) {
                            setActiveSubMenu(activeSubMenu === item.label ? null : item.label);
                          } 
                        }}
                        className="w-full text-left text-white py-3 px-2 flex justify-between items-center  font-Poppins active:text-it4a-primary transition-colors .5s"
                      >
                        {item.label}
                        {item.subItems && (
                          <span className={`transform transition-transform ${activeSubMenu === item.label ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        )}
                      </a>
                      
                      {item.subItems && activeSubMenu === item.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="pl-4 pb-2 space-y-2"

                        >
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label} className='w-full text-left py-2 px-2 text-white/80 hover:text-it4a-primary  hover:bg-it4a-secondary rounded transition-all .4s'>
                              <motion.a
                                className='block'
                                initial={{height:0,opacity:0}}
                                animate={{height:'auto',opacity:1}}
                                whileHover={{x:-3}}
                                href={subItem.href}
                              >
                                {subItem.label}
                              </motion.a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  ))}
                </ul>
                <GlowButton  href={`/contact`}  onClick={()=>{
                    ctaButton.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}  className=' block items-center text-center mt-6 w-full'>
                    {ctaButton.label}
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;