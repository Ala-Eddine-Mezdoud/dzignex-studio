import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    img: "/logo1.svg",
  },
  {
    img: "/logo2.svg",
  },
  {
    img: "/logo3.svg",
  },
  {
    img: "/logo4.svg",
  },
  {
    img: "/logo5.svg",
  },
  {
    img: "/logo6.svg",
  },
  {
    img: "/logo7.svg",
  },
  {
    img: "/logo8.svg",
  },
  {
    img: "/logo9.svg",
  },
  {
    img: "/logo10.svg",
  },
  {
    img: "/logo11.svg",
  },
  {
    img: "/logo12.svg",
  },
  {
    img: "/logo13.svg",
  },
  {
    img: "/logo14.svg",
  },
  {
    img: "/logo15.svg",
  },
  {
    img: "/logo16.svg",
  },
  {
    img: "/logo17.svg",
  },
  {
    img: "/logo18.svg",
  },
  {
    img: "/logo19.svg",
  },
  {
    img: "/logo20.svg",
  },


];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
}: {
  img: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-32 cursor-pointer overflow-hidden rounded-xl p-4  flex justify-center items-center",

      )}
    >
      <div className="flex flex items-center gap-2 justify-center ">
        <Image className="rounded-full" width="64" height="64" alt="" src={img} />
      </div>
    </figure>
  );
};

export function MarqueeLogo() {
  return (
    <div className="relative flex w-full flex items-center justify-center overflow-hidden">
      <Marquee reverse className="[--duration:20s]  ">
        {firstRow.map((review,index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
