"use client";

import Image from "next/image";
import { ImageHoverBlock } from "@/components/ImageHoverBlock";
import { investmentImages } from "@/lib/investmentMedia";

const C = [
  investmentImages.a,
  investmentImages.b,
  investmentImages.c,
  investmentImages.d,
  investmentImages.e,
  investmentImages.f,
] as const;

const CASE_STUDIES = [
  {
    id: 1,
    client: "SUMMIT LEDGER",
    title: "Series A",
    description:
      "We led pricing and governance for a fintech ledger launch—clear story for banks, clean risk section, and a tight path to revenue.",
    image: C[0],
    size: "large",
  },
  {
    id: 2,
    client: "NORTHLINE DATA",
    title: "Growth equity",
    description: "Turning noisy metrics into a calm investor deck—one narrative, one model, and faster LP updates each quarter.",
    image: C[1],
    size: "small",
  },
  {
    id: "quote-1",
    type: "quote" as const,
    quote:
      "Taz moved fast, asked hard questions, and never wasted a meeting. They are the first call when we raise again.",
    author: "M. Chen, CFO, Northline Data",
  },
  {
    id: 3,
    client: "RIVERSTONE PAY",
    title: "Payments API",
    description:
      "Riverstone needed a simple story for regulators and buyers. We tightened the product map and the numbers behind it.",
    image: C[2],
    size: "small",
  },
  {
    id: 4,
    client: "HARPER FINTECH",
    title: "Platform scale",
    description:
      "Harper connects SMB cashflow to credit. We helped sharpen ICP, pricing, and the rollout plan for their next two markets.",
    image: C[3],
    size: "large",
  },
  {
    id: 5,
    client: "COASTLINE WEALTH",
    title: "RIA rollout",
    description:
      "Coastline needed a calm brand for new HNW clients. We simplified the offer, the fees page, and the first-call script.",
    image: C[4],
    size: "large",
  },
  {
    id: 6,
    client: "ALTA DEFENSE",
    title: "Dual-use",
    description:
      "Alta pairs sensors with finance workflows for defense buyers. We framed the story without losing technical depth.",
    image: C[5],
    size: "small",
  },
  {
    id: "quote-2",
    type: "quote" as const,
    quote:
      "Clear terms, clear timeline. We closed with less back-and-forth than our last round and better alignment on the cap table.",
    author: "J. Ortiz, CEO, Alta Defense",
  },
  {
    id: 7,
    client: "EMBER CREDIT",
    title: "Lending pilot",
    description: "Battling churn with better underwriting stories—tighter cohorts, clearer loss notes, and faster board reads.",
    image: C[0],
    size: "large",
  },
  {
    id: 8,
    client: "FIELDSTONE SAAS",
    title: "ARR focus",
    description: "Over four hundred teams use Fieldstone to track pipeline cash. We helped rebalance the story for enterprise buyers.",
    image: C[1],
    size: "small",
  },
  {
    id: 9,
    client: "LUMEN BIO",
    title: "Clinical step",
    description: "We built Lumen’s raise narrative around one trial milestone—simple slides, one data room, fewer surprises for LPs.",
    image: C[2],
    size: "small",
  },
  {
    id: 10,
    client: "RED CANYON LOGISTICS",
    title: "Fleet ops",
    description:
      "From first diligence to final deck, we helped them show margin path and ops risk in language carriers already trust.",
    image: C[3],
    size: "large",
  },
  {
    id: "quote-3",
    type: "quote" as const,
    quote:
      "They respected our pace and pushed only where it mattered. Our team felt supported, not second-guessed, through the close.",
    author: "A. Patel, COO, Red Canyon Logistics",
  },
  {
    id: 11,
    client: "SILVER MAPLE EV",
    title: "Charging net",
    description: "We partnered on story and site for a regional EV charge roll-up—credible numbers and a clean path to scale.",
    image: C[4],
    size: "small",
  },
  {
    id: 12,
    client: "PINNACLE PIPELINE",
    title: "RevOps",
    description: "Pinnacle turned a messy sales stack into one forecast view. We helped them show it to buyers in one sitting.",
    image: C[5],
    size: "small",
  },
  {
    id: 13,
    client: "MATRIX VAULT",
    title: "Data room",
    description:
      "With Matrix, teams share large files with audit trails—no extra tools. We tightened the buyer story and the security page.",
    image: C[0],
    size: "large",
  },
] as const;

export function CaseStudies() {
  return (
    <>
      <section id="works" data-scroll-tone className="pt-32 pb-16 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-medium text-muted-foreground leading-relaxed">
              {
                "Investor-first, early capital that screens fairly, supports operators, and stays aligned from first check through every growth round we join."
              }
            </p>
          </div>
        </div>
      </section>

      <section data-scroll-tone className="pt-8 pb-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-x-12 md:gap-y-24 items-start">
            {CASE_STUDIES.map((item, index) => {
              if ("type" in item && item.type === "quote") {
                return (
                  <div key={item.id} className="col-span-1 md:col-span-12 my-12">
                    <div className="p-12 md:p-24 bg-card rounded-[2rem] border border-border">
                      <blockquote className="text-2xl md:text-4xl font-display font-medium leading-[1.2] max-w-4xl mx-auto text-center">
                        {`"${item.quote}"`}
                        <footer className="mt-8 text-sm font-sans font-bold tracking-widest text-muted-foreground uppercase">
                          — {item.author}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                );
              }

              const study = item as {
                id: number;
                client: string;
                title: string;
                description: string;
                image: string;
                size: string;
              };
              const isLarge = study.size === "large";
              const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";

              return (
                <div key={study.id} className={`cursor-pointer ${colSpan}`}>
                  <ImageHoverBlock
                    aspectClassName={isLarge ? "aspect-[16/10]" : "aspect-square"}
                    revealDelay={(index % 4) * 0.08}
                    overlayPosition="top"
                    overlay={
                      <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-background/80 backdrop-blur-md rounded-full border border-white/10 text-white">
                        Portfolio
                      </span>
                    }
                    caption={
                      <div className="pr-8 pt-6">
                        <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-3">
                          {study.client}
                        </h3>
                        <p className="text-lg md:text-2xl font-medium leading-snug text-foreground/90">
                          {study.description}
                        </p>
                      </div>
                    }
                  >
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </ImageHoverBlock>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
