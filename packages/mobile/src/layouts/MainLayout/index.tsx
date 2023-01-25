import React from 'react';
import { Container, ScrollContainer } from './styles';

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  //* render
  return (
    <Container>
      <ScrollContainer>{children}</ScrollContainer>
    </Container>
  );
};
