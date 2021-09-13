import { createGlobalStyle } from 'styled-components';

import PortfolioListingPage from '../modules/portfolio/pages/PortfolioListingPage';

import SelectedCoins from './SelectedCoins';
export default function Home() {
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
