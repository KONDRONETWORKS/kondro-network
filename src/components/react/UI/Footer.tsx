// src/components/Footer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TriangularBackground from './Animation/TriangularBackground';
import logo from '/WhiteLogoH.png?url';
import ButtonFloating from './components/ButtonFloating';
import { containerVariants, itemVariants } from '@/components/variantionAnimtionMotion/variantMotion';
import TransitionSVGSection from './components/TransitionSVGSection';

interface FooterSection {
  title: string;
  links: { label: string; href: string; }[];
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface ContactInfo {
  label: string;
  value: string;
  icon: string;
}

interface FooterProps {
  companyName?: string;
  description?: string;
  logo?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo[];
  copyrightText?: string;
  legalLinks?: { label: string; href: string; }[];
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  newsletterDescription?: string;
  className?: string;
  bgGradient?: string;
  textColor?: string;
  linkHoverColor?: string;
  accentColor?: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "KONDRO-NETWORKS",
  description = "Nous transformons vos idées en solutions numériques innovantes. Notre équipe d'experts est dédiée à votre réussite.",
  sections = [
    {
      title: "Navigation",
      links: [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "À propos", href: "/about" },
        { label: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Services",

      links: [
  {
    label: "Tous les services",
    href: "/services",
  },
  {
    label: "Ingénierie / Design",
    href: "/services/ingenierie-design",
  },
  {
    label: "Implémentation",
    href: "/services/implementation",
  },
  {
    label: "Études",
    href: "/services/etudes",
  },
  {
    label: "Audit / AMOA",
    href: "/services/audit-amoa",
  },
  {
    label: "Gestion de Projets",
    href: "/services/gestion-projets",
  },
  {
    label: "Support et Exploitation",
    href: "/services/support-exploitation",
  },
  {
    label: "Formation IT",
    href: "/services/formation-it",
  },
  {
    label: "Développement d’applications",
    href: "/services/developpement-applications",
  },
]

    },
    {
      title: "Légal",
      links: [
        { label: "Conditions d'utilisation", href: "#" },
        { label: "Politique de confidentialité", href: "#" },
        { label: "Mentions légales", href: "#" },
      ]
    }
  ],
  socialLinks = [
    { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", url: "#" },
    { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", url: "#" },
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z", url: "#" },
    { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", url: "#" },
    { name: "TikTok", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25h-2.84v12.44a2.92 2.92 0 11-2.11-2.83V9.57a5.59 5.59 0 105.35 5.44V9.69a6.82 6.82 0 003.37.9V6.69z", url: "#" }],

  contactInfo = [
    { label: "Email", value: "info@kondronetworks.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Téléphone", value: "+225 0748290303", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
    { label: "Adresse", value: "110 Rue Séville,Abidjan", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" }
  ],

  copyrightText = `© ${new Date().getFullYear()} ${companyName}. Tous droits réservés.`,
  legalLinks = [
    { label: "Conditions d'utilisation", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Politique de cookies", href: "#" }
  ],

  newsletterPlaceholder = "Votre email",
  newsletterButtonText = "S'inscrire",
  newsletterDescription = "Recevez nos dernières actualités et offres spéciales",
  className = "",
  bgGradient = "bg-gradient-to-br from-it4a-secondary/20 to-it4a-secondary/90",
  textColor = "text-white",
  linkHoverColor = "hover:text-it4a-primary",

}) => {

  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <TriangularBackground className="w-[100%] mt-auto " theme='dark' >
      <ButtonFloating footer={footerRef} />
      <TransitionSVGSection />
      <footer
        ref={footerRef}
        className={`${bgGradient} ${textColor} pt-16 pb-8 relative ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:flex lg:justify-evenly  gap-10 mb-12">
            {/* Colonne Logo et Description */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="aspect-auto w-2xs"
            >
              <motion.div variants={itemVariants} className="mb-2">
                <img className='object-center object-fill aspect-video' src={typeof logo === 'string' ? logo : (logo as { src: string }).src} alt="logo Ite4a" />
              </motion.div>

              <motion.p variants={itemVariants} className="text-gray-400 mb-6">
                {description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-800 hover:bg-it4a-primary transition-colors w-10 h-10 rounded-full flex items-center justify-center"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            {/* Colonnes de liens */}
            {sections.map((section) => (
              <motion.div
                key={section.title}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="lg:col-span-1"
              >
                <motion.h3
                  variants={itemVariants}
                  className={`text-lg font-bold mb-6 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 )}`}
                >
                  {section.title}
                </motion.h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <a
                        href={link.href}
                        className={`text-gray-400 ${linkHoverColor} transition-colors flex items-start group`}
                      >
                        <svg className="w-4 h-4 mt-1 mr-2 text-it4a-primary opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
            {/* Colonne Contact */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-1 "
            >
              <motion.h3
                variants={itemVariants}
                className={`text-lg font-Poppins font-bold mb-6 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 }`}
              >
                Contact
              </motion.h3>

              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    <div className="bg-blue-600/10 p-2 rounded-lg mr-3 flex items-center justify-center">
                      <svg className="w-5 h-5 text-it4a-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-Helvetica ">{info.label}</p>
                      <p className="text-gray-400 font-Poppins">{info.value}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={itemVariants} className="mt-8">
                <h4 className="font-Helvetica mb-3">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none  w-full"
                  />
                  <button className={`bg-it4a-primary/80 hover:bg-it4a-primary/90 transition-colors px-4 py-2 rounded-r-lg  ${textColor}`}>
                    {newsletterButtonText}
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  {newsletterDescription}
                </p>
              </motion.div>
            </motion.div>
          </div>
          {/* Divider */}
          <div className="border-t border-it4a-primary my-8"></div>
          {/* Bas de footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm mb-4 md:mb-0"
            >
              {copyrightText}
            </motion.p>
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`text-gray-500 ${linkHoverColor} transition-colors text-sm`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </TriangularBackground>
  );
};

export default Footer;