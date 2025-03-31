import 'styled-components';
import { CSSProp } from 'styled-components';
import styled from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
} 