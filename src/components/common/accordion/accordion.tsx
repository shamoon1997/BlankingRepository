import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionSelectDropDown } from "../accordion-select/accordion-select";
import { AccordionDownIcon, BlobToolTipIcon } from "@/assets";

type AccordionItemProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Accordion.Item>;

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  ...props
}) => (
  <Accordion.Item
    className="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 focus-within:relative focus-within:z-10"
    {...props}
  >
    {children}
  </Accordion.Item>
);

type AccordionTriggerProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Accordion.Trigger>;

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  ...props
}) => (
  <Accordion.Header>
    <Accordion.Trigger
      className="hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none outline-none"
      {...props}
    >
      <AccordionDownIcon className="mr-2" aria-hidden />
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
);

type AccordionContentProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Accordion.Content>;

const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  ...props
}) => (
  <Accordion.Content
    className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden"
    {...props}
  >
    <div className="px-5 py-[15px]">{children}</div>
  </Accordion.Content>
);

export const AccordionDemo: React.FC = () => (
  <Accordion.Root type="single" defaultValue={"item-1"} collapsible>
    <AccordionItem value="item-1">
      <div className="flex justify-between">
        <AccordionTrigger>
          <span className="text-12 font-mont font-semibold text-[#161616]">
            Vibration Max
          </span>
        </AccordionTrigger>
        <div className="mr-[10px] flex h-[18px] w-[111px] flex-shrink-0 items-center justify-center rounded-[4px] border border-solid border-[#8A8A8A] bg-white">
          <div className="flex gap-x-[5px]">
            <div className="flex items-center [&_path]:fill-[#628FEE]">
              <BlobToolTipIcon />
            </div>
            <div className="letter-spacing-[0.5px] text-center font-mont text-[10px] font-bold leading-normal tracking-tighter text-[#5B5B5B]">
              Max 02:00
            </div>
          </div>
        </div>
      </div>

      <AccordionContent>
        <div className="flex flex-col">
          <div>
            <img src="/images/graph.png" alt="" />
          </div>
          <div>
            <AccordionSelectDropDown />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>
        <span className="text-12 font-mont font-semibold text-[#161616]">
          Acoustic Max
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <img src="/images/graph.png" alt="" />
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);
