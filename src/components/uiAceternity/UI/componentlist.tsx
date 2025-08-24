
import { cn } from "@/lib/utils";
import { Monitor, Server, Wifi, Lock } from "lucide-react";
import ScrollReveal from "@/components/react/UI/Animation/ScrollReveal";

interface ServicesProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode|any;
  index?: number;
  className?: string;
}


const additionalServices = [
  {
    icon: <Wifi/>,
    title: "Wi-Fi Professionnel",
    description: "Solutions Wi-Fi haute performance pour entreprises",
  },
  {
    icon: <Server/>,
    title: "Infrastructure Serveurs",
    description: "Installation et gestion de serveurs d'entreprise",
  },
  {
    icon: <Monitor/>,
    title: "Monitoring & Supervision",
    description: "Surveillance continue de votre infrastructure IT",
  },
  {
    icon: <Lock/>,
    title: "Sécurité Avancée",
    description: "Protection multicouche contre les cybermenaces",
  },
];


const ServicesComponents: React.FC<ServicesProps> = ({
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



export const ServicesComplementaire: React.FC<ServicesProps> = (
  { className }
) => {
  return (

    <section className={` py-2 md:p-4 h-full w-full flex flex-col items-center  justify-center scroll-mt-px z-0 ${className} `}>
      <div className={` container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-3  `}>
        {additionalServices.map((services, index) => (
          <ServicesComponents key={services.title} {...services} index={index} />
        ))}
      </div>
    </section>
  );
}




export default {ServicesComponents, ServicesComplementaire}