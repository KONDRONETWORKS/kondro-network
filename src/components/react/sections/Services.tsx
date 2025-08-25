import { cn } from "../../../lib/utils";
import { Cloud, Code, Settings, Users, Shield, Search, FolderOpen ,ArrowUpRightFromCircleIcon,  BookOpen} from 'lucide-react';
import TriangularBackground from "../UI/Animation/TriangularBackground";
import TitleDescript from "../UI/components/TitleDescript";
import TransitionSVGSection from "../UI/components/TransitionSVGSection";
import GlowButton from "../UI/components/GlowButton";


interface ServicesProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  index?: number;
  className?: string;
}


export const ServicesSection: React.FC<ServicesProps> = (
  { className }
) => {

const services = [
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Ingénierie / Design",
    description: "Conception d’architectures réseau et IT sur mesure, alignées sur vos enjeux métiers.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Implémentation",
    description: "Déploiement rapide et sécurisé de vos solutions technologiques.",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Études",
    description: "Analyses stratégiques pour optimiser vos choix IT et maximiser le ROI.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Audit / AMOA",
    description: "Évaluation indépendante et accompagnement pour vos projets de transformation numérique.",
  },
  {
    icon: <FolderOpen className="w-8 h-8" />,
    title: "Gestion de Projets",
    description: "Pilotage rigoureux garantissant délais, coûts et résultats maîtrisés.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Support et Exploitation",
    description: "Supervision et maintenance proactive pour assurer continuité et performance.",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Formation IT",
    description: "Programmes adaptés pour renforcer durablement les compétences de vos équipes.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Développement d’applications",
    description: "Solutions logicielles sur mesure adaptées à vos besoins spécifiques.",
  },
];
  return (
    <TriangularBackground theme="dark" className="w-full h-full">
      <section id="services" className={` py-10 md:py-20 h-full w-full flex flex-col items-center backdrop-blur-xs px-2  md:px-4  bg-it4a-secondary/50 justify-center scroll-mt-px z-0 ${className} `}>
        <TransitionSVGSection />
        <TitleDescript title="Nos services" title2="IT sur mesure" descript="Des solutions complètes pour accompagner votre transformation numérique" />
        <GlowButton href="/services" variant="outline" className="rounded-b-full mt-2  grop-hover:rounded-ee-ful transition-all ease-in-out overflow-hidden .4s">
          <ArrowUpRightFromCircleIcon/>
        </GlowButton>
        <div className={` container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto `}>
          {services.map((services, index) => (
            <Services key={services.title} {...services} index={index} />
          ))}
        </div>
      </section>
    </TriangularBackground>
  );
}
const Services: React.FC<ServicesProps> = ({
  title,
  description,
  icon,
  index = 0,
}) => {
  return (
    <div id="services"
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/Services border-neutral-800 bg-white/20 text-white",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b order-it4a-primary/20"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/Services:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/Services:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-it4a-primary  ">
        {icon}
      </div>
      <div className="text-xs md:text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/Services:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-00 dark:bg-neutral-700 group-hover/Services:bg-it4a-primary transition-all duration-200 origin-center" />
        <span className="group-hover/Services:translate-x-2 transition duration-200 inline-block text-transparent bg-clip-text bg-gradient-to-r from-it4a-primary to-it4a-secondary">
          {title}
        </span>
      </div>
      <p className="text-sm  max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default ServicesSection;