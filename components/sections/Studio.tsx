import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ImageHoverBlock } from "@/components/ImageHoverBlock";
import { investmentImages } from "@/lib/investmentMedia";

export function Studio() {
  return (
    <section id="about" data-scroll-tone className="py-32 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8 block">OUR TEAM</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight max-w-4xl">
            We invest with discipline and stay close when it counts.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fintech, software, and healthcare — we focus where cashflow and regulation meet. We are not cheerleaders; we push back when the model drifts. The best founders want honest partners.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          <div className="md:col-span-7 flex flex-col gap-6">
            <ImageHoverBlock
              aspectClassName="aspect-[4/3]"
              revealDelay={0}
              overlay={
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-background/50 backdrop-blur-md rounded-full text-white">
                  IC MEETING
                </span>
              }
            >
              <Image
                src={investmentImages.team1}
                alt="Investment team in session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </ImageHoverBlock>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            <ImageHoverBlock
              aspectClassName="aspect-square"
              revealDelay={0.1}
              overlay={
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-background/50 backdrop-blur-md rounded-full text-white">
                  LP DINNER
                </span>
              }
            >
              <Image
                src={investmentImages.team2}
                alt="Partners at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </ImageHoverBlock>
            <ImageHoverBlock
              aspectClassName="aspect-[16/9]"
              revealDelay={0.2}
              overlay={
                <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-background/50 backdrop-blur-md rounded-full text-white">
                  ANNUAL MEET
                </span>
              }
            >
              <Image
                src={investmentImages.team3}
                alt="Portfolio day"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </ImageHoverBlock>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-6">
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              We do not just wire capital: we build trust. Each diligence pass, memo line, and board prep is a multiplier for your next round. You work with people who stay calm when markets move.
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-32">
          <a
            href="#"
            data-solid-control
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            Meet the partners <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-4xl font-display font-medium leading-tight text-muted-foreground">
            {
              '"We back teams we would work for ourselves—focused energy, honest feedback, and capital that shows up when the plan shifts."'
            }
          </blockquote>
        </div>
      </div>
    </section>
  );
}
