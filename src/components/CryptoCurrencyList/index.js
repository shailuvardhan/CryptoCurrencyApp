import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { CryptoState } from "../../Context/CryptoContext";
import { CoinList } from "../../config/api";

import "./index.css";

const CryptoCurrencyList = () => {
  const [coinsList, setCoinsList] = useState([]);
  const { currency, symbol } = CryptoState();

  const getCryptoCurrencyList = async () => {
    const response = await fetch(CoinList(currency));
    const fetchedData = await response.json();
    console.log(fetchedData);
  };

  useEffect(() => {
    getCryptoCurrencyList();
  }, []);
  console.log(coinsList);
  return (
    <div className="crypto-currency-list-container">
      <h1 className="heading">Cryptocurrency Prices by Market Cap</h1>
      <div className="input-field-container">
        <input
          type="search"
          placeholder="Search for a crypto currency here..."
          className="input-field"
        />
        <FaSearch className="search-icon" />
      </div>
    </div>
  );
};
export default CryptoCurrencyList;
