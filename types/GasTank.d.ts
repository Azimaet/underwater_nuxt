export interface IGasTank {
  gasMix: {
    helium: number;
    oxygen: number;
    nitrogen: number;
  };
  pressureEnd: number | null;
  pressureStart: number | null;
}
