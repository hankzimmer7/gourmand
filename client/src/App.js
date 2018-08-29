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
  	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this.logout = this.logout.bind(this)
		this.login = this.login.bind(this)
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
    console.log("updateUser function argument:");
    console.log(userObject);
    this.setState(userObject);
  }

  login(username, password) {
		axios
			.post('/api/users/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
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
					username: null
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
              <Route exact path="/sign_in" render={() => <SignIn updateUser={this.updateUser} />} />
              <Route exact path="/create_account" component={CreateAccount} />
              <Route exact path="/dishes" component={Dishes} />
              <Route exact path="/restaurants" component={Restaurants} />
              <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
