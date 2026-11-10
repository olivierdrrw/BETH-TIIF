export interface Dataset {
    labels: string[];
  
    values: number[];
  }
  
  export function
  createDataset(
    labels:
      string[],
    values:
      number[]
  ): Dataset {
    return {
      labels,
      values,
    };
  }