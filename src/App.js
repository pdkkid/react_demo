import React, { Component } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";

//Pages
import Main from "./pages/main";
import Admin from "./pages/admin";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("http://localhost:8080/product", {
      crossDomain: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ products: data, isLoading: false }));
  }

  render() {
    const { products, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading . . .</p>;
    }

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact>
              <Main products={products} />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
