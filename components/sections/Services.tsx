"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Services() {
  return (
    <section data-scroll-tone id="thesis" className="py-32 px-6 md:px-12 bg-card border-t border-accent-dark/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
            HOW WE INVEST
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight max-w-4xl mb-24">
          Capital is the bridge between <span className="italic font-serif text-accent">thesis</span> and outcome. Think of us as{" "}
          <span className="italic font-serif">your lead check</span>.
        </h2>

        <div className="max-w-4xl ml-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border py-4">
              <AccordionTrigger className="text-2xl md:text-4xl font-display font-medium hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-4">
                  <span className="text-accent">{"↳"}</span> Screening & memo
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pl-12 pb-8 max-w-2xl">
                We review markets, unit economics, and risk in plain language. You get a fast yes or no and a clear path if we move forward together.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-border py-4">
              <AccordionTrigger className="text-2xl md:text-4xl font-display font-medium hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-4">
                  <span className="text-accent">{"↳"}</span> Deal terms
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pl-12 pb-8 max-w-2xl">
                Simple docs, fair ownership, and timelines you can plan around. We align incentives so founders keep control where it matters most.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-border py-4">
              <AccordionTrigger className="text-2xl md:text-4xl font-display font-medium hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-4">
                  <span className="text-accent">✳</span> Portfolio support
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pl-12 pb-8 max-w-2xl">
                Board prep, hiring intros, and follow-on planning when rounds get busy. Light touch by default—more hands-on when you ask for it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-border py-4">
              <AccordionTrigger className="text-2xl md:text-4xl font-display font-medium hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-4">
                  <span className="text-accent">{"▷"}</span> LP reporting
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pl-12 pb-8 max-w-2xl">
                Clear quarterly updates for our investors and yours. Numbers, risks, and wins—without the noise or last-minute scramble.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-border py-4">
              <AccordionTrigger className="text-2xl md:text-4xl font-display font-medium hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-4">
                  <span className="text-accent">○</span> Exits & secondaries
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground pl-12 pb-8 max-w-2xl">
                We help think through buyers, timelines, and founder outcomes when it is time to sell or raise again—practical advice grounded in what we have seen work.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
