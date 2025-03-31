declare module 'react-chartjs-2' {
  import { ChartData, ChartOptions } from 'chart.js';
  import { ComponentType } from 'react';

  export interface DoughnutProps {
    data: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
  }

  export const Doughnut: ComponentType<DoughnutProps>;
} 