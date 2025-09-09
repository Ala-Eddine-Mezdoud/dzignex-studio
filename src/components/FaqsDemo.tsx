import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion"

export function FaqsDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full "
      defaultValue="item-1"
    >


      <AccordionItem value="item-1" className="rounded-[20px] border-[#f3f6ff]/10 bg-[#010110] text-[#f3f6ff] px-8">
        <AccordionTrigger className="text-[22px] font-medium tracking-[-1px]">What do I need to get started?</AccordionTrigger>
        
        <AccordionContent className="flex flex-col gap-4 text-balance r text-[18px] text-[#f3f6ff]/80">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>



      </AccordionItem>
      <AccordionItem value="item-2" className="rounded-[20px] border-[#f3f6ff]/10 bg-[#010110] text-[#f3f6ff] px-8">
        <AccordionTrigger className="text-[22px] font-medium tracking-[-1px]">Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance r text-[18px] text-[#f3f6ff]/80">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="rounded-[20px] border-[#f3f6ff]/10 bg-[#010110] text-[#f3f6ff] px-8">
        <AccordionTrigger className="text-[22px] font-medium tracking-[-1px]">Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance r text-[18px] text-[#f3f6ff]/80">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="rounded-[20px] border-[#f3f6ff]/10 bg-[#010110] text-[#f3f6ff] px-8">
        <AccordionTrigger className="text-[22px] font-medium tracking-[-1px]">Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance r text-[18px] text-[#f3f6ff]/80">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5" className="rounded-[20px] border-[#f3f6ff]/10 bg-[#010110] text-[#f3f6ff] px-8">
        <AccordionTrigger className="text-[22px] font-medium tracking-[-1px]">Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance r text-[18px] text-[#f3f6ff]/80">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6" className="rounded-[20px] border-[#f3f6ff]/10 bg-[#010110] text-[#f3f6ff] px-8">
        <AccordionTrigger className="text-[22px] font-medium tracking-[-1px]">Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance r text-[18px] text-[#f3f6ff]/80">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>



    </Accordion>
  )
}
