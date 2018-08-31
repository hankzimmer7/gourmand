import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import DishSearch from './pages/DishSearch';
import RestaurantSearch from './pages/RestaurantSearch';
import Dish from './pages/Dish';
import Restaurant from './pages/Restaurant';
import Profile from './pages/Profile';

class App extends Component {

	state = {
		loggedIn: false,
		user: null
	}

  componentDidMount = () => {
		// console.log("Querying axios.get('/api/users/current')")
		axios.get('/api/users').then(response => {
			if (response.data.user) {
        // console.log("A user is logged in");
        // console.log("Response.data: ");
        // console.log(response.data);
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
        // console.log("There is no user logged in. Response.data:");
        // console.log("Response.data?");
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
  }
  
  updateUser = userObject => {
    // console.log("updateUser function argument:");
    // console.log(userObject);
    this.setState(userObject);
  }

  login = (username, password) => {

		// console.log("App.js login function executing. Setting logginIn to true and user to response.data.user");
		axios
			.post('/api/users/login', {
				username,
				password
			})
			.then(response => {
				// console.log("App.js got response from post request to /api/users/login. Response:")
				// console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.user
					})
				}
			})
	}
  
  logout = (event) => {
		event.preventDefault();
    // console.log('App logout function executing. logged in should update to false and username to null');
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

		// console.log("App this.state: ");
		// console.log(this.state);

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
              <Route exact path="/create_account" render={() => <CreateAccount updateUser={this.updateUser} />} />
              <Route exact path="/dish_search" component={DishSearch} />
              <Route exact path="/restaurant_search" component={RestaurantSearch} />
              <Route exact path="/restaurants/:restaurant" component={Restaurant} />
              <Route exact path="/restaurants/:restaurant/dishes/:dish" render={(routeProps) => <Dish {...routeProps} user={this.state.user} loggedIn={this.state.loggedIn}/>} />
              {/* <Route exact path="/restaurants/:restaurant/dishes/:dish" component={Dish} user={this.state.user} loggedIn={this.state.loggedIn} /> */}
							<Route exact path="/profile" render={() => <Profile user={this.state.user} loggedIn={this.state.loggedIn}/>} /> 
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
