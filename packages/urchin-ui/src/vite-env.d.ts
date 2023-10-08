/// <reference types="vite/client" />

declare module 'react-middle-truncate' {
  import * as React from 'react';

  interface Props {
    text?: string;
    ellipsis?: string;
    start?: RegExp | number;
    end?: RegExp | number;
    smartCopy?: false | 'partial' | 'all';
    onResizeDebounceMs?: number;
  }

  export default React.Component<Props>;
}

declare module 'react-middle-ellipsis' {
  import { FC } from 'react';

  interface Props {
    width?: string | number;
  }

  export default FC<Props>;
}
