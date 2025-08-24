import React, { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type GlowButtonProps = ButtonProps | AnchorProps;

/**
 * A button component with a glow effect.
 *
 * @example
 * <GlowButton href="https://example.com">Visit Example</GlowButton>
 * <GlowButton variant="secondary">Secondary Button</GlowButton>
 * <GlowButton variant="outline">Outline Button</GlowButton>
 *
 * @param {ReactNode} children - The children of the button.
 * @param {"primary" | "secondary" | "outline"} [variant="primary"] - The variant of the button.
 * @param {string} [className=""] - The className of the button.
 * @param {ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>} props - The props of the button or a link.
 * @returns {ReactElement} A button component with a glow effect.
 */

const GlowButton: React.FC<GlowButtonProps> = (props) => {
  const {
    children,
    variant = "primary",
    className = "",
    ...rest
  } = props;

  const baseClasses =
    "text-center px-8 flex items-center justify-center py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group relative z-10";
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-it4a-primary to-it4a-secondary text-white hover:bg-it4a-primary hover:shadow-2xl hover:shadow-it4a-primary/50",
    secondary:
      "bg-gradient-to-r from-it4a-secondary to-it4a-primary text-white hover:shadow-2xl hover:shadow-[#0a84c1]/50",
    outline:
      "border-2 border-it4a-primary text-it4a-primary hover:bg-it4a-primary hover:text-white hover:shadow-2xl hover:shadow-it4a-primary/50",
  };

  if ("href" in props && props.href) {
    return (
      <a
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={props.href}
      >
        
          {children}
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
    
        {children}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
};

export default GlowButton;
