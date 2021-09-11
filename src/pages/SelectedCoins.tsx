import React, { useState, useEffect } from 'react';
import Collapse from 'react-css-collapse';
import styled from 'styled-components';

const List = styled.div`
  float: left;
  width: 100%;
  paddig-left: 10px;
`;
const Child = styled.div`
  float: right;
  width: 15%;
  padding-left: 2 rem;
`;
const Row = styled.div`
  width: 50%;
  display: flex;
  overflow: hidden;
  padding-left: 70vh;
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
  padding-bottom: 25px;
`;

const Content = styled.div`
  padding: 20px;
  color: #efefef;
`;

const C = styled(Collapse)`
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export default function SelectedCoins() {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  const coinsIds = [];
  const handleLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('Name')) !== null) {
      setLoading(false);
      setLoading2(true);
      const a = JSON.parse(localStorage.getItem('Name'));

      setRes(a);
      console.log(a);

      for (const element of res) {
        coinsIds.push(element.Id);
      }
      console.log(coinsIds);
    } else {
      setLoading(true);
      setLoading2(false);
    }
  };
  const [openItemIndex, setOpenItemIndex] = useState();
  const clickHandler = async () => {
    const response = await fetch(`api/quotes?ids=${coinsIds}`);
    const data = await response.json();

    console.log(data.data);
  };

  function toggle(id) {
    setOpenItemIndex(openItemIndex === id ? undefined : id);
  }

  useEffect(() => {
    handleLocalStorage();
    clickHandler();
  }, []);

  return (
    <div>
      {!loading && (
        <List2>
          {res.map((x) => (
            <li key={x}>
              <Button type="button" onClick={() => toggle(x)}>
                <Row>
                  <Child>Holdings</Child>
                  <Child>Market Value</Child>
                  <Child>Market Value</Child>
                </Row>
                {x.Name}
              </Button>
              <C isOpen={openItemIndex === x}>
                <Content>
                  <List>
                    {res.map((res) => (
                      <ul key={res.Name}>{res.Name}</ul>
                    ))}
                  </List>
                </Content>
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
