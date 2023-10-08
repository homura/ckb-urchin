import '@chakra-ui/css-reset';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { Home } from './routes';
import { Address } from './routes/address';
import { Block } from './routes/block';
import { Root } from './routes/Root';
import { Transaction } from './routes/transaction';
import { theme } from './theme';

const router = createHashRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, element: <Home /> },
      { path: 'block/:blockNumber', element: <Block /> },
      { path: 'address/:address', element: <Address /> },
      { path: 'transaction/:txHash', element: <Transaction /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { suspense: true } } })
      }
    >
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
