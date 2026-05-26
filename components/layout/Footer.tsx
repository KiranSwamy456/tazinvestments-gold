import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="flex-1 max-w-sm">
            <h4 className="text-muted-foreground text-xs font-semibold tracking-widest mb-6">FOCUS AREAS</h4>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>Seed & Series A</li>
              <li>Fintech & software</li>
              <li>Healthcare services</li>
              <li>Industrial & logistics</li>
              <li>Follow-on reserves</li>
            </ul>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h4 className="text-muted-foreground text-xs font-semibold tracking-widest mb-6">INVESTOR RELATIONS</h4>
              <p className="text-sm hover:text-accent cursor-pointer transition-colors">
                hello@tazinvestments.com
              </p>

              <h4 className="text-muted-foreground text-xs font-semibold tracking-widest mt-12 mb-6">
                JOIN US
              </h4>
              <p className="text-sm hover:text-accent cursor-pointer transition-colors">
                Open positions
              </p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-xs font-semibold tracking-widest mb-6">NEW YORK, US ET</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Madison Ave 450
                <br />
                {"New York, NY 10022"}
              </p>

              <h4 className="text-muted-foreground text-xs font-semibold tracking-widest mt-12 mb-6">
                SOCIALS
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    Instagram <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    LinkedIn <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    X / Twitter <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    Quarterly letters <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <h2
            data-brand-wordmark
            className="text-[8vw] leading-none font-display font-black tracking-tighter w-full text-center text-white"
          >
            tazinvestments
          </h2>
          <div className="w-full flex justify-between items-center mt-8 text-xs text-muted-foreground tracking-widest font-semibold">
            <span>CAPITAL FOR FOUNDERS WHO SHIP IN ANY MARKET</span>
            <div className="flex gap-4">
              <span>© 2026</span>
              <a href="#" className="hover:text-foreground transition-colors">
                PRIVACY POLICY
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
