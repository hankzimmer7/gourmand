import React, { Component } from 'react';
import API from "../../utils/API";

class Restaurants extends Component {
    state = {
        restaurants: [],
      };

    componentDidMount() {
    this.loadRestaurants();
    }

    loadRestaurants = () => {
    API.getRestaurants()
        .then(res =>
        this.setState({ restaurants: res.data})
        )
        .catch(err => console.log(err));
    };

    render() {
        return (

        <div>
            <div className="container">
                Restaurants Page
                <div className ="jumobotron">Jumbotron
                
                {this.state.restaurants.length ? (
                <div className="row">
                    {this.state.restaurants.map(restaurant => (
                        <div className="col-12" key={restaurant._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title"><a href={"/restaurants/" + restaurant._id}>{restaurant.name}</a></h2>
                                    <p className="card-text">{restaurant.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                <h3>No Results to Display</h3>
                )}                
                </div>
            </div>
        </div>
        );
    };
};
    
export default Restaurants;