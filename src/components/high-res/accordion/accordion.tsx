import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AudioButton } from "../audio-button/Audio-button";
import { AudioPauseButton } from "../audio-pause-button/Audio-pause-button";
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

export const AccordionHighRes: React.FC = () => (
  <Accordion.Root type="single" defaultValue={""} collapsible>
    <AccordionItem value="item-1" className="mb-2 bg-[#F5F5F5]">
      <div className="mr-2 flex items-center justify-between">
        <AccordionTrigger>
          <span className="text-12 font-mont font-semibold text-[#161616]">
            Vibration(i)
          </span>
        </AccordionTrigger>
        <AudioPauseButton />
      </div>

      <AccordionContent>
        <div className="flex flex-col">
          <div>
            <img src="/images/graph-highres1.png" alt="" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2" className="mb-2 bg-[#F5F5F5]">
      <div className="mr-2 flex items-center justify-between">
        <AccordionTrigger>
          <span className="text-12 font-mont font-semibold text-[#161616]">
            Vibration(g)
          </span>
        </AccordionTrigger>
        <AudioButton />
      </div>

      <AccordionContent>
        <div className="flex flex-col">
          <div>
            <img src="/images/graph-highres2.png" alt="" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3" className="mb-2 bg-[#F5F5F5]">
      <div className="mr-2 flex items-center justify-between">
        <AccordionTrigger>
          <span className="text-12 font-mont font-semibold text-[#161616]">
            Vibration(k)
          </span>
        </AccordionTrigger>
        <AudioButton />
      </div>

      <AccordionContent>
        <div className="flex flex-col">
          <div>
            <img src="/images/graph-highres3.png" alt="" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-4" className="mb-2 bg-[#F5F5F5]">
      <div className="mr-2 flex items-center justify-between">
        <AccordionTrigger>
          <span className="text-12 font-mont font-semibold text-[#161616]">
            Acoustic
          </span>
        </AccordionTrigger>
        <AudioButton />
      </div>

      <AccordionContent>
        <div className="flex flex-col">
          <div>
            <img src="/images/graph-highres4.png" alt="" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-5" className="mb-2 bg-[#F5F5F5]">
      <div className="mr-2 flex items-center justify-between">
        <AccordionTrigger>
          <span className="text-12 font-mont font-semibold text-[#161616]">
            Electrometer volts
          </span>
        </AccordionTrigger>
      </div>

      <AccordionContent>
        <div className="flex flex-col">
          <div>
            <img src="/images/graph-highres5.png" alt="" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);
