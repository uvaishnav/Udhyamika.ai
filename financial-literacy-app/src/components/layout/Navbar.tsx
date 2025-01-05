import React from 'react';
import styled from 'styled-components';
import NavLinks from './NavLinks';

const NavContainer = styled.nav`
  padding: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h2`
  margin: 0;
  color: #333;
`;

const Navbar = () => {
  return (
    <NavContainer>
      <Logo>FinLit Platform</Logo>
      <NavLinks />
    </NavContainer>
  );
};

export default Navbar;