import React, { Component } from 'react';
import API from "../../utils/API";
import moment from 'moment';

class Dish extends Component {
    state = {
        dish: [],
        reviews: [],
        dishLoaded: false,
        reviewsLoaded: false,
        reviewRating: '',
        reviewBody: '',
        dateVisited: ''
    };

    componentDidMount() {
        // console.log("Dish.js component mounted");
        // console.log("this.match.params", this.props.match.params);
        this.loadDish(this.props.match.params.dish);
        this.loadReviews();
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

    //Load the reviews for the current dish
    loadReviews = () => {
        const dishId = this.props.match.params.dish
        API.getDishReviews(dishId)
            .then(response => {
                // console.log("Dish.js loadReview api result", response);
                this.setState({ 
                    reviews: response.data,
                    reviewsLoaded: true
                });
            }
            )
        .catch(err => console.log(err));
    };

    //Handle changes to the input form for adding a review
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    //Submit a new review when the user clicks the submit button
    handleReviewSubmit = event => {
        event.preventDefault();
        const newReview = {
            author_id: this.props.user._id,
            dish_id: this.state.dish._id,
            rating: this.state.reviewRating.slice(0,1),
            body: this.state.reviewBody,
            date: this.state.dateVisited
        }
        // console.log("new review: ", newReview);
        API.addReview(newReview)
            .then(response => {
                console.log("addreview repsonse: ", response);
                this.setState({
                    reviewRating: '',
                    reviewBody: '',
                    dateVisited: ''
                })
                this.loadReviews();
            }).catch(error => {
                console.log('Error posting review: ')
                console.log(error);                
            })
    }

    handleDeleteReview = id => {
        console.log("Clicked delete review for review Id: ", id)
        API.deleteReview(id)
            .then(response => {
                console.log("Delete review response: ", response);
                this.loadReviews();
            }).catch(error => {
                console.log('Error deleting review: ')
                console.log(error);   
            })
    }
    
    render() {

        // console.log("Dish.js this.state",this.state);
        // console.log("Dish.js this.props", this.props);
        // console.log("Dish.js this", this);

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
                            <form className="mb-2">
                                <h4>Add your own review:</h4>
                                <div className="form-group row">
                                    <label htmlFor="FormControlSelect1" className="col-lg-3 col-md-4 col-form-label">Select your rating:</label>
                                    <div className="col-lg-4 col-md-4">
                                        <select
                                            name="reviewRating"
                                            className="form-control" 
                                            id="exampleFormControlSelect1"
                                            value={this.state.reviewRating}
                                            onChange={this.handleInputChange}
                                        >
                                            <option>1 (terrible)</option>
                                            <option>2 (bad)</option>
                                            <option>3 (average)</option>
                                            <option>4 (good)</option>
                                            <option>5 (amazing)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                     <textarea
                                        name="reviewBody"
                                        className="form-control" 
                                        id="exampleFormControlTextarea1" 
                                        rows="3" 
                                        placeholder="Enter your review here"
                                        value={this.state.reviewBody}
                                        onChange={this.handleInputChange}
                                     >
                                     </textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateVisitedInput">Date Visited</label>
                                    <input 
                                        name="dateVisited"
                                        type="date" 
                                        className="form-control" 
                                        id="dateVisitedInput"
                                        value={this.state.dateVisited}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg"
                                    onClick={this.handleReviewSubmit}
                                >
                                    Submit My Review
                                </button>
                            </form>
                            {this.state.reviewsLoaded ? (
                                <div className="row">
                                    {this.state.reviews.map(review => (
                                    <div className="col-12" key={review._id}>
                                        <div className="card mb-1">
                                            <div className="card-body">
                                                <h2 className="card-title">{review.rating} Stars</h2>
                                                <p className="card-text">{moment(review.date).format('MMMM Do, YYYY')}</p>
                                                <p className="card-text">{review.body}</p>
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={() => this.handleDeleteReview(review._id)}
                                                >
                                                    Delete Review
                                                </button>
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