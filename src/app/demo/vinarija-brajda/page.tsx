import { demoMetadata } from "@/components/demo/demoMetadata";
import { Providers } from "@/components/demo/vinarija/Providers";
import { Stranica } from "@/components/demo/vinarija/Stranica";

// noindex + naslov "… — demo primjer | TM Studio"
export const metadata = demoMetadata("vinarija-brajda");

export default function VinarijaBrajdaDemo() {
  return (
    <Providers>
      <Stranica />
    </Providers>
  );
}
