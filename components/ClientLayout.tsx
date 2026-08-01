"use client";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"),  { ssr: false });
const Navigation   = dynamic(() => import("./Navigation"),   { ssr: false });
const Hero         = dynamic(() => import("./Hero"),          { ssr: false });
const Marquee      = dynamic(() => import("./Marquee"),       { ssr: false });
const Services     = dynamic(() => import("./Services"),      { ssr: false });
const Ticket       = dynamic(() => import("./Ticket"),        { ssr: false });
const Gallery      = dynamic(() => import("./Gallery"),       { ssr: false });
const About        = dynamic(() => import("./About"),         { ssr: false });
const Pillars      = dynamic(() => import("./Pillars"),       { ssr: false });
const Visit        = dynamic(() => import("./Visit"),         { ssr: false });
const CallBanner   = dynamic(() => import("./CallBanner"),    { ssr: false });
const Footer       = dynamic(() => import("./Footer"),        { ssr: false });
const CallPill     = dynamic(() => import("./CallPill"),      { ssr: false });

export default function ClientLayout() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Ticket />
        <Gallery />
        <About />
        <Pillars />
        <Visit />
        <CallBanner />
      </main>
      <Footer />
      <CallPill />
    </>
  );
}
