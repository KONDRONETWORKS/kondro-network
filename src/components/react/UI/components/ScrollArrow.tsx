import React, { useState, useEffect } from "react";

/**
 * Component displaying a scrolling arrow at the bottom of the viewport.
 * It is conditionally rendered based on the scroll position.
 * When the user scrolls up, the arrow disappears.
 * When the user scrolls down, the arrow reappears.
 * The arrow is animated to give a sense of movement.
 */
const ScrollArrow = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        /**
         * Event listener for the scroll event.
         * When the user scrolls, the show state is updated.
         */
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        /**
         * Add the event listener to the window.
         * The event listener is removed when the component is unmounted.
         */
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                left: "50%",
                top: "87%",
                transform: "translateX(-50%)",
                opacity: show ? 1 : 0,
                visibility: show ? "visible" : "hidden",
                transition: "all 0.5s ease",
                zIndex: 10,
                pointerEvents: "none",
            }}
            className="flex flex-col justify-center items-center "
        >


            {/* Container des flèches */}
            <div className="relative flex flex-col items-center">
                {/* Flèche 1 - Plus petite, plus rapide */}
                <div
                    style={{
                        width: 12,
                        position:'relative',
                        height: 12,
                        borderLeft: "3px solid #5dbbe9",
                        borderBottom: "3px solid #5dbbe9",
                        transform: "rotate(-45deg)",
                        animation: show ? "bounceDown 1s ease-in-out infinite" : "none",
                        animationDelay: "0s",
                        filter: "drop-shadow(0 0 3px rgba(241, 202, 19, 0.4))",
                    }}
                />
                
                {/* Flèche 2 - Moyenne */}
                <div
                    style={{
                        position:'relative',
                        width: 18,
                        height: 18,
                        borderLeft: "3px solid #5dbbe9",
                        borderBottom: "3px solid #5dbbe9",
                        transform: "rotate(-45deg)",
                        animation: show ? "bounceDown 1s ease-in-out infinite" : "none",
                        animationDelay: "0.3s",
                        filter: "drop-shadow(0 0 5px rgba(241, 202, 19, 0.5))",
                        marginTop: "-2px",
                    }}
                />
                
                {/* Flèche 3 - Plus grande, plus lente */}
                <div
                    style={{
                        position:'relative',
                        width: 24,
                        height: 24,
                        borderLeft: "4px solid #5dbbe9",
                        borderBottom: "4px solid #5dbbe9",
                        transform: "rotate(-45deg)",
                        animation: show ? "bounceDown 1s ease-in-out infinite" : "none",
                        animationDelay: "0.6s",
                        filter: "drop-shadow(0 0 8px rgba(241, 202, 19, 0.6))",
                        marginTop: "-3px",
                    }}
                />
            </div>

            {/* Indicateur de mouvement supplémentaire */}
            <div 
                style={{
                    width: "2px",
                    height: "40px",
                    background: "linear-gradient(to bottom, transparent, #5dbbe9, transparent)",
                    animation: show ? "slideDown 2s ease-in-out infinite" : "none",
                    marginTop: "8px",
                    borderRadius: "1px",
                }}
            />

            <style>{`
                @keyframes bounceDown {
                    0%, 100% { 
                        top:0px;
                        opacity: 0.7;
                    }
                    50% { 
                        top:8px;
                        opacity: 1;
                    }
                }

                @keyframes slideDown {
                    0% {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                }

                /* Animation au survol pour plus d'interactivité */
                @media (hover: hover) {
                    .scroll-arrow-container:hover .arrow {
                        animation-duration: 1s !important;
                        transform: rotate(-45deg) scale(1.1);
                    }
                }
            `}</style>
        </div>
    );
};

export default ScrollArrow;