declare module 'react-countup' {
  import { ComponentType } from 'react';

  export interface CountUpProps {
    start?: number;
    end: number;
    duration?: number;
    separator?: string;
    decimals?: number;
    decimal?: string;
    prefix?: string;
    suffix?: string;
  }

  const CountUp: ComponentType<CountUpProps>;
  export default CountUp;
} 