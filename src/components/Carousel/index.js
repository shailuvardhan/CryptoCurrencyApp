import { useState, useEffect } from "react";

import { CryptoState } from "../../Context/CryptoContext";
import { TrendingCoins } from "../../config/api";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./index.css";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const getTrendingData = async () => {
    const response = await fetch(TrendingCoins(currency));
    const fetchedData = await response.json();

    setTrending(fetchedData);
  };

  useEffect(() => {
    getTrendingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <div className="carousel-container">
      <AliceCarousel
        autoPlay
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
