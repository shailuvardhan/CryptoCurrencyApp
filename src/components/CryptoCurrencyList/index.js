import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { CryptoState } from "../../Context/CryptoContext";
import { CoinList } from "../../config/api";
import { useHistory } from "react-router-dom";

import "./index.css";

const CryptoCurrencyList = () => {
  const [coinsList, setCoinsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { currency } = CryptoState();
  const history = useHistory();

  const getCryptoCurrencyList = async () => {
    try {
      const response = await fetch(CoinList(currency));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      setCoinsList(fetchedData);
    } catch (error) {
      console.error("failed to fetch:-", error);
    }
  };

  useEffect(() => {
    getCryptoCurrencyList();
    // eslint-disable-next-line
  }, [currency]);
  console.log(coinsList);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onChangeSearchResults = () => {
    return coinsList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchInput) ||
        coin.symbol.toLowerCase().includes(searchInput)
    );
  };

  return (
    <div className="crypto-currency-list-container">
      <h1 className="heading">Cryptocurrency Prices by Market Cap</h1>
      <div className="input-field-container">
        <input
          type="search"
          placeholder="Search for a crypto currency here..."
          className="input-field"
          onChange={onChangeSearchInput}
        />
        <FaSearch className="search-icon" />
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="main-row">
            <tr className="head-row">
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <th className="head">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {onChangeSearchResults().map((coinRow) => {
              let profit = coinRow.price_change_percentage_24h >= 0;
              let profitColor = profit > 0 ? "green" : "red";
              return (
                <tr
                  className="row-value"
                  onClick={() => history.push(`/coins/${coinRow.id}`)}
                ></tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CryptoCurrencyList;
