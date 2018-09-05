import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import About from './pages/About';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import DishSearch from './pages/DishSearch';
import RestaurantSearch from './pages/RestaurantSearch';
import Dish from './pages/Dish';
import Restaurant from './pages/Restaurant';
import Profile from './pages/Profile';

class App extends Component {

	state = {
		loggedIn: null,
		user: null,
		userCheckDone: false,
		userData: [],
		userLoaded: false
	}

  componentDidMount = () => {
 	this.checkUser();
  }

  checkUser = () => {
		axios.get('/api/users').then(response => {
			if (response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user,
					userCheckDone: true
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null,
					userCheckDone: true
				})
			}
		})
		.then( () => {
			if (this.state.loggedIn) {
				this.loadUser();
			}
		})
  }

  loadUser = () => {
	axios.get(`/api/users/${this.state.user.username}`)
	.then(response => {
		if(response.data) {
			this.setState({
				user:response.data,
				userLoaded: true
			});
	   } else {
			console.log(`No response from get /api/users/${this.state.user.username}`)
	   }
	})
}
  
  updateUser = userObject => {
    this.setState(userObject);
  }

  login = (username, password) => {
		axios
			.post('/api/users/login', {
				username,
				password
			})
			.then(response => {
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.user,
						userCheckDone: false
					})
				}
			})
	}
  
  logout = (event) => {
		event.preventDefault();
		axios.post('/api/users/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null,
					userCheckDone: false
				})
			}
			window.location.reload();
		})
	}
  
  render() {

    return (
		<div class="max-height">
			{this.state.userCheckDone ? (
				<div class="max-height">
					<Navbar 
						user={this.state.user}
						logout={this.logout}
						loggedIn={this.state.loggedIn}
					/>
					<Router>
						<div class="max-height">
							<Switch>
								<Route 
									exact path="/about" component={About} />
								<Route 
									exact path="/sign_in" 
									render={() => <SignIn
									updateUser={this.updateUser}
									user={this.state.user}
									loggedIn={this.state.loggedIn} />} 
								/>
								<Route 
									exact path="/create_account" 
									render={() => <CreateAccount 
									updateUser={this.updateUser} 
									user={this.state.user}
									loggedIn={this.state.loggedIn} />} 
								/>
								<Route exact path="/dish_search" component={DishSearch} />
								<Route 
									exact path="/restaurant_search"
									render={(routeProps) => <RestaurantSearch {...routeProps} 
									user={this.state.user}
									loggedIn={this.state.loggedIn}/>} 
								/>
								<Route 
									exact path="/restaurants/:restaurant" 
									render={(routeProps) => <Restaurant {...routeProps} 
									user={this.state.user} 
									loggedIn={this.state.loggedIn}/>} 
								/>
								<Route 
									exact path="/restaurants/:restaurant/dishes/:dish" 
									render={(routeProps) => <Dish {...routeProps} 
									user={this.state.user} 
									userData={this.state.userData} 
									loggedIn={this.state.loggedIn}/>} 
								/>
								<Route 
									exact path="/profile" 
									render={() => <Profile 
									user={this.state.user} 
									loggedIn={this.state.loggedIn}
									/>} 
								/>
							    <Redirect from="/" to="/sign_in" />
							</Switch>
						</div>
					</Router>
				</div>
			) : (
				<Loader />
			)}
      </div>
    );
  }
}

export default App;
