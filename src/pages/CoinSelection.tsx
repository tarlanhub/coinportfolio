import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import PortfolioListingPage from '../modules/portfolio/pages/PortfolioListingPage';

function CoinSelection({ data }) {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const list = [];

    for (let i = 0; i < data.data.length; i++) {
      list.push({
        Name: data.data[i].name,
        Id: data.data[i].id,
        Price: data.data[i].quote.USD.price,
      });
    }

    setRes(list);
  }, [data]);

  const selected = [];
  const handleClick = (i) => {
    if (JSON.parse(localStorage.getItem('Name')) !== null) {
      selected.push({ Name: res[i].Name, Id: res[i].Id });
      const oldItems = [];
      const dataOld = JSON.parse(localStorage.getItem('Name'));

      for (const element of dataOld) {
        oldItems.push({ Name: element.Name, Id: element.Id });
      }
      for (const element of selected) {
        oldItems.push({ Name: element.Name, Id: element.Id });
      }

      localStorage.setItem('Name', JSON.stringify(oldItems));
    } else {
      selected.push({ Name: res[i].Name, Id: res[i].Id });

      localStorage.setItem('Name', JSON.stringify(selected));
    }

    // handleStorage();
  };

  return (
    <div>
      <GlobalStyle />
      <PortfolioListingPage />
      <List>
        {res.map((res, i) => (
          <Link href="/" key={res.Name}>
            <Button onClick={() => handleClick(i)} key={res.Name}>
              <ul>{res.Name}</ul>
            </Button>
          </Link>
        ))}
      </List>
    </div>
  );
}

//ServerSideRendering
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/coins/');
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
export default CoinSelection;
//Styles
const GlobalStyle = createGlobalStyle`
body {
    background: #efefef;
}
`;
const List = styled.div`
  padding: 0 2rem;
  align-items: left;
  flex-wrap: wrap;
  font-weight: 500;
  padding-top: 70px;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(to bottom);
`;
const Button = styled.ul`
  padding: 0rem 0rem;
  cursor: pointer;
  text-align: left;
  padding-right: 2rem;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in;
  font-size: 18px;
  &:hover {
    color: #7b7fda;
  }
`;
