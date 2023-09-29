import { Platform } from 'react-native';

const text = {
  'font-size': '14px',
  'font-weight': '400',
  'line-height': '18px',
  'letter-spacing': 0,
  'font-family': Platform.OS === 'ios' ? 'System' : 'System',
};

export default {
  colors: {
    black: '#000',
    dark: '#1E1E1E',

    gray_900: '#121214',
    gray_800: '#202024',
    gray_700: '#2E2E33',
    gray_400: '#7C7C8A',
    gray_200: '#C4C4CC',
    gray_100: '#E1E1E6',
    cyan_500: '#81D8F7',

    cyan_300: '#98E1FB',

    red_500: '#FF377F',
  },
  fonts: {
    text,
    subtitle: {
      ...text,
      'font-size': '12px',
      'line-height': '14px',
    },
    tag: {
      ...text,
      'font-size': '14px',
      'font-weight': '900',
      'line-height': '24px',
    },
    overline: {
      ...text,
      'font-size': '16px',
      'font-weight': '700',
      'line-height': '20px',
    },
    description: {
      ...text,
      'font-size': '18px',
      'line-height': '23px',
    },
    description1: {
      ...text,
      'font-size': '20px',
      'line-height': '26px',
      'font-weight': '700',
    },
    heading: {
      ...text,
      'font-size': '22px',
      'line-height': '30px',
      'font-weight': '800',
    },
    big: {
      ...text,
      'font-size': '38px',
      'line-height': '48px',
      'font-weight': '800',
    },
  },
} as const;
