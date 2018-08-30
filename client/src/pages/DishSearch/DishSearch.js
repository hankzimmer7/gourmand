import React, { Component } from 'react';
import API from "../../utils/API";
import Searchbar from '../../components/Searchbar';

class DishSearch extends Component {
    state = {
        dishes: [],
        queryTerm: "",
        reviews: []
    };

      componentDidMount() {
        this.loadDishes();
    };
    
    loadDishes = () => {
        API.getDishes()
            .then(res =>
            this.setState({ dishes: res.data})
            )
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Dish Search Page</h2>
                        <Searchbar />
                        <div className ="jumobotron">
                            {this.state.dishes.length ? (
                            <div className="row">
                                {this.state.dishes.map(dish => (
                                    <div className="col-12" key={dish._id}>
                                        <div className="card mb-1">
                                            <div className="card-body">
                                                <h2 className="card-title"><a href={`restaurants/${dish.restaurant_id}/dishes/${dish._id}`}>{dish.name}</a></h2>
                                                <p className="card-text">{dish.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            ) : (
                            <h3>Loading Results...</h3>
                        )}                
                        </div>
                    </div>
                </div>
            </div>

        );
    };
};


    
export default DishSearch;