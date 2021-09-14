/* eslint-disable unicorn/prefer-number-properties */
import React, { useState, useEffect, useCallback } from 'react';
import Collapse from 'react-css-collapse';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { BsFillBagFill } from 'react-icons/bs';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';

//Style Components starts here

const Child = styled.div`
  float: right;
  width: 35%;
  font-weight: 500;
  padding-left: 2 rem;
`;
const Current = styled.div`
  text-align: right;
  font-weight: 500;
  width: 50%;
`;

const Current2 = styled.div`
  text-align: right;
  font-weight: 500;
  width: 50%;
`;
const Value = styled.div`
  text-align: right;
  font-weight: 500;
  width: 26%;
`;
const Row = styled.div`
  display: flex;
  margin-left: 10rem;
`;
const NoCoin = styled.div`
  font-weight: 800;
  padding-top: 7rem;

  padding-left: 35rem;
  padding-right: 35rem;
`;
const List2 = styled.div`
  list-style: none;
  font-weight: 100;
  margin: 0;
  padding: 0;
  padding-top: 5rem;
`;

const Button = styled.button`
  width: 100%;

  color: #444;
  font-weight: 700;
  font-size: 14px;
  text-align: left;
  background-color: #efefef;
  -webkit-appearance: none;
  border: 1px solid #d0d0d0;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 45px;
`;

const C = styled(Collapse)`
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
const Span = styled.span`
  font-weight: 500;
`;
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;
const StyledModal = Modal.styled`
width: 30rem;
height: 18rem;
display: flex;
align-items: center;
justify-content: center;
background-color:#fbfbfb;
border-radius:10px;
border-color:black;
opacity: ${(props) => props.opacity};
transition : all 0.3s ease-in-out;
`;

const Input = styled.input`
  background-color: #fbfbfb;

  border: 1px solid;
  border-color: rgb(194, 193, 193);
  margin-top: 8px;
  margin-bottom: 10px;
  width: 88%;
  height: 35px;
`;
const Trans = styled.button`
  background-color: #fff000;
  border-radius: 12px;
  color: #000;
  cursor: pointer;
  font-weight: 500;
  padding: 10px 10px;
  text-align: center;
  transition: 200ms;
  width: 30%;
  float: center;
  box-sizing: border-box;
  border: 0;
  margin-top: 20px;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  .button-32:disabled {
    filter: saturate(0.2) opacity(0.5);
    cursor: not-allowed;
  }
`;
const AddTrans = styled.button`
  background-color: #fff000;
  border-radius: 12px;
  color: #000;
  cursor: pointer;
  font-weight: 500;
  padding: 10px 10px;
  text-align: center;
  transition: 200ms;
  width: 10%;
  float: center;
  box-sizing: border-box;
  border: 0;
  margin-top: 20px;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-bottom: 20px;
  .button-32:disabled {
    filter: saturate(0.2) opacity(0.5);
    cursor: not-allowed;
  }
