import { EVENT, MAPS } from "@/lib/invitation";

const mapClass = `
  h-[280px]
  w-full
  max-w-[360px]
  rounded-2xl
  border-0

  sm:max-w-[420px]

  md:h-[380px]
  md:max-w-[560px]
`;

const linkClass = `
  text-sm
  text-bordo
  underline
  decoration-1
  underline-offset-4
  transition-opacity

  hover:opacity-60
`;

export function Venue() {
  return (
    <section
      className="
        relative
        flex
        flex-col
        gap-10
        px-6
        pb-12
        text-ink

        md:gap-14
        md:px-10
        md:pb-16
      "
    >
      <div className="relative flex flex-col items-center text-center">
        <h3
          className="
            font-heading
            text-[30px]
            leading-tight
            font-normal
            text-ink

            sm:text-[34px]
            md:text-[40px]
          "
        >
          {EVENT.placeTitle}
        </h3>

        <div
          className="
            mx-auto
            mt-3
            flex
            max-w-sm
            flex-col
            items-center
            border-b
            border-rose/40
            pb-3
            text-center
            text-sm
            leading-6
            tracking-wide
            text-ink

            md:max-w-[500px]
            md:text-base
          "
        >
          <span className="font-semibold text-bordo">{EVENT.venue}</span>
          <span className="text-ink">{EVENT.address}</span>
        </div>

        <div
          className="
            mt-5
            flex
            w-full
            flex-col
            items-center
            gap-4

            md:mt-6
          "
        >
          <iframe
            title={`${EVENT.placeTitle} - ${EVENT.venue}`}
            src={MAPS.venue.embed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className={mapClass}
          />
          <a
            href={MAPS.venue.link}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Google Maps&apos;te Aç
          </a>
        </div>
      </div>

      <div className="relative flex flex-col items-center text-center">
        <h3
          className="
            font-heading
            text-[28px]
            leading-tight
            font-normal
            text-ink

            sm:text-[32px]
            md:text-[38px]
          "
        >
          Otopark
        </h3>

        <div
          className="
            mx-auto
            mt-3
            max-w-sm
            border-b
            border-rose/40
            pb-3
            text-center
            text-sm
            leading-6
            tracking-wide
            text-ink

            md:max-w-[500px]
            md:text-base
          "
        >
          {MAPS.parking.note}
        </div>

        <div
          className="
            mt-5
            flex
            w-full
            flex-col
            items-center
            gap-4

            md:mt-6
          "
        >
          <iframe
            title="Otopark Konumu"
            src={MAPS.parking.embed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className={mapClass}
          />
          <a
            href={MAPS.parking.link}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Otopark Konumunu Google Maps&apos;te Aç
          </a>
        </div>
      </div>
    </section>
  );
}
