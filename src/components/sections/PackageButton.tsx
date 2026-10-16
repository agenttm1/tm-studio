"use client";

import ShineButton from "@/components/ui/ShineButton";
import { PACKAGE_EVENT } from "@/lib/packageEvent";

// Upiše odabrani paket u kontakt formu i odvede do nje.
export default function PackageButton({ name, featured }: { name: string; featured?: boolean }) {
  return (
    <ShineButton
      href="#kontakt"
      variant={featured ? "gold" : "outline"}
      wrapperClassName="w-full"
      onClick={() => window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: name }))}
    >
      Zatražite paket {name}
    </ShineButton>
  );
}
