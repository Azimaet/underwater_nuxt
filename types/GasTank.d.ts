import { IGasMix } from "@/types/GasMix";
export interface IGasTank {
  gasMix: IGasMix;
  pressureEnd: number | null;
  pressureStart: number | null;
  flags?: { [key: string]: boolean | null };
}