`;
//Style Components finish here

//**********************/
//*
//Selected Coins Page && Home Page

export default function SelectedCoins() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    if (opacity === 0) {
      document.body.style.overflow = 'scroll';
    }
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 100);
    });
  }

  const coinsIds = [];
  const handleLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('Name')) !== null) {
      setLoading(false);
      setLoading2(true);
      const a = JSON.parse(localStorage.getItem('Name'));

      for (const element of a) {
        coinsIds.push(element.Id);
      }
    } else {
      setLoading(true);
      setLoading2(false);
    }
  };

  const [openItemIndex, setOpenItemIndex] = useState();
  const [quotes, setQuotes] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [netCost, setNetCost] = useState([]);
  const [marketValue, setMarketValue] = useState([]);
  const [profit, setProfit] = useState([]);
  const defaultValue = [...marketValue];
  const profitValue = [...profit];
  const anew = [];

  const clickHandler = async () => {
    const response = await fetch(`api/quotes?ids=${coinsIds}`);
    const data = await response.json();
    const qts = data.data;

    for (const element of coinsIds) {
      anew.push(qts[element]);
    }
    setQuotes(anew);
  };

  function toggle(id) {
    setOpenItemIndex(openItemIndex === id ? undefined : id);
  }
  const items = [...holdings];
  const mValue = [];
  const cost = [...netCost];
  let item = null;
  const rates = [];

  function transaction(event) {
    item = event.target.valueAsNumber;
  }

  function submit(i) {
    if (items[i] !== undefined) {
      items[i] += item;
    } else {
      items[i] = item;
    }
    const q1 = item;
    const p1 = quotes[i].quote.USD.price;
    const q1p1 = q1 * p1;

    if (cost[i] !== undefined) {
      cost[i] += q1p1;
    } else {
      cost[i] = q1p1;
    }

    localStorage.setItem('Holdings', JSON.stringify(items));
    localStorage.setItem('NetCost', JSON.stringify(cost));
    const a = JSON.parse(localStorage.getItem('Holdings'));
    const b = JSON.parse(localStorage.getItem('NetCost'));

    toggle(i);

    setHoldings(a);
    setNetCost(b);

    setMarketValue(defaultValue);
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    handleLocalStorage();
    clickHandler();

    if (JSON.parse(localStorage.getItem('Holdings')) !== null) {
      const a = JSON.parse(localStorage.getItem('Holdings'));
      const b = JSON.parse(localStorage.getItem('NetCost'));

      setHoldings(a);
      setNetCost(b);
    }
  }, []);

  useEffect(() => {
    if (quotes !== undefined) {
      quotes.map((x, i) => {
        mValue.push(i);
        rates.push(x.quote.USD.price);
        const q1 = holdings[i];
        const p1 = rates[i];

        defaultValue[i] = q1 * p1;

        setMarketValue(defaultValue);
        localStorage.setItem('MarketValue', JSON.stringify(defaultValue));
      });
    }
  }, [quotes, netCost]);
  useEffect(() => {
    if (quotes !== undefined) {
      quotes.map((x, i) => {
        const q1 = marketValue[i];
        const p1 = netCost[i];

        profitValue[i] = q1 - p1;
        setProfit(profitValue);
      });
    }
  }, [marketValue]);

  return (
    <div>
      {!loading && (
        <List2>
          {quotes.map((x, i) => (
            <li key={x.id}>
              <Button type="button" onClick={() => toggle(x)}>
                <Row>
                  <Child>
                    Holdings{' '}
                    <BsFillBagFill
                      style={{
                        color: 'rgb(251, 184, 38)',
                      }}
                    />
                  </Child>
                  <Child>
                    Net Cost{' '}
                    <AiOutlineMinusCircle
                      style={{
                        color: 'red',
                      }}
                    />
                  </Child>
                  <Child>
                    Market Value{' '}
                    <AiOutlinePlusCircle
                      style={{
                        color: 'green',
                      }}
                    />
                  </Child>
                  <Child>
                    Profit{' '}
                    <BiDollar
                      style={{
                        color: 'rgb(251, 184, 38)',
                      }}
                    />
                  </Child>

                  <Current>
                    <Span
                      style={{
                        color:
                          x.quote.USD.percent_change_24h > 0 ? 'green' : 'red',
                      }}
                    >
                      24h {x.quote.USD.percent_change_24h}
                      {x.quote.USD.percent_change_24h > 0 ? ' ↑' : ' ↓'} %
                    </Span>
                  </Current>
                  <Value> {x.quote.USD.price}</Value>
                </Row>
                <Row>
                  <Child>
                    {holdings[i] === null || holdings[i] === undefined
                      ? 0
                      : holdings[i]}
                  </Child>
                  <Child>
                    {netCost[i] === null || netCost[i] === undefined
                      ? 0
                      : netCost[i]}
                  </Child>
                  <Child>
                    {holdings[i] === null || holdings[i] === undefined
                      ? 0
                      : marketValue[i]}
                  </Child>
                  <Child
                    style={{
                      color: profit[i] > 0 ? 'green' : 'red',
                    }}
                  >
                    {holdings[i] === null || holdings[i] === undefined
                      ? 0
                      : profit[i]}{' '}
                    %
                  </Child>
                  <Current2></Current2>
                  <Value> </Value>
                </Row>
                <div>{x.name}</div>
              </Button>
              <C isOpen={openItemIndex === x}>
                <div>
                  <ModalProvider backgroundComponent={FadingBackground}>
                    <AddTrans onClick={toggleModal}> Add Transaction</AddTrans>
                    <StyledModal
                      isOpen={isOpen}
                      afterOpen={afterOpen}
                      beforeClose={beforeClose}
                      onBackgroundClick={toggleModal}
                      onEscapeKeydown={toggleModal}
                      allowScroll={false}
                    >
                      {' '}
                      <div
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            textAlign: 'left',
                            marginLeft: '29px',
                          }}
                        >
                          Price ($)
                        </span>
                        <Input
                          type="text"
                          style={{
                            fontSize: '15px',
                            paddingLeft: '10px',
                          }}
                          value={x.quote.USD.price}
                          disabled
                        />
                        <span
                          style={{
                            display: 'block',
                            textAlign: 'left',
                            marginLeft: '29px',
                          }}
                        >
                          Qunatity
                        </span>
                        <Input
                          style={{
                            fontSize: '15px',
                            paddingLeft: '10px',
                          }}
                          type="number"
                          onChange={(event) => transaction(event)}
                        />
                        <Trans type="button" onClick={() => submit(i)}>
                          Save Transaction
                        </Trans>
                      </div>
                    </StyledModal>
                  </ModalProvider>{' '}
                </div>
              </C>
            </li>
          ))}
        </List2>
      )}
      {!loading2 && (
        <>
          <NoCoin>
            Welcome to crypto portfolio manager. Use search on the right to add
            coins to your portfolio
          </NoCoin>
        </>
      )}
    </div>
  );
}
