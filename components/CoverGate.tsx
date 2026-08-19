import { COUPLE, HERO, SPARKLES } from "@/lib/invitation";

export function CoverGate({ onOpen }: { onOpen: () => void }) {
  return (
    <main
      className="
        fixed
        inset-0
        z-[200]
        flex
        min-h-[100svh]
        items-center
        justify-center
        overflow-hidden
        bg-white
        px-4
        py-6
        text-ink

        sm:px-6
      "
    >
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            animate-pulse
            text-rose/45
          "
          style={{ left: s.left, top: s.top, animationDelay: s.delay, fontSize: s.size }}
        >
          ✦
        </span>
      ))}

      <div
        className="
          relative
          flex
          min-h-[500px]
          w-full
          max-w-[560px]
          flex-col
          items-center
          justify-center
          overflow-hidden
          rounded-[4px]
          border
          border-rose/45
          bg-white
          px-6
          py-10
          text-center
          shadow-[0_12px_40px_rgba(110,33,54,0.07)]

          sm:min-h-[540px]
          sm:px-10
          sm:py-12

          md:min-h-[570px]
          md:px-14
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[7px]
            border
            border-rose/25
          "
        />

        <img
          src="/images/floral-tall.webp"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -top-[90px]
            -left-[115px]
            h-[330px]
            w-auto
            rotate-[-8deg]
            object-contain
            opacity-[0.14]

            sm:-top-[110px]
            sm:-left-[130px]
            sm:h-[390px]
          "
        />
        <img
          src="/images/floral-tall.webp"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[115px]
            -bottom-[100px]
            h-[330px]
            w-auto
            rotate-[172deg]
            object-contain
            opacity-[0.12]

            sm:-right-[135px]
            sm:-bottom-[120px]
            sm:h-[390px]
          "
        />

        <div
          className="
            relative
            z-10
            mb-5
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-rose/60" />
          <span className="text-[10px] text-rose-deep">✦</span>
          <span className="h-px w-8 bg-rose/60" />
        </div>

        <p
          className="
            relative
            z-10
            mb-6
            text-[10px]
            tracking-[0.28em]
            text-ink/70
            uppercase

            sm:text-[11px]
          "
        >
          {HERO.coverKicker}
        </p>

        <div
          className="
            relative
            z-10
            flex
            flex-col
            items-center
            justify-center
            font-heading
            text-ink
          "
        >
          <span
            className="
              text-[46px]
              leading-[0.95]

              sm:text-[54px]
              md:text-[60px]
            "
          >
            {COUPLE.bride}
          </span>
          <span
            className="
              my-2
              text-[25px]
              font-normal
              text-rose-deep

              sm:text-[28px]
            "
          >
            &amp;
          </span>
          <span
            className="
              text-[46px]
              leading-[0.95]

              sm:text-[54px]
              md:text-[60px]
            "
          >
            {COUPLE.groom}
          </span>
        </div>

        <div
          className="
            relative
            z-10
            mt-7
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-12 bg-ink/20" />
          <span className="h-[4px] w-[4px] rotate-45 bg-rose" />
          <span className="h-px w-12 bg-ink/20" />
        </div>

        <p
          className="
            relative
            z-10
            mt-6
            text-[15px]
            tracking-[0.12em]
            text-ink

            sm:text-[17px]
          "
        >
          {HERO.dateLabel}
        </p>

        <p
          className="
            relative
            z-10
            mt-5
            max-w-[360px]
            text-[14px]
            leading-7
            text-ink/75

            sm:text-[16px]
          "
        >
          {HERO.invitationText}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="
            relative
            z-10
            mt-8
            min-w-[210px]
            rounded-full
            border
            border-bordo/70
            bg-white
            px-8
            py-3
            text-[14px]
            font-medium
            tracking-[0.08em]
            text-ink
            transition-all
            duration-300

            hover:bg-blush-soft
            hover:shadow-[0_8px_24px_rgba(110,33,54,0.16)]
            active:scale-[0.98]

            sm:text-[15px]
          "
        >
          {HERO.coverCta}
        </button>

        <div
          aria-hidden="true"
          className="
            relative
            z-10
            mt-7
            text-[11px]
            tracking-[0.5em]
            text-rose/70
          "
        >
          ✦ ✦ ✦
        </div>
      </div>
    </main>
  );
}
