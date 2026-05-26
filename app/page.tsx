import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Blog } from "@/components/sections/Blog";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-accent-foreground">
      <Header />
      <BottomNav />
      <main>
        <Hero />
        <ClientLogos />
        <CaseStudies />
        <Services />
        <Studio />
        <ContactCTA />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
