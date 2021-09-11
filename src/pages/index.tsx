import { GetServerSideProps } from 'next';
import { createGlobalStyle } from 'styled-components';

import PortfolioListingPage from '../modules/portfolio/pages/PortfolioListingPage';

import SelectedCoins from './SelectedCoins';

export default function Home(results) {
  console.log(results);

  return (
    <div>
      <div>
        <GlobalStyle />
        <PortfolioListingPage />
        <SelectedCoins />
      </div>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
body {
    background: #efefef;
}
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch('http://localhost:3000/api/coins');
  const data = response.json();

  console.log(response);

  return {
    props: { results: ['0'] },
  };
};
