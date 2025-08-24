import DecryptedText from "../Text/DecryptedText";
import {motion } from "framer-motion";

type titleDescriptProst = {
    title:string,
    title2?:string,
    descript?:string
    className?:React.ReactNode
}

export default function TitleDescript(prost: titleDescriptProst){

    const { title, title2 , descript, className } = prost;

    const basecss :string = "text-center"
    return(
        <div className={ `${basecss}  ${className}`}>
            <motion.h2  initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}}  className=" text-2xl md:text-5xl lg:text-5x text-white font-bold sm:text-2xs mb-3">
                {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-it4a-primary to-it4a-secondary">{title2}</span>
            </motion.h2>
            <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
                <DecryptedText speed={100}  animateOn="view" text={descript??''}/>
            </p>
        </div>
    );
}