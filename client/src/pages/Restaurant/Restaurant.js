import React, { Component } from 'react';
// import API from "../../utils/API";

class Restaurant extends Component {
    state = {
        restaurant: [],
    };

    componentDidMount() {
        this.loadRestaurant();
    };
    
    loadDish = () => {

        console.log("Loading Restaurant");
    };
    
    render() {
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Restaurant Page</h2>
                        <div className ="jumobotron">
                            {this.state.restaurant.length ? (
                            <div>Restaurant loaded</div>
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