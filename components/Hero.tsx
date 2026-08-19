"use client";

import { useEffect, useRef } from "react";
import { COUPLE, EVENT, HERO } from "@/lib/invitation";
import { Flourish, Rule } from "./Ornaments";

/** Distance in px over which the hero parallax runs from 0 to 1. */
const SCROLL_RANGE = 750;
/** Per-frame easing towards the target, giving the drift its lag. */
const SMOOTHING = 0.065;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const venueRef = useRef<HTMLImageElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame: number;

    const measure = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      target.current = Math.min(Math.max(-top / SCROLL_RANGE, 0), 1);
    };

    const tick = () => {
      current.current += (target.current - current.current) * SMOOTHING;
      const p = current.current;

      if (venueRef.current) {
        venueRef.current.style.transform = `translate3d(0, ${-90 * p}px, 0)`;
      }
      if (cloudRef.current) {
        cloudRef.current.style.transform = `translate3d(${-120 + 260 * p}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        w-full
        overflow-hidden
      "
    >
      <img
        ref={cloudRef}
        src="/images/cloud.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          top-[70px]
          left-[-10%]

          z-0

          h-auto
          w-[120%]
          max-w-none

          object-contain

          opacity-[0.40]

          will-change-transform

          sm:top-[75px]

          md:top-[90px]
          md:w-[110%]
        "
        style={{ transform: "translate3d(-120px, 0, 0)" }}
      />

      <header
        className="
          relative
          z-20

          flex
          w-full
          flex-col
          items-center

          px-4
          pt-[80px]
          pb-6

          sm:px-5

          md:pt-[110px]
          md:pb-10
        "
      >
        <img
          src="/images/corner-left.webp"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute

            top-[18px]
            left-[8px]

            z-10

            h-auto
            w-[190px]
            max-w-none

            object-contain
            select-none

            sm:top-[20px]
            sm:left-[12px]
            sm:w-[220px]

            md:top-[24px]
            md:left-[24px]
            md:w-[290px]

            lg:left-[36px]
            lg:w-[320px]
          "
        />
        <img
          src="/images/corner-right.webp"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute

            top-[18px]
            right-[8px]

            z-10

            h-auto
            w-[190px]
            max-w-none

            object-contain
            select-none

            sm:top-[20px]
            sm:right-[12px]
            sm:w-[220px]

            md:top-[24px]
            md:right-[24px]
            md:w-[290px]

            lg:right-[36px]
            lg:w-[320px]
          "
        />

        <div
          className="
            relative
            z-30

            flex
            items-center
            justify-center

            gap-3

            text-bordo

            md:gap-4
          "
        >
          <Rule className="h-auto w-[42px] md:w-[60px]" />
          <Flourish className="h-[30px] w-auto md:h-[36px]" />
          <Rule className="h-auto w-[42px] md:w-[60px]" />
        </div>

        <div
          className="
            relative
            z-30

            mt-14

            flex
            w-full
            flex-col
            items-center
            justify-center

            text-center

            md:mt-20
          "
        >
          <div
            className="
              font-script

              flex
              w-full
              items-center
              justify-center

              whitespace-nowrap

              px-1

              font-normal
              normal-case

              text-ink
            "
            style={{ fontSize: "clamp(42px, 10vw, 82px)", lineHeight: 1.1 }}
          >
            <span>{COUPLE.bride}</span>
            <span
              className="
                font-script
                mx-[0.16em]
                inline-block
                font-normal
                text-bordo
              "
            >
              &amp;
            </span>
            <span>{COUPLE.groom}</span>
          </div>

          <img
            src="/images/rings.webp"
            alt="Nişan yüzükleri"
            className="
              mt-10

              h-auto
              w-[96px]

              object-contain

              sm:mt-11
              sm:w-[112px]

              md:mt-12
              md:w-[130px]
            "
          />

          <p
            className="
              font-script

              mt-9

              whitespace-nowrap
              text-center

              text-[34px]
              font-normal

              leading-none

              text-ink

              sm:text-[40px]

              md:mt-11
              md:text-[52px]
            "
          >
            {HERO.invitationText}
          </p>
        </div>

        <div
          className="
            relative

            mt-14

            flex
            w-full
            shrink-0
            justify-center

            sm:mt-16

            md:mt-20
          "
        >
          <img
            ref={venueRef}
            src="/images/venue.webp"
            alt={EVENT.venue}
            className="
              relative
              z-10

              mx-auto

              block

              h-auto

              w-[80%]
              max-w-[390px]

              object-contain

              opacity-[0.72]

              will-change-transform

              sm:w-[60%]
              sm:max-w-[435px]

              md:w-[54%]
              md:max-w-[520px]

              lg:max-w-[550px]
            "
            style={{ transform: "translate3d(0, 0, 0)" }}
          />
        </div>
      </header>
    </section>
  );
}
