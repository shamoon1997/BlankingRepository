import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionDownIcon } from "@/assets";

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
      <AccordionTrigger>
        <span className="text-12 font-mont font-semibold text-[#161616]">
          Vibration Max
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <img src="/images/graph.png" alt="" />
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
