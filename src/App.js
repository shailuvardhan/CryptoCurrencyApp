import { BrowserRouter, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import CryptoCurrencyListItem from "./components/CryptoCurrencyListItem";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <div className="App-container">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/coins/:id" component={CryptoCurrencyListItem} />
    </div>
  </BrowserRouter>
);

export default App;
