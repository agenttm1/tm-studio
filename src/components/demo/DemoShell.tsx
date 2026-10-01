import OverflowGuard from "@/components/ui/OverflowGuard";
import DemoBar from "./DemoBar";
import DemoGuard from "./DemoGuard";
import { getDemo } from "@/data/demos";

/**
 * Sve što svaki demo mora imati, na jednom mjestu. Uključuje se u layout
 * svake demo rute (src/app/demo/<slug>/layout.tsx).
 */
export default function DemoShell({ slug }: { slug: string }) {
  const { theme } = getDemo(slug);
  return (
    <>
      <OverflowGuard />
      <DemoBar theme={theme} />
      <DemoGuard />
    </>
  );
}
