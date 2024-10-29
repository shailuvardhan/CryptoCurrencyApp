import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Carousel from "../Carousel";
import Header from "../Header";
import CryptoCurrencyList from "../CryptoCurrencyList";
import "./index.css";

const Home = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header />
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
    </>
  );
};
export default Home;
