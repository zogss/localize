import type {CSSObject} from 'styled-components';

export interface FontProps extends CSSObject {
  'font-size': string;
  'font-weight': string;
  'line-height': string;
  'letter-spacing': number;
  'font-family': string;
}
