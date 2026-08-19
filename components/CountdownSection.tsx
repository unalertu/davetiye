"use client";

import { useEffect, useState } from "react";
import { CALENDAR, COUPLE, EVENT } from "@/lib/invitation";
import { CalendarFrame } from "./Ornaments";

const WEEKDAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

function MonthCalendar() {
  const { year, month, day } = CALENDAR;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Shift Sunday-first getDay() into a Monday-first grid.
  const leadingBlanks = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div
      className="
        relative
        mx-auto
        mt-8
        w-full
        max-w-[340px]

        md:mt-10
        md:max-w-[420px]
      "
    >
      <CalendarFrame
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          text-bordo
        "
      />

      <div
        className="
          relative
          w-full
          px-7
          py-6

          md:px-10
          md:py-7
        "
      >
        <div className="w-full">
          <div
            className="
              border-b
              border-bordo/25
              py-2.5
              text-center
              text-[13px]
              font-semibold
              tracking-wide
              text-bordo

              md:text-[14px]
            "
          >
            {MONTHS[month]} {year}
          </div>

          <div
            className="
              grid
              grid-cols-7
              border-b-2
              border-bordo
            "
          >
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="
                  py-1.5
                  text-center
                  text-[10px]
                  font-medium
                  text-ink
                  opacity-60

                  md:text-[11px]
                "
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
            {cells.map((value, i) => (
              <div
                key={`${value}-${i}`}
                className="
                  flex
                  h-[30px]
                  items-center
                  justify-center

                  md:h-[34px]
                "
              >
                {value &&
                  (value === day ? (
                    <div
                      className="
                        relative
                        flex
                        h-[24px]
                        w-[26px]
                        items-center
                        justify-center

                        md:h-[28px]
                        md:w-[30px]
                      "
                    >
                      <svg
                        viewBox="0 0 24 22"
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          drop-shadow-sm
                        "
                        fill="currentColor"
                        aria-hidden="true"
                        style={{ color: "var(--color-bordo)" }}
                      >
                        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                      </svg>
                      <span
                        className="
                          relative
                          z-10
                          text-[11px]
                          font-bold
                          text-white

                          md:text-[12px]
                        "
                      >
                        {value}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[12px] text-ink md:text-[13px]">{value}</span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getRemaining() {
  const diff = Math.max(new Date(EVENT.dateISO).getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function Countdown() {
  const [left, setLeft] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setLeft(getRemaining());
    const id = window.setInterval(() => setLeft(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!left) {
    return <p className="text-sm text-ink md:text-lg">-- gün -- saat -- dk -- sn</p>;
  }

  return (
    <p className="text-sm tabular-nums text-ink md:text-lg">
      {left.days} gün {left.hours} saat {left.minutes} dk {left.seconds} sn
    </p>
  );
}

function toGoogleDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function calendarUrl() {
  const start = new Date(EVENT.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${COUPLE.bride} & ${COUPLE.groom} ${EVENT.title}`,
    dates: `${toGoogleDate(start)}/${toGoogleDate(end)}`,
    details: `${COUPLE.bride} & ${COUPLE.groom} çiftinin nişan törenine davetlisiniz.`,
    location: `${EVENT.venue}, ${EVENT.address}`,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function CountdownSection() {
  return (
    <section
      className="
        relative
        isolate
        px-3
        pt-8
        pb-14
        text-ink

        md:px-6
        md:pt-12
        md:pb-20
      "
    >
      <div className="relative flex justify-center pb-6 md:pb-12">
        <img
          src="/images/floral-divider.webp"
          alt=""
          aria-hidden="true"
          className="
            h-auto
            w-[380px]
            max-w-full
            object-contain

            md:w-[680px]
          "
        />
      </div>

      <div className="relative flex w-full flex-col items-center text-ink">
        <img
          src="/images/floral-wash.webp"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            -z-10
            h-[700px]
            w-auto
            max-w-none
            scale-x-[-1]
            object-contain
            opacity-[0.15]

            md:-top-[150px]
            md:right-[20%]
            md:h-[900px]
          "
        />

        <div
          className="
            mt-4
            flex
            flex-col
            items-center
            gap-4
            text-center
            text-ink

            md:mt-8
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-5

              sm:gap-7
              md:gap-10
            "
          >
            <div className="flex flex-col items-center text-ink">
              <span
                className="
                  text-[10px]
                  tracking-wider
                  text-ink
                  uppercase

                  md:text-xs
                "
              >
                Konukların Gelişi
              </span>
              <span
                className="
                  mt-1
                  text-lg
                  font-medium
                  text-bordo

                  md:text-xl
                "
              >
                {EVENT.guestsArrive}
              </span>
            </div>

            <div className="flex flex-col items-center text-ink">
              <span
                className="
                  text-[10px]
                  tracking-wider
                  text-ink
                  uppercase

                  md:text-xs
                "
              >
                Nişan Töreni Başlangıcı
              </span>
              <span
                className="
                  mt-1
                  text-lg
                  font-medium
                  text-bordo

                  md:text-xl
                "
              >
                {EVENT.begins}
              </span>
            </div>
          </div>

          <div
            className="
              mt-3
              flex
              flex-col
              items-center
              justify-center
              text-ink
            "
          >
            <h3
              className="
                text-[16px]
                font-semibold
                tracking-[0.1em]
                text-bordo
                uppercase

                md:text-[18px]
              "
            >
              Sayaç:
            </h3>
            <div className="mt-2 text-center text-ink">
              <Countdown />
            </div>
          </div>
        </div>

        <div className="text-ink">
          <MonthCalendar />
        </div>

        <div className="mt-3 flex justify-center">
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm
              tracking-wider
              text-bordo
              underline
              decoration-1
              underline-offset-4
              transition-opacity
              hover:opacity-70
            "
          >
            Takviminize Ekleyin
          </a>
        </div>

        <div className="relative flex justify-center pt-6 md:pt-8">
          <img
            src="/images/table.webp"
            alt=""
            aria-hidden="true"
            className="
              h-auto
              w-[450px]
              max-w-full
              object-contain

              md:w-[730px]
            "
          />
        </div>
      </div>
    </section>
  );
}
