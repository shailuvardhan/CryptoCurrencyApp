import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SingleCoin } from "../../config/api";

import ReactHtmlParser from "react-html-parser";

import { CryptoState } from "../../Context/CryptoContext";

import "./index.css";

const CryptoCurrencyListItem = (props) => {
  //   const { match } = props;
  //   const { params } = match;
  //   const { id } = params;
  //   console.log(id);

  const { id } = useParams();
  const [data, setData] = useState({});
  const { currency, symbol } = CryptoState();

  const getCryptoCurrencyListItem = async () => {
    try {
      const response = await fetch(SingleCoin(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Failed to Fetch:-", error);
    }
  };

  useEffect(() => {
    getCryptoCurrencyListItem();
    // eslint-disable-next-line
  }, []);

  console.log(data);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1 className="crypto-list-item-container">
        <div className="side-bar">
          <img
            src={data?.image?.large}
            alt={data.name}
            className="side-bar-img"
          />
          <h3 className="side-bar-heading">{data.name}</h3>
          <p className="side-bar-description">
            {ReactHtmlParser(data?.description?.en?.split(". ")[0])}.
          </p>
          <div className="Rank-container">
            <span className="Rank-text">
              Rank:&nbsp;{" "}
              <span className="item-value">{data?.market_cap_rank}</span>
            </span>
          </div>
          <div className="current-price-container">
            <span className="current-price-text">
              Current Price:&nbsp; &nbsp;
              <span className="item-value">
                {symbol}
                {numberWithCommas(
                  data?.market_data?.current_price[currency.toLowerCase()]
                )}
              </span>
            </span>
          </div>

          <div className="market-cap-container">
            <span className="market-cap-text">
              Market Cap:&nbsp; &nbsp;
              <span className="item-value">
                {symbol}
                {numberWithCommas(
                  data?.market_data?.market_cap[currency.toLowerCase()]
                )}
                M
              </span>
            </span>
          </div>
        </div>

        <div className="Coin-details-container">Coin Details</div>
      </h1>
    </div>
  );
};

export default CryptoCurrencyListItem;
