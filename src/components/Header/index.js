import { useHistory } from "react-router-dom";

import "./index.css";
import MainLogo from "../../Assets/Images/MainLogo.png";
import { CryptoState } from "../../Context/CryptoContext";

const Header = () => {
  const history = useHistory();
  const { currency, setCurrency } = CryptoState();

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

      <select
        className="select-container"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        // onChange={onChangedCurrency}
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>
    </div>
  );
};

export default Header;
