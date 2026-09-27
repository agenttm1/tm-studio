import { salon } from "@/components/demo/salon/data/salon";

/** Znak: okruglo ogledalo s grančicom kaline */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="#fff" stroke="#1F5D5B" strokeWidth="2" />
      <path d="M11 23c2-5 5-9 10-13" fill="none" stroke="#1F5D5B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.5 16.2c-2.6-.4-4-2-4.3-4.6 2.6.2 4.1 1.8 4.3 4.6Z" fill="#1F5D5B" />
      <path d="M18.4 12.6c.4-2.5 2-3.9 4.5-4.2-.2 2.5-1.8 4-4.5 4.2Z" fill="#2E8481" />
      <circle cx="21.5" cy="17.5" r="1.6" fill="#1F5D5B" />
      <circle cx="19" cy="20" r="1.3" fill="#1F5D5B" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-xl font-black tracking-tighter text-tinta">
        {salon.name.split(" ")[0]} <span className="italic text-petrol">{salon.shortName}</span>
      </span>
    </span>
  );
}
