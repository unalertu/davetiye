import { COUPLE } from "@/lib/invitation";

export function Footer() {
  return (
    <>
      <div
        className="
          relative
          flex
          justify-center
          pt-4
          pb-8

          md:pt-8
          md:pb-14
        "
      >
        <img
          src="/images/birds.webp"
          alt=""
          aria-hidden="true"
          className="
            h-auto
            w-[480px]
            max-w-full
            object-contain

            md:w-[680px]
          "
        />
      </div>

      <footer
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          px-6
          pb-16
          text-center
          text-ink

          md:px-10
          md:pb-20
        "
      >
        <div
          className="
            mt-2
            flex
            items-center
            justify-center
            font-heading
            text-[32px]
            leading-tight
            font-normal
            text-ink

            sm:text-[36px]
            md:text-[44px]
          "
        >
          <span>{COUPLE.bride}</span>
          <span
            className="
              mx-3
              font-heading
              text-[26px]
              text-bordo

              sm:text-[30px]
              md:mx-4
              md:text-[34px]
            "
          >
            &amp;
          </span>
          <span>{COUPLE.groom}</span>
        </div>

        <div
          className="
            mt-6
            h-px
            w-12
            bg-rose
          "
        />

        {/* Written already-capitalised and marked as English: Turkish casing
            rules would turn the "i"s into "İ" under text-transform. */}
        <span
          lang="en"
          className="
            mt-5
            text-[10px]
            tracking-[0.2em]
            text-bordo
            opacity-60
          "
        >
          ENGAGEMENT INVITATION
        </span>
      </footer>
    </>
  );
}
