import React, { Component } from 'react';
import API from "../../utils/API";

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
                <form className="form-inline">
                    <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Search..."/>

                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </form>
                
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