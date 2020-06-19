import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import { Home, Host, Listing, Listings, NotFound, User } from './sections'
import "./styles/index.css";
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: "/api"
});

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing/:id" component={Listing} />
        <Route exact path="/listing/:location?" component={Listings} />
        <Route exact path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

render(
  <ApolloProvider client={client}>
   <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
