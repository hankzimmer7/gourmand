import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import API from "../../utils/API";
import moment from 'moment';
import Loader from '../../components/Loader';

class Restaurant extends Component {
    state = {
        restaurant: [],
        dishes: [],
        restaurantLoaded: false,
        dishesLoaded: false,
        newDishName: '',
        newDishDescription: '',
        redirectTo: null
    };

    componentDidMount() {
        this.loadRestaurant();
    };
    
    //Load the info for the current restaurant
    loadRestaurant = () => {
        const id = this.props.match.params.restaurant;
        API.getRestaurant(id)
            .then(response => {
                this.setState({ 
                    restaurant: response.data,
                    restaurantLoaded: true
                });
                this.loadDishes();
            })
            .catch(err => console.log(err));
    };

    //Load dishes for the restaurant
    loadDishes = () => {
        const restaurantId = this.state.restaurant._id;
        API.getRestaurantDishes(restaurantId)
            .then(res =>
            this.setState({ 
                dishes: res.data,
                dishesLoaded: true
            }, () => {
                this.calculateAverageRating();
            })            
            )
            .catch(err => console.log(err));
    };

    //Calculate the average rating for each dish and save it in the state so it can be displayed next to the dish name
    calculateAverageRating = () => {
        let dishesWithAvgRatings = [];
        this.state.dishes.forEach(function (dish, i) {
            let dishWithAvgRating = dish;
            if(dish.reviews.length>0) {
                let totalRating = dish.reviews.reduce(function (accumulator, review) {
                    return accumulator + review.rating;
                }, 0);
                let newRating = (Math.round(totalRating/dish.reviews.length*10)/10).toFixed(1);
                dishWithAvgRating.averageRating = newRating;
            }
            dishesWithAvgRatings.push(dishWithAvgRating);            
        })
        this.setState({
            dishes: dishesWithAvgRatings
        });
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
        event.preventDefault();
        const newDish = {
            name: this.state.newDishName,
            description: this.state.newDishDescription,
            restaurant: this.state.restaurant._id,
            added_by: this.props.user._id,
            date_added: moment(new Date()).toISOString()
        }
        API.addDish(newDish)
            .then(res => {
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

    //When the user clicks the "Delete Restaurant" button, delete the restaurant and all associated dishes & reviews
    handleDeleteRestaurant = id => {
        API.deleteRestaurant(id)
            .then(response => {
                this.setState({
                    redirectTo: `/restaurant_search`
                });
            }).catch(error => {
                console.log('Error deleting restaurant: ')
                console.log(error);   
            })
    }
    
    render() {      
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="content-area">
                    <div className="container">
                        <div className="jumbotron">
                            {this.state.restaurantLoaded ? (
                                <div>
                                    <div>
                                        <h2>{this.state.restaurant.name}</h2>
                                        {this.state.restaurant.address && (
                                            <p>
                                                {this.state.restaurant.address}
                                            </p>
                                        )}
                                        <p>
                                            {this.state.restaurant.description}
                                        </p>
                                    </div>
                                    {this.props.loggedIn && (
                                        <div>
                                            {this.props.user.account_type === 'administrator' && (
                                                <button 
                                                    className="btn mb-3"
                                                    onClick={() => this.handleDeleteRestaurant(this.state.restaurant._id)}
                                                >
                                                    Delete Restaurant
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {this.state.dishesLoaded ? (
                                        <div className="row">
                                            {this.state.dishes.map(dish => (
                                            <div className="col-12" key={dish._id}>
                                                <div className="card mb-1">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                <h3 className="card-title">
                                                                    <a href={`/restaurants/${dish.restaurant}/dishes/${dish._id}`}>
                                                                        {dish.name}
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                            <div className="col-md-4 rating-display-text">
                                                                <span>
                                                                    {dish.averageRating && ` ${dish.averageRating} Stars, `}
                                                                    {` ${dish.reviews.length} Reviews`}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="card-text">{dish.description}</p>
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
                                            <h4 className='mt-2'>Can't find the dish you're looking for? Add a new dish:</h4>
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
                                                    id="dishDescriptionInput" 
                                                    rows="3"
                                                    >
                                                </textarea>
                                            </form>
                                            <button 
                                                className="btn mb-3"
                                                onClick={this.handleDishSubmit}
                                                >
                                                Add New Dish
                                            </button>
                                        </div>
                                    ) : (
                                        <p>
                                            <a href='/sign_in'>Sign in</a> to add a new dish
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <Loader />
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    };
};
    
export default Restaurant;