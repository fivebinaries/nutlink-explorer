// import original module declarations
import 'styled-components';
import { colors } from './src/constants';

type ThemeInterface = typeof colors.light;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}
