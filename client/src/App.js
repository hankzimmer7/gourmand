import React, { Component } from 'react';
import axios from 'axios';
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
  
  state = {
    loggedIn: false,
    username: null
  }

  componentDidMount() {
		axios.get('/api/users').then(response => {
			if (response.data.user) {
        console.log("A user is logged in");
        console.log("Response.data: ");
        console.log(response.data);
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
        console.log("There is no user logged in. Response.data:");
        console.log("Response.data?");
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
  }
  
  updateUser (userObject) {
    this.setState (userObject)
  }
  
  logout(event) {
		event.preventDefault();
    console.log('logging out');
    alert("logged out");
		axios.post('/api/users/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}
  
  render() {
    return (
      <div>
        <Navbar 
          user={this.state.user}
          logout={this.logout}
          loggedIn={this.state.loggedIn}/>
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
