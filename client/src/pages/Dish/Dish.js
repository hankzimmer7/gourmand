import React, { Component } from 'react';
import API from "../../utils/API";

class Dish extends Component {
    state = {
        dish: [],
        reviews: [],
        dishLoaded: false,
        reviewsLoaded: false
    };

    componentDidMount() {
        // console.log("Dish.js component mounted");
        // console.log("this.match.params", this.props.match.params);
        this.loadDish(this.props.match.params.dish);
        this.loadReviews(this.props.match.params.dish);
    };
    
    loadDish = (id) => {
        API.getDish(id)
            .then(response => {
                // console.log("Dish.js loadDish api result", response);
                this.setState({ 
                    dish: response.data,
                    dishLoaded: true
                });
            }
            )
        .catch(err => console.log(err));
    };

    loadReviews = (dishId) => {
        API.getDishReviews(dishId)
            .then(response => {
                console.log("Dish.js loadReview api result", response);
                this.setState({ 
                    reviews: response.data,
                    reviewsLoaded: true
                });
            }
            )
        .catch(err => console.log(err));
    };
    
    render() {

        // console.log("Dish.js this.state",this.state);

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
                            <h3>Reviews</h3>
                            <form>
                                <p>Add your own review:</p>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
                                    <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
                                    <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
                                    <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                                </div>
                                <div className="form-group">
                                     <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your comments here"></textarea>
                                </div>
                            </form>
                            {this.state.reviewsLoaded ? (
                                <div className="row">
                                    {this.state.reviews.map(review => (
                                    <div className="col-12" key={review._id}>
                                    <div className="card mb-1">
                                        <div className="card-body">
                                            <h2 className="card-title">{review.rating} Stars</h2>
                                            <p className="card-text">{review.body}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        ) : (
                        <h3>Loading Reviews...</h3>
                    )}                
                        </div>
                    </div>
                </div>
            </div>

        );
    };
};
    
export default Dish;