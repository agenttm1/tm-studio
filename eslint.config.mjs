import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Demo stranice (src/components/demo) prenesene su iz zasebnih projekata koji
  // nisu imali ovo pravilo. Namjerno sinkroniziraju stanje u efektima; ostaje
  // upozorenje, ne greška, da prijenos ne mijenja njihovo ponašanje.
  {
    files: ["src/components/demo/**/*.{ts,tsx}"],
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
