import { TextReveal } from '@/components/ui/text-reveal';

export default function AboutText() {

  return (
    <div className="w-full flex justify-center ">
        <TextReveal
          variant="blur"
          className="text-[32px] sm:text-[54px] hidden sm:block text-foreground  text-center w-full tracking-[-1.9px] leading-[60px]"
        >
          {"Dzignex Studio is framed not just as a \nbusiness, but a dynamic story of friendship, \ncourage, and creativity, inviting clients to be \npart of the next chapter."}
        </TextReveal>
        <TextReveal
          variant="blur"
          className=" text-[30px] sm:hidden block text-foreground  text-center w-full tracking-[-1.9px] leading-[32px]"
        >
          {"Dzignex Studio is framed \nnot just as a business, but a \ndynamic story of friendship, \ncourage, and creativity, \ninviting clients to be part of \nthe next chapter."}
        </TextReveal>
    </div>
    )
}
