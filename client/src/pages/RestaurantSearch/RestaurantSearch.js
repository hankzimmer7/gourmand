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
        newRestaurantDescription: ''
    };

    componentDidMount() {
    this.loadRestaurants();
    };

    loadRestaurants = () => {
    API.getRestaurants()
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

    //Submit a new restaurant when the user clicks the submit button
    handleRestaurantSubmit = event => {
        // const currentDate = new Date();
        // console.log("Current date:", currentDate);
        // console.log("Current date in ISO:",moment(currentDate).toISOString);
        event.preventDefault();
        const newRestaurant = {
            name: this.state.newRestaurantName,
            description: this.state.newRestaurantDescription,
            address: this.state.newRestaurantAddress,
            added_by: this.props.user._id,
            date_added: moment(new Date()).toISOString()
        }
        // console.log("new restaurant: ", newRestaurant); 
        API.addRestaurant(newRestaurant)
            .then(response => {
                console.log("addRestaurant response: ", response);
                this.setState({
                    newRestaurantName: '',
                    newRestaurantAddress: '',
                    newRestaurantDescription: ''
                 })
                this.loadRestaurants();
            }).catch(error => {
                console.log('Error posting restaurant: ')
                console.log(error);                
            })
    }

    render() {

        console.log("RestaurantSearch.js this.state:", this.state);
        console.log("RestaurantSearch.js this.props:", this.props)

        return (
            <div className="content-area">
                <div className="container">
                    <div className ="jumbotron">
                    <h2>Restaurant Search Page</h2>
                    <form className="form-inline">
                        <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Search..."/>
                        <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>
                    <h4>Add a new restaurant:</h4>
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
                        className="btn btn-primary mb-3"
                        onClick={this.handleRestaurantSubmit}
                        >
                        Add New Restaurant
                    </button>                
                    {this.state.restaurantsLoaded ? (
                    <div className="row">
                        {this.state.restaurants.map(restaurant => (
                            <div className="col-12" key={restaurant._id}>
                                <div className="card mb-1">
                                    <div className="card-body">
                                        <h2 className="card-title"><a href={"/restaurants/" + restaurant._id}>{restaurant.name}</a></h2>
                                        <p className="card-text">{restaurant.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : (
                    <Loader />
                    )} 
                    </div>
                </div>
            </div>
        );
    };
};
    
export default RestaurantSearch;