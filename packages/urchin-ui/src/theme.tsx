import '@fontsource-variable/roboto-mono';
import '@fontsource-variable/inconsolata';

import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: `'Roboto Mono Variable', sans-serif`,
    body: `'Inconsolata Variable', sans-serif`,
  },
});
