import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import "./index.css";
import MainLogo from "../../Assets/Images/MainLogo.png";

import { CryptoState } from "../../Context/CryptoContext";

const Header = () => {
  const history = useHistory();
  const { currency, setCurrency } = CryptoState();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <div className="header-container">
      <div
        className="logo-heading-container"
        onClick={() => {
          history.push("/");
        }}
      >
        <img src={MainLogo} alt="BitCoin Logo" className="header-logo" />
        <strong className="Main-heading">Crypto Tracker</strong>
      </div>

      <div>
        <select
          className="select-container"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          // onChange={onChangedCurrency}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
