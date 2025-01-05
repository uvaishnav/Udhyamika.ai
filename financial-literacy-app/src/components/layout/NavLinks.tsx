import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;

  &.active {
    background-color: #e9ecef;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const NavLinks = () => {
  return (
    <nav>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/courses">Courses</StyledNavLink>
    </nav>
  );
};

export default NavLinks;