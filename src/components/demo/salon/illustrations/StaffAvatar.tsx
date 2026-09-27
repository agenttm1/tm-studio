import type { StaffMember } from "@/components/demo/salon/data/salon";

const SKIN = "#E4D3C6";
const UNIFORM = "#1F5D5B";

/**
 * Stilizirani poprsni lik bez lica — namjerno nije portret stvarne osobe.
 * Frizura i boja kose dolaze iz podataka (salon.ts → staff[].art).
 */
export function StaffAvatar({ member, className = "" }: { member: StaffMember; className?: string }) {
  const { hair, shape } = member.art;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* kosa iza glave */}
      {shape === "bob" && <path d="M37 70V50c0-18 10-28 23-28s23 10 23 28v20c-3 3-9 3-12 0H49c-3 3-9 3-12 0Z" fill={hair} />}
      {shape === "wave" && (
        <path d="M34 92c-7-9 3-17-1-29 0-24 12-39 27-39s27 15 27 39c-4 12 6 20-1 29-7 3-14 0-16-5V56H51v31c-2 5-9 8-17 5Z" fill={hair} />
      )}

      {/* ramena u uniformi salona */}
      <path d="M18 120c4-24 20-36 42-36s38 12 42 36Z" fill={UNIFORM} />
      <path d="M50 84l10 12 10-12" fill="none" stroke="#F4F6F5" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="53" y="64" width="14" height="22" rx="6" fill={SKIN} />
      <ellipse cx="60" cy="50" rx="17" ry="21" fill={SKIN} />

      {/* kosa sprijeda */}
      {shape === "short" && (
        <>
          <path d="M42 48c-1-15 8-24 18-24s19 9 18 24c-3-7-9-10-18-10s-15 3-18 10Z" fill={hair} />
          {/* brada */}
          <path d="M44 55c2 11 8 18 16 18s14-7 16-18c-3 4-6 5-9 5-2 0-4-2-7-2s-5 2-7 2c-3 0-6-1-9-5Z" fill={hair} />
        </>
      )}
      {shape === "bob" && <path d="M42 47c2-13 9-19 18-19s16 6 18 19c-7-5-12-7-18-7s-12 2-18 7Z" fill={hair} />}
      {shape === "bun" && (
        <>
          <circle cx="60" cy="21" r="9" fill={hair} />
          <path d="M42 48c0-14 8-23 18-23s18 9 18 23c-5-7-11-10-18-10s-13 3-18 10Z" fill={hair} />
        </>
      )}
      {shape === "wave" && <path d="M42 50c1-15 9-23 19-23 9 0 16 7 17 17-9-1-18-4-24-10-3 6-7 11-12 16Z" fill={hair} />}
    </svg>
  );
}
