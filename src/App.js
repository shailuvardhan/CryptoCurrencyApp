import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import CryptoCurrencyListItem from "./components/CryptoCurrencyListItem";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <div className="App-container">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/coins/:id"
          component={CryptoCurrencyListItem}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
