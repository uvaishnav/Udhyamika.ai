import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <MainContainer>
        {children}
      </MainContainer>
    </>
  );
};

export default Layout;