import React, { Component } from 'react';
import API from "../../utils/API";
import Loader from '../../components/Loader';

class DishSearch extends Component {
    state = {
        dishes: [],
        dishesLoaded: [],
        searchTerm: '',
    };

    //Once the component mounts, load dishes
    componentDidMount() {
        this.loadAllDishes();
    };
    
    //Load all dishes
    loadAllDishes = () => {
        API.getAllDishes()
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

    //When the user searches for a fish
    handleSearchSubmit = event => {
        event.preventDefault();        
        this.setState({ 
            dishesLoaded: false
        }, () => {
            API.getDishesByTerm(this.state.searchTerm)
                .then(res =>
                    this.setState({ 
                        dishes: res.data,
                        dishesLoaded: true
                    }, () => {
                        this.calculateAverageRating();
                    })            
                )
                .catch(err => console.log(err));
        }        
    )}
    
    //Render to the page
    render() {
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Dish Search Page</h2>
                        <form className="form-inline">
                            <input 
                                name="searchTerm"
                                value={this.state.searchTerm}
                                onChange={this.handleInputChange}
                                type="text" 
                                className="form-control mb-2 mr-sm-2" 
                                id="inputDishSearch" 
                                placeholder="Search for a dish..."
                            />
                            <button 
                                type="submit" 
                                className="btn mb-2"
                                onClick={this.handleSearchSubmit}
                            >
                                Search
                            </button>
                        </form>                      
                        {this.state.dishesLoaded ? (
                        <div className="row">
                            {this.state.dishes.map(dish => (
                                <div className="col-12" key={dish._id}>
                                    <div className="card mb-1">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="card-title">
                                                        <a href={`restaurants/${dish.restaurant._id}/dishes/${dish._id}`}>
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
                                            <p>
                                                <a href={`restaurants/${dish.restaurant._id}`}>
                                                    {dish.restaurant.name}
                                                </a>
                                            </p>
                                            <p className="card-text">{dish.description}</p>
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
    
export default DishSearch;