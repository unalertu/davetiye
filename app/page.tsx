"use client";

import { useEffect, useState } from "react";
import { CountdownSection } from "@/components/CountdownSection";
import { CoverGate } from "@/components/CoverGate";
import { DateBlock } from "@/components/DateBlock";
import { Families } from "@/components/Families";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Programme } from "@/components/Programme";
import { Venue } from "@/components/Venue";

export default function Page() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return;
    }

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [opened]);

  if (!opened) {
    return <CoverGate onOpen={() => setOpened(true)} />;
  }

  return (
    <div className="flex min-h-screen w-full justify-center overflow-x-clip bg-white">
      <main
        className="
          relative
          isolate
          w-full
          max-w-[480px]
          overflow-hidden
          bg-white
          text-bordo

          md:mx-auto
          md:max-w-[900px]
          md:border
          md:border-rose/25
        "
      >
        <img
          src="/images/floral-wash.webp"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            top-[640px]
            -left-[25%]
            -z-10
            h-[900px]
            w-auto
            max-w-none
            object-contain
            opacity-[0.13]

            md:top-[760px]
            md:-left-[15%]
            md:h-[1400px]

            lg:h-[1200px]
          "
        />

        <Hero />
        <Families />
        <DateBlock />
        <Venue />
        <CountdownSection />
        <Programme />
        <Footer />
      </main>
    </div>
  );
}
