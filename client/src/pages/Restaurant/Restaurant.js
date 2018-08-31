import React, { Component } from 'react';
import API from "../../utils/API";
import moment from 'moment';

class Restaurant extends Component {
    state = {
        restaurant: [],
        dishes: [],
        restaurantLoaded: false,
        dishesLoaded: false,
        newDishName: '',
        newDishDescription: ''
    };

    componentDidMount() {
        // console.log("Restaurant.js component mounted");
        // console.log("this.match.params", this.props.match.params);
        this.loadRestaurant(this.props.match.params.restaurant);
    };
    
    //Load the info for the current restaurant
    loadRestaurant = (id) => {
        API.getRestaurant(id)
            .then(response => {
                // console.log("Restaurant.js loadRestaurant api result", response);
                this.setState({ 
                    restaurant: response.data,
                    restaurantLoaded: true
                });
                this.loadDishes();
            }
            )
            .catch(err => console.log(err));
    };

    //Load dishes for the restaurant
    loadDishes = () => {
        const restaurantId = this.state.restaurant._id;
        // console.log("Restaurant.js loadDishes about to query api for where restaurant ID:", restaurantId);
        API.getRestaurantDishes(restaurantId)
            .then(res =>
            this.setState({ 
                dishes: res.data,
                dishesLoaded: true
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

    //Submit a new dish when the user clicks the submit button
    handleDishSubmit = event => {
        // const currentDate = new Date();
        // console.log("Current date:", currentDate);
        // console.log("Current date in ISO:",moment(currentDate).toISOString);
        event.preventDefault();
        const newDish = {
            name: this.state.newDishName,
            description: this.state.newDishDescription,
            restaurant_id: this.state.restaurant._id,
            added_by: this.props.user._id,
            date_added: moment(new Date()).toISOString()
        }
        console.log("new dish: ", newDish); 
        API.addDish(newDish)
            .then(response => {
                console.log("addDish response: ", response);
                this.setState({
                    newDishName: '',
                    newDishDescription: ''
                 })
                this.loadDishes();
            }).catch(error => {
                console.log('Error posting dish: ')
                console.log(error);                
            })
    }
    
    render() {
        const currentDate = new Date();

        console.log("Current date:", currentDate);
        console.log("Current date in ISO:", moment(currentDate).toISOString());

        // console.log("Restaurant.js this.state", this.state);
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Restaurant Page</h2>
                        {this.state.restaurantLoaded ? (
                            <div>
                                <div>
                                    <div>Restaurant Name: {this.state.restaurant.name}</div>
                                    <div>Description: {this.state.restaurant.description}</div>
                                </div>
                                <div className ="jumobotron">
                                    <h4>Add a new dish:</h4>
                                    <form className="form-group">
                                        <label htmlFor="addDishName">Name:</label>
                                        <input 
                                            name="newDishName"
                                            value={this.state.newDishName}
                                            onChange={this.handleInputChange}
                                            type="text" 
                                            className="form-control" 
                                            id="dishNameInput" 
                                            placeholder="Enter the dish name..."/>
                                    </form>
                                    <form className="form-group">
                                        <label htmlFor="addDishDescriptionArea">Description:</label>
                                        <textarea 
                                            name="newDishDescription"
                                            value={this.state.newDishDescription}
                                            onChange={this.handleInputChange}
                                            className="form-control" 
                                            id="exampleFormControlTextarea1" 
                                            rows="3"
                                            >
                                        </textarea>
                                    </form>
                                    <button 
                                        className="btn btn-primary mb-3"
                                        onClick={this.handleDishSubmit}
                                        >
                                        Add New Dish
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <h3>Loading Restaurant...</h3>
                        )}
                        {this.state.dishesLoaded ? (
                            <div className="row">
                                {this.state.dishes.map(dish => (
                                <div className="col-12" key={dish._id}>
                                    <div className="card mb-1">
                                        <div className="card-body">
                                            <h2 className="card-title"><a href={`/restaurants/${dish.restaurant_id}/dishes/${dish._id}`}>{dish.name}</a></h2>
                                            <p className="card-text">{dish.description}</p>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        ) : (
                            <h3>Loading Dishes...</h3>
                        )}                    
                    </div>
                </div>
            </div>
        );
    };
};
    
export default Restaurant;