import React, { Component } from 'react';
import moment from 'moment';
import API from '../../utils/API';
import Loader from '../../components/Loader';

class RestaurantSearch extends Component {
    state = {
        restaurants: [],
        restaurantsLoaded: false,
        newRestaurantName: '',
        newRestaurantAddress: '',
        newRestaurantDescription: '',
        searchTerm: ''
    };

    componentDidMount() {
    this.loadAllRestaurants();
    };

    loadAllRestaurants = () => {
        API.getAllRestaurants()
            .then(res =>
            this.setState({ 
                restaurants: res.data,
                restaurantsLoaded: true
            })
            )
            .catch(err => console.log(err));
    };

    //Handle changes to the input form
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSearchSubmit = event => {
        event.preventDefault();
        API.getRestaurantsByTerm(this.state.searchTerm)
            .then(res =>
                this.setState({ 
                    restaurants: res.data,
                    restaurantsLoaded: true
                }) 
            )
            .catch(err => console.log(err));
    }

    //Submit a new restaurant when the user clicks the submit button
    handleRestaurantSubmit = event => {
        event.preventDefault();
        const newRestaurant = {
            name: this.state.newRestaurantName,
            description: this.state.newRestaurantDescription,
            address: this.state.newRestaurantAddress,
            added_by: this.props.user._id,
            date_added: moment(new Date()).toISOString()
        }
        API.addRestaurant(newRestaurant)
            .then(response => {
                console.log("addRestaurant response: ", response);
                this.setState({
                    newRestaurantName: '',
                    newRestaurantAddress: '',
                    newRestaurantDescription: ''
                 })
                this.loadAllRestaurants();
            }).catch(error => {
                console.log('Error posting restaurant: ')
                console.log(error);                
            })
    }

    render() {

        return (
            <div className="content-area">
                <div className="container">
                    <div className ="jumbotron">
                    <h2>Restaurant Search Page</h2>
                    <form className="form-inline">
                        <input
                            name="searchTerm"
                            value={this.state.searchTerm}
                            onChange={this.handleInputChange}
                            type="text" 
                            className="form-control mb-2 mr-sm-2" 
                            id="inputRestaurantSearch" 
                            placeholder="Search..."
                        />
                        <button 
                            type="submit" 
                            className="btn mb-2"
                            onClick={this.handleSearchSubmit}
                        >
                            Submit
                        </button>
                    </form>
                    {this.state.restaurantsLoaded ? (
                    <div className="row">
                        {this.state.restaurants.map(restaurant => (
                            <div className="col-12" key={restaurant._id}>
                                <div className="card mb-1">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            <a href={"/restaurants/" + restaurant._id}>
                                                {restaurant.name}
                                            </a>
                                        </h3>
                                        <p className="text-muted">
                                                {restaurant.address}
                                        </p>
                                        <p className="card-text">{restaurant.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : (
                    <Loader />
                    )}
                    {this.props.loggedIn ? (
                        <div>
                            <h4 className="mt-2">Can't find the restaurant you're looking for? Add a new restaurant:</h4>
                            <form className="form-group">
                                <label htmlFor="addRestaurantName">Name:</label>
                                <input 
                                    name="newRestaurantName"
                                    value={this.state.newRestaurantName}
                                    onChange={this.handleInputChange}
                                    type="text" 
                                    className="form-control" 
                                    id="restaurantNameInput" 
                                    placeholder="Enter the restaurant name..."/>
                            </form>
                            <form className="form-group">
                                <label htmlFor="addRestaurantAddress">Address:</label>
                                <input 
                                    name="newRestaurantAddress"
                                    value={this.state.newRestaurantAddress}
                                    onChange={this.handleInputChange}
                                    type="text" 
                                    className="form-control" 
                                    id="restaurantAddressInput" 
                                    placeholder="Enter the restaurant address..."/>
                            </form>
                            <form className="form-group">
                                <label htmlFor="addRestaurantDescriptionArea">Description:</label>
                                <textarea 
                                    name="newRestaurantDescription"
                                    value={this.state.newRestaurantDescription}
                                    onChange={this.handleInputChange}
                                    className="form-control" 
                                    id="restaurantDescriptionArea" 
                                    rows="3"
                                    >
                                </textarea>
                            </form>
                            <button 
                                className="btn mb-3"
                                onClick={this.handleRestaurantSubmit}
                                >
                                Add New Restaurant
                            </button>
                        </div>
                    ) : (
                        <p>
                            <a href='/sign_in'>Sign in</a> to add a new restaurant
                        </p>
                    )}               
                    </div>
                </div>
            </div>
        );
    };
};
    
export default RestaurantSearch;