"use client";

import Button from "@/components/ui/Button";
import { PACKAGE_EVENT } from "@/lib/packageEvent";

// Upiše odabrani paket u kontakt formu i odvede do nje.
export default function PackageButton({ name, featured }: { name: string; featured?: boolean }) {
  return (
    <Button
      href="#kontakt"
      variant={featured ? "ink" : "outline"}
      className="w-full"
      onClick={() => window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: name }))}
    >
      Zatražite paket {name}
    </Button>
  );
}
