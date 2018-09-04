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
        API.getDishesByTerm(this.state.searchTerm)
            .then(res =>
                this.setState({ 
                    dishes: res.data,
                    dishesLoaded: true
                }) 
            )
            .catch(err => console.log(err));
    }
    
    //Render to the page
    render() {

        console.log("DishSearch this.state:", this.state)

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
                                className="btn btn-primary mb-2"
                                onClick={this.handleSearchSubmit}
                            >
                                Search
                            </button>
                        </form>
                        
                        <div className ="jumobotron">
                            {this.state.dishes.length ? (
                            <div className="row">
                                {this.state.dishes.map(dish => (
                                    <div className="col-12" key={dish._id}>
                                        <div className="card mb-1">
                                            <div className="card-body">
                                                <h2 className="card-title"><a href={`restaurants/${dish.restaurant._id}/dishes/${dish._id}`}>{dish.name}</a></h2>
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
            </div>

        );
    };
};
    
export default DishSearch;