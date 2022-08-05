export interface ChartData {
    labels: Date[];
    series: {
      label: string;
      color: string;
      values: number[];
    }[];
  }
  