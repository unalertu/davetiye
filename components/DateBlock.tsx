import { COUPLE, EVENT } from "@/lib/invitation";

export function DateBlock() {
  return (
    <section className="px-3 pb-10 text-ink md:px-6 md:pb-14">
      <div
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          text-center
          text-ink

          sm:gap-4
          md:gap-6
        "
      >
        <h3
          className="
            font-heading
            text-[30px]
            leading-tight
            font-normal
            text-ink

            sm:text-[36px]
            md:text-[48px]
          "
        >
          {COUPLE.bride}
        </h3>
        <div
          className="
            shrink-0
            font-heading
            text-[24px]
            text-bordo

            sm:text-[28px]
            md:text-[34px]
          "
        >
          &amp;
        </div>
        <h3
          className="
            font-heading
            text-[30px]
            leading-tight
            font-normal
            text-ink

            sm:text-[36px]
            md:text-[48px]
          "
        >
          {COUPLE.groom}
        </h3>
      </div>

      <div
        className="
          mt-5
          flex
          w-full
          flex-col
          items-center
          justify-center
          gap-4
          text-center
          text-ink

          md:gap-5
        "
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <span
            className="
              text-center
              text-[20px]
              font-bold
              text-bordo

              md:text-[24px]
            "
          >
            {EVENT.placeTitle}
          </span>
          <span
            className="
              text-center
              text-[16px]
              text-ink

              md:text-[18px]
            "
          >
            {EVENT.venue}
          </span>
        </div>

        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            text-center
            text-ink
          "
        >
          <p
            className="
              mb-2
              text-[20px]
              font-bold
              text-ink
              uppercase

              md:text-[16px]
            "
          >
            Saat &amp; Tarih
          </p>
          <p
            className="
              text-[20px]
              font-bold
              text-ink
              uppercase

              md:text-[16px]
            "
          >
            {EVENT.time}
          </p>
        </div>

        <div
          className="
            flex
            w-full
            items-center
            justify-center
            text-center
            text-ink
          "
        >
          <div
            className="
              grid
              grid-cols-[84px_18px_56px_18px_84px]
              items-center
              justify-center
              text-center

              sm:grid-cols-[96px_24px_70px_24px_96px]
              md:grid-cols-[110px_30px_90px_30px_110px]
            "
          >
            <span className="text-center text-[11px] tracking-tight text-ink sm:text-[12px] md:text-[16px]">
              {EVENT.monthLabel}
            </span>
            <span className="text-center text-[22px] text-rose md:text-[28px]">|</span>
            <span className="text-center text-[30px] text-bordo md:text-[40px]">{EVENT.day}</span>
            <span className="text-center text-[22px] text-rose md:text-[28px]">|</span>
            <span className="text-center text-[11px] tracking-tight text-ink sm:text-[12px] md:text-[16px]">
              {EVENT.weekdayLabel}
            </span>
          </div>
        </div>

        <div className="text-center text-[18px] text-ink md:text-[24px]">{EVENT.year}</div>
      </div>
    </section>
  );
}
