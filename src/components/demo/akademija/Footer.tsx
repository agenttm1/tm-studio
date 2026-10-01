import Logo from "@/components/demo/akademija/Logo";
import { site } from "@/components/demo/akademija/lib/site";

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 text-center md:grid-cols-3 md:text-left">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <Logo className="h-7 w-7 text-[#3ECF4A]" />
          <p className="text-lg font-extrabold tracking-wide text-white">
            {site.name.toUpperCase()}
          </p>
        </div>

        <nav className="flex justify-center gap-6 text-sm text-white/75">
          <a
            href="#galerija"
            className="inline-block transition-transform duration-200 hover:scale-110 hover:text-white"
          >
            Galerija
          </a>
          <a
            href="#novosti"
            className="inline-block transition-transform duration-200 hover:scale-110 hover:text-white"
          >
            Novosti
          </a>
          <a
            href="#kontakt"
            className="inline-block transition-transform duration-200 hover:scale-110 hover:text-white"
          >
            Kontakt
          </a>
        </nav>

        <div className="flex flex-col items-center gap-3 md:items-end">
          <div className="flex gap-4">
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="text-white/75 transition-colors hover:text-[#3ECF4A]"
            >
              <InstagramIcon size={22} />
            </a>
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="text-white/75 transition-colors hover:text-[#3ECF4A]"
            >
              <FacebookIcon size={22} />
            </a>
          </div>

          <a
            href={site.studio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-white/70 transition-transform duration-200 hover:scale-110 hover:text-[#D4AF37]"
          >
            Izradio{" "}
            <span className="font-semibold text-[#D4AF37]">
              {site.studio.name}
            </span>
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-white/50">
        © {year} {site.fullName}. Demo projekt — izmišljena akademija,
        placeholder sadržaj.
      </p>
    </footer>
  );
}
