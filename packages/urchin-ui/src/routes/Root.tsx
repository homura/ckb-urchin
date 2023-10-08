import { Container } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import { useInitConfig } from '../states';

export const Root: FC = () => {
  useInitConfig();

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" p="4">
        <Outlet />
      </Container>
    </>
  );
};
