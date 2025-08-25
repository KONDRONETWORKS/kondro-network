import ChromaGrid, { type ChromaItem } from "../UI/components/ChromaGrid";
import TitleDescript from "../UI/components/TitleDescript";
import SanteImage from "/image/sections/image-service-sante.jpg?url";
import BanckImage from "/image/sections/image-service-banck.jpg?url";
import EcomImage from "/image/sections/image-service-ecommerce.jpg?url";
import LogistiqueImage from "/image/sections/image-service-logistique.jpg?url";
import NetworkImage from "/image/sections/image-service-network.jpg?url";
import SecurityImage from "/image/sections/image-service-security.jpg?url";
import TriangularBackground from "../UI/Animation/TriangularBackground";
import { motion } from "framer-motion";

export default function SectorActivitet(){
    const sectors: ChromaItem[] = [
    { title: "Santé", image: SanteImage },
    { title: "Finance & Banque / Assurances", image: BanckImage },
    { title: "Télécommunications & Médias", image: NetworkImage },
    { title: "Securite", image: SecurityImage },
    { title: "Éducation & Formation", image: EcomImage },
    { title: "Secteur Public & Administrations", image: LogistiqueImage }
  ];
    
  return(
        <TriangularBackground className="bg-transparent w-full" fadeSpeed={20} lineOpacity={100}  pointCount={100} theme="dark">
          <motion.section initial={{opacity:0,y:34 }} whileInView={{opacity:1,y:0}} viewport={{once:true}} className=" w-full py-10 px-4 bg-gradient-to-r from-it4a-primary/500 via-it4a-secondary to-it4a-secondary/50">
            <div className="container flex flex-col itmes-center justify-center gap-1 max-w-7xl mx-auto">
              <TitleDescript title="Secteurs" title2="KONDRO NETWORKS" descript="Nous accompagnons les entreprises de tous secteurs avec des technologies de pointe"/>
              <ChromaGrid className="bg-transparent backdrop-blur-xs p-4 rounded-2xl place-items-center font-Poppins" items={sectors}/>
            </div>
          </motion.section>
        </TriangularBackground>
  );
}