// import original module declarations
import 'styled-components';
import { ThemeInterface } from './src/constants/ui';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}
