import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { CryptoState } from "../../Context/CryptoContext";
import { CoinList } from "../../config/api";
import { useHistory } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import Pagination from "../Pagination";
import "./index.css";

const CryptoCurrencyList = () => {
  const [coinsList, setCoinsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [perPage, setPerPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currency, symbol } = CryptoState();
  const history = useHistory();

  const getCryptoCurrencyList = async () => {
    try {
      const response = await fetch(CoinList(currency));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const fetchedData = await response.json();
        setCoinsList(fetchedData);
        setPerPage(fetchedData.slice(0, 10));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("failed to fetch:-", error);
    }
  };

  useEffect(() => {
    getCryptoCurrencyList();
    // eslint-disable-next-line
  }, [currency]);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onChangeSearchResults = () => {
    return coinsList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const pageHandler = (pageNumber) => {
    const filteredResults = onChangeSearchResults();
    setPerPage(filteredResults.slice(pageNumber * 10 - 10, pageNumber * 10));
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const filteredResults = onChangeSearchResults();
    setPerPage(filteredResults.slice(0, 10)); // Reset to first page
    // eslint-disable-next-line
  }, [searchInput, coinsList]);

  return (
    <div className="crypto-currency-list-container">
      <h1 className="heading">Cryptocurrency Prices by Market Cap</h1>
      <div className="input-field-container">
        <input
          type="search"
          placeholder="Search for a crypto currency here..."
          className="input-field"
          onChange={onChangeSearchInput}
          value={searchInput}
        />
        <FaSearch className="search-icon" />
      </div>
      <div>
        {isLoading ? (
          <div className="loading-view">
            <ColorRing
              visible={true}
              height="100"
              width="120"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead className="main-row">
                  <tr className="head-row">
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <th
                          key={head}
                          className={head === "Coin" ? "left head" : "head"}
                        >
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {perPage.map((coinRow) => {
                    let profit = coinRow.price_change_percentage_24h >= 0;
                    let profitColor = profit > 0 ? "green" : "red";
                    return (
                      <tr
                        key={coinRow?.id}
                        className="row-value-item"
                        onClick={() => history.push(`/coins/${coinRow.id}`)}
                      >
                        <th className="coin-cell">
                          <img
                            src={coinRow?.image}
                            alt={coinRow.name}
                            className="table-cell-img"
                          />
                          <div className="table-cell-coin-text-container">
                            <span className="fetched-symbol">
                              {coinRow.symbol.toUpperCase()}
                            </span>
                            <span className="fetched-name">{coinRow.name}</span>
                          </div>
                        </th>
                        <td className="align cell">
                          {symbol}{" "}
                          {numberWithCommas(coinRow.current_price.toFixed(2))}
                        </td>
                        <td className={`align ${profitColor}`}>
                          {profit && "+"}
                          {coinRow.price_change_percentage_24h.toFixed(2)}%
                        </td>
                        <td className="align cell">
                          {symbol}{" "}
                          {numberWithCommas(
                            coinRow.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              coinsList={onChangeSearchResults()}
              pageHandler={pageHandler}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default CryptoCurrencyList;
