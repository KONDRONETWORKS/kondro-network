import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react";

interface ButtonFloatingProps {
    footer: any;
}

export default function ButtonFloating({ footer }: ButtonFloatingProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);

    const scrollButtonVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        hover: { scale: 1.1, backgroundColor: '#5dbbe9' },
        tap: { scale: 0.9 }
    };

    useEffect(() => {
        const handleScroll = () => {
            // Vérifier si l'utilisateur a défilé de plus de 20px
            setIsVisible(window.scrollY > 20);

            // Vérifier si l'utilisateur est proche du footer
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Si le haut du footer est visible dans la fenêtre
                setIsNearFooter(footerRect.top < windowHeight - 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

return (
    // Bouton flottant "Retour en haut"
    <AnimatePresence>
        {isVisible && (
            <motion.button
                className={`fixed z-500 w-14 h-14 rounded-full bg-it4a-primary text-it4a-secondary  flex items-center justify-center
                ${isNearFooter ? 'bottom-14' : 'bottom-28'} left-1/2 transform -translate-x-1/2
                `}
                onClick={scrollToTop}
                variants={scrollButtonVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                aria-label="Remonter en haut de la page"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>

                {/* Animation de pulsation pour attirer l'attention */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-it4a-primary/100 opacity-50"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.button>
        )}
    </AnimatePresence>
);
}