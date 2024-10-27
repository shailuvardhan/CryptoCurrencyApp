import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import { CryptoState } from "../../Context/CryptoContext";
import { TrendingCoins } from "../../config/api";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import "./index.css";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const getTrendingData = async () => {
    // const { data } = await axios.get(TrendingCoins(currency));
    try {
      const response = await fetch(TrendingCoins(currency));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrending(data);
    } catch (error) {
      console.error("Failed to Fetch:-", error);
    }
  };

  useEffect(() => {
    getTrendingData();
    // eslint-disable-next-line
  }, [currency]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    let profitColor = profit > 0 ? "green" : "red";

    return (
      <Link to={`/coins/${coin.id}`} className="carousel-item">
        <img src={coin?.image} alt={coin.name} className="carousel-img" />
        <br />
        <span>
          {coin?.symbol}
          &nbsp;
          <span className={`${profitColor} percentage`}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="price">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 1, // For very small screens
    },
    600: {
      items: 2, // For small screens
    },
    1024: {
      items: 4, // For medium and larger screens
    },
  };

  return (
    <div className="carousel-container">
      <AliceCarousel
        key={items.length}
        autoWidth
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
