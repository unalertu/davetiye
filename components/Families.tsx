import { EVENT, FAMILY_LEFT, FAMILY_RIGHT } from "@/lib/invitation";

export function Families() {
  return (
    <section
      className="
        relative
        z-10
        px-[12px]
        pt-2
        pb-5
        text-ink

        md:px-6
        md:pt-10
      "
    >
      <h2
        className="
          mb-6
          text-center
          font-heading
          text-[28px]
          font-normal
          text-ink

          md:text-[34px]
        "
      >
        Nişan Seramonisi
      </h2>

      <div
        className="
          grid
          w-full
          grid-cols-[1fr_auto_1fr]
          items-center
          justify-center
          gap-x-3

          md:gap-x-8
        "
      >
        <div className="min-w-0 text-center text-ink">
          <p className="mb-1 text-[13px] text-ink md:text-[15px]">{FAMILY_LEFT.parents}</p>
          <p className="text-[13px] font-semibold text-bordo md:text-[15px]">
            {FAMILY_LEFT.surname}
          </p>
        </div>

        <div
          className="
            h-[70px]
            w-px
            bg-rose/70

            md:h-[80px]
          "
        />

        <div className="min-w-0 text-center text-ink">
          <p className="mb-1 text-[13px] text-ink md:text-[15px]">{FAMILY_RIGHT.parents}</p>
          <p className="text-[13px] font-semibold text-bordo md:text-[15px]">
            {FAMILY_RIGHT.surname}
          </p>
        </div>
      </div>

      <p
        className="
          mx-auto
          mt-8
          max-w-[560px]
          text-center
          text-[14px]
          leading-7
          text-ink

          md:text-[18px]
        "
      >
        {EVENT.note}
      </p>
    </section>
  );
}
