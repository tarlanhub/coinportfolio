import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import PortfolioListingPage from '../modules/portfolio/pages/PortfolioListingPage';
import { listCoinsHandler } from '../modules/portfolio/portfolio.api-routes';
import { getCoinsList, getQuotes } from '../services/coinMarketCap.service';
export default function CoinSelection({ results }) {
  const [res, setRes] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({
    Name: [],
    Id: [],
  });
  const [loading, setLoading] = useState(true);
  const list = [];

  console.log(results);
  const clickHandler = async () => {
    const response = await fetch('http://localhost:3000/api/coins');
    const data = await response.json();

    console.log(data.data);
    const list = [];

    for (let i = 0; i < data.data.length; i++) {
      list.push({ Name: data.data[i].name, Id: data.data[i].id });
    }

    console.log('s', list[0].Name);

    setRes(list);
  };

  const selected = [];
  const handleClick = (i) => {
    if (JSON.parse(localStorage.getItem('Name')) !== null) {
      selected.push({ Name: res[i].Name, Id: res[i].Id });
      const oldItems = [];
      const dataOld = JSON.parse(localStorage.getItem('Name'));

      console.log('selexted', selected);
      for (const element of dataOld) {
        oldItems.push({ Name: element.Name, Id: element.Id });
      }
      for (const element of selected) {
        oldItems.push({ Name: element.Name, Id: element.Id });
      }

      console.log('old items', oldItems);
      console.log('se', selected);

      localStorage.setItem('Name', JSON.stringify(oldItems));
    } else {
      selected.push({ Name: res[i].Name, Id: res[i].Id });

      localStorage.setItem('Name', JSON.stringify(selected));
    }

    // handleStorage();
  };
  const handleStorage = () => {
    const oldItems = JSON.parse(localStorage.Name);

    console.log('old items', oldItems);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <GlobalStyle />
      <PortfolioListingPage />
      <div>{results.response.data[0].Name}</div>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch('http://localhost:3000/api/coins');
  const data = await response.json();

  console.log(response);

  return {
    props: { results: { data } },
  };
};

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
