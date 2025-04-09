import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#4CACBC',
    secondary: '#A0D995',
    accent: '#915EFF',
    background: '#1a2a3a',
    backgroundLight: '#2a3a4a',
    text: '#ffffff',
    gradient: {
      primary: 'linear-gradient(135deg, #4CACBC 0%, #915EFF 100%)'
    }
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
}; 