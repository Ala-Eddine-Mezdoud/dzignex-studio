import { cn } from "../lib/utils";
import { Marquee } from "./magicui/marquee";
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
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-[360px] w-[400px] cursor-pointer overflow-hidden rounded-[20px] border border-[#f3f6ff]/10 p-[20px] bg-[#0C3EFF]/10",
        // light styles
        " bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
      )}
    >
      <div className="flex flex-row items-center gap-[16px] border-b-1 border-[#f3f6ff]/20 pb-5">
        <Image className="rounded-full" width="56" height="56" alt="" src={img} />
        <div className="flex flex-col gap-[4px]">
          <figcaption className="text-[24px] font-medium leading-[26px] tracking-[-1px] dark:text-white">
            {name}
          </figcaption>
          <p className="text-[18px] tracking-[-1px] leading-[20px] text-[#f3f6ff]/60">{username}</p>
        </div>
      </div>
      <blockquote className="mt-[24px] text-md text-[#f3f6ff]/80 text-justify ">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Left overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black  to-transparent backdrop-blur-sm"></div>

      {/* Right overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent backdrop-blur-sm"></div>
    </div>

  );
}
