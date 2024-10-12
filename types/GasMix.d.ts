export enum IGasNames {
  OXYGEN = "oxygen",
  NITROGEN = "nitrogen",
  HELIUM = "helium",
}

export interface IGasMix {
  helium: number;
  oxygen: number;
  nitrogen: number;
}

// export const GAS_LIST = [
//   IGasNames.OXYGEN,
//   IGasNames.NITROGEN,
//   IGasNames.HELIUM,
// ];
