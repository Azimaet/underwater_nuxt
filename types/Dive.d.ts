export interface IDive {
  date: Date;
  totalTime: number;
  maxDepth: number;
  gasTanks: GasTank[];
  owner?: string;
}
