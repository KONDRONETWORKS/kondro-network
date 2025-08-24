import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import {Patener,Reference} from "@/assets/assets";
import TitleDescript from "../UI/components/TitleDescript";

const reviews = Patener.map((partner) => ({
  title: partner.title,
  img: partner.image,
}));

const reviews2 = Reference.map((ref) => ({
  title: ref.title,
  img: ref.image,
}));



const firstRow = reviews;
const secondRow = reviews2;

const ReviewCard = ({
  title,
  img,

}: {
  title:string;
  img: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-10 md:h-20  w-full cursor-pointer overflow-hidden   md:rounded-xl   md:p-2 flex items-center justify-center",
        " bg-gray-950/[.01] hover:bg-black/[.05]",
      )}
    >
      <div className="relative  w-full h-full  aspect-video flex flex-row items-center justify-center">
        <img className="w-full h-full  object-center object-fill absolute drop-shadow-it4a-secondary drop-shadow-2xl " src={img} alt={title} />
      </div>
    </figure>
  );
};

function SectionPartner() {
  return (

    <div className="relative flex w-full flex-col items-center backdrop-brightness-100 backdrop-blur-xs backdrop-opacity-95  justify-center py-10 px-4  overflow-hidden">
      <TitleDescript title="Nos Partenaires" title2="et Références" descript="Des collaborations solides pour des solutions innovantes" className="text-center mb-10"/>

      <Marquee pauseOnHover  className="[--duration:100s] w-full md:w-3/4">
        {firstRow.map((review) => (
            <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover  className="[--duration:100s] w-full md:w-3/4">
        {secondRow.map((review2) => (
            <ReviewCard key={review2.title} {...review2} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/80"/>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/80"/>
    </div>
  );
}

export default SectionPartner;