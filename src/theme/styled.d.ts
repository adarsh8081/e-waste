import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      backgroundLight: string;
      text: string;
      gradient: {
        primary: string;
      };
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
} 