import { PROGRAMME } from "@/lib/invitation";

export function Programme() {
  return (
    <section className="relative text-ink">
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          top-[90px]
          bottom-[20px]
          left-6
          z-0
          flex
          flex-col
          items-start
          justify-evenly

          md:top-[110px]
          md:left-[25%]
        "
      >
        <img
          src="/images/rings-small.webp"
          alt=""
          className="
            h-[62px]
            w-auto
            object-contain
            opacity-90

            md:h-[84px]
          "
        />
        <img
          src="/images/candles.webp"
          alt=""
          className="
            h-[124px]
            w-auto
            object-contain
            opacity-90

            md:h-[164px]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mt-10
          mb-10
          flex
          flex-col
          gap-6
          px-4
          text-ink

          md:mt-12
          md:mb-12
          md:gap-8
        "
      >
        <h2
          className="
            text-center
            font-heading
            text-[30px]
            leading-tight
            font-normal
            text-ink

            sm:text-[34px]
            md:text-[40px]
          "
        >
          Nişan Programı
        </h2>

        <ol
          className="
            relative
            mx-auto
            grid
            w-full
            max-w-[460px]
            grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)]
            items-center
            gap-x-6
            gap-y-8
            text-ink

            md:gap-x-8
            md:gap-y-10
          "
        >
          {PROGRAMME.map((item, i) => {
            const isLast = i === PROGRAMME.length - 1;
            return (
              <li className="contents" key={`${item.time}-${item.title}`}>
                <span
                  className="
                    pt-0.5
                    text-right
                    text-[16px]
                    leading-snug
                    tracking-wide
                    text-bordo
                    tabular-nums

                    md:text-[17px]
                  "
                >
                  {item.time}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    self-stretch
                  "
                >
                  {i !== 0 && (
                    <span
                      className="
                        absolute
                        top-[-32px]
                        left-1/2
                        h-[calc(50%+32px)]
                        w-px
                        -translate-x-1/2
                        bg-rose/70

                        md:top-[-40px]
                        md:h-[calc(50%+40px)]
                      "
                    />
                  )}
                  {!isLast && (
                    <span
                      className="
                        absolute
                        top-1/2
                        bottom-[-32px]
                        left-1/2
                        w-px
                        -translate-x-1/2
                        bg-rose/70

                        md:bottom-[-40px]
                      "
                    />
                  )}
                  <span
                    className="
                      relative
                      block
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-bordo
                      ring-2
                      ring-rose/30
                    "
                  />
                </span>

                <span
                  className="
                    pt-0.5
                    text-left
                    text-[17px]
                    leading-snug
                    font-medium
                    text-ink

                    md:text-[19px]
                  "
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
