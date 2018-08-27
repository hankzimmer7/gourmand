import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Dishes from './pages/Dishes';
import Restaurants from './pages/Restaurants';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/sign_in" component={SignIn} />
              <Route exact path="/create_account" component={CreateAccount} />
              <Route exact path="/dishes" component={Dishes} />
              <Route exact path="/restaurants" component={Restaurants} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
