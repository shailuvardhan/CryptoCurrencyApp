import Carousel from "../Carousel";
import CryptoCurrencyList from "../CryptoCurrencyList";
import "./index.css";

const Home = () => (
  <div className="Home-container">
    <div className="banner">
      <h1 className="home-title">Cryptocurrency Tracker</h1>
      <p className="home-banner-description">
        Get all the Info regarding your favorite Crypto Currency
      </p>
      <Carousel />
    </div>
    <CryptoCurrencyList />
  </div>
);

export default Home;
