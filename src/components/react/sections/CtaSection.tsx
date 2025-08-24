import GlowButton from "../UI/components/GlowButton";
import TitleDescript from "../UI/components/TitleDescript";
import { Backgrounds } from "@/assets/assets";
import LightCommunicationBackground from "../UI/Animation/LightCommunicationBackground";




function CtaSection() {

  const backgroundImage = Backgrounds.find(bg => bg.title === 'backgroundHero');

    return(
        <section id="contact"  className="w-full relative z-0">
          <LightCommunicationBackground
            animationSpeed={5}
            parallaxIntensity={.3}
            showParticles={true}
            communicationFrequency={200}
            pointCount={60}
            className='relative flex   w-full top-0 left-0' 
            
            >

        <img src={backgroundImage?.image} alt={backgroundImage?.title} className="w-full  h-full absolute -z-40 object-center aspect-video drop-shadow-2xl drop-shadow-it4a-secondary grayscale-300 saturate-200 opacity-50 " />
        <div className="max-w-4xl mx-4 md:mx-auto  my-20  ">
          <div className="flex flex-col gap-2 md:gap-4 bg-gradient-to-br from-it4a-primary/30 to-it4a-secondary backdrop-blur-lg backdrop-grayscale-700  rounded-2xl p-2 md:p-12 border border-white/50">
            <TitleDescript className={``} title="Transformer votre" title2="infrastructure IT ?" descript={`Contactez nos experts dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons optimiser vos systèmes.`}/>   
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
              <GlowButton href="/contact" variant="primary" className="text-xs text-center md:text-lg">
                Contactez nous
              </GlowButton>
              <GlowButton  href="/about" variant="outline" className="text-xs md:text-lg">
                En Savoir Plus 
              </GlowButton>
            </div>
          </div>
        </div>
        </LightCommunicationBackground>
      </section>
    );
}

export default CtaSection;