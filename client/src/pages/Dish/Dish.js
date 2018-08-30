import React, { Component } from 'react';
import API from "../../utils/API";

class Dish extends Component {
    state = {
        dish: [],
        dishLoaded: false
    };

    componentDidMount() {
        console.log("Dish.js component mounted");
        console.log("this.match.params", this.props.match.params);
        this.loadDish(this.props.match.params.dish);
    };
    
    loadDish = (id) => {
        API.getDish(id)
            .then(response => {
                console.log("Dish.js loadDish api result", response);
                this.setState({ 
                    dish: response.data,
                    dishLoaded: true
                });
            }
            )
        .catch(err => console.log(err));
    };
    
    render() {

        console.log("Dish.js this.state",this.state);

        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Dish Page</h2>
                        <div className ="jumobotron">
                            {this.state.dishLoaded ? (
                                <div>
                                    <div>Restaurant ID: {this.state.dish.restaurant_id}</div>
                                    <div>Dish Name: {this.state.dish.name}</div>
                                    <div>Description: {this.state.dish.description}</div>
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
    
export default Dish;