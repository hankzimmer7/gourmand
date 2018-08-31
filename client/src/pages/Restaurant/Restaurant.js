import React, { Component } from 'react';
import API from "../../utils/API";

class Restaurant extends Component {
    state = {
        restaurant: [],
        restaurantLoaded: false
    };

    componentDidMount() {
        console.log("Restaurant.js component mounted");
        console.log("this.match.params", this.props.match.params);
        this.loadRestaurant(this.props.match.params.restaurant);
    };
    
    loadRestaurant = (id) => {

        API.getRestaurant(id)
                .then(response => {
                    // console.log("Restaurant.js loadRestaurant api result", response);
                    this.setState({ 
                        restaurant: response.data,
                        restaurantLoaded: true
                    });
                }
                )
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Restaurant Page</h2>
                        <div className ="jumobotron">
                            {this.state.restaurantLoaded ? (
                            <div>
                            <div>Restaurant Name: {this.state.restaurant.name}</div>
                            <div>Description: {this.state.restaurant.description}</div>
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
    
export default Restaurant;