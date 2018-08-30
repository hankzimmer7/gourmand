import React, { Component } from 'react';
import API from "../../utils/API";
import Searchbar from '../../components/Searchbar';

class RestaurantSearch extends Component {
    state = {
        restaurants: [],
    };

    componentDidMount() {
    this.loadRestaurants();
    };

    loadRestaurants = () => {
    API.getRestaurants()
        .then(res =>
        this.setState({ restaurants: res.data})
        )
        .catch(err => console.log(err));
    };

    render() {
        return (

        <div className="content-area">
            <div className="container">
                <div className ="jumbotron">
                <h2>Restaurant Search Page</h2>
                <Searchbar />
                
                {this.state.restaurants.length ? (
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
                <h3>Loading Results...</h3>
                )}                
                </div>
            </div>
        </div>
        );
    };
};
    
export default RestaurantSearch;