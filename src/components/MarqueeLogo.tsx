import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Omar.B",
    username: "Founder, TimePlus",
    body: "Very satisfied with the experience with Dzignex Studio! Thank you for the fast service, attentive listening to our needs, and the professional quality of communication and execution. Excellent value for money that exceeded our expectations.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Abdennour.A",
    username: "Founder, Avure Skincare",
    body: "We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Abdennour.B",
    username: "Founder, SLeek Marketing Agency",
    body: "Honestly, I really liked your work! the logo shows the spirit and identity of my project with a modern touch, the colors, the writing and the design are well chosen and give a professional and creative result. it's exactly the image I wanted for my clients. Thank you for your professionalism and hard work.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
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
        "relative h-full w-32 cursor-pointer overflow-hidden rounded-xl p-4 ",
        // light styles
        " bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        " dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2 justify-center ">
        <Image className="rounded-full" width="32" height="32" alt="" src={img} />
      </div>
    </figure>
  );
};

export function MarqueeLogo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
