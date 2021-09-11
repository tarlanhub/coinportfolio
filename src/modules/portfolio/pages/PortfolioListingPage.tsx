import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function PortfolioListingPage() {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [holdings, setHoldings] = useState(5);

  const handleLocalStorage = () => {
    const update = localStorage.getItem('Holdings');

    setHoldings(8);
  };

  useEffect(() => {
    handleLocalStorage();
  }, [holdings]);

  return (
    <Nav>
      <h4>$ {holdings}</h4>

      <Link href="/">
        <Logo>
          FlyTo<span>Moon</span>{' '}
        </Logo>
      </Link>
      <Link href="/CoinSelection">
        <Menu>
          <MenuLink>Search</MenuLink>
        </Menu>
      </Link>
    </Nav>
  );
}

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #67bc98;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: #7b7fda;
  }
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: orange;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: black;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
