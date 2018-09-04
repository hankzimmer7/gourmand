import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import API from "../../utils/API";
import moment from 'moment';
import Loader from '../../components/Loader';

class Dish extends Component {
    state = {
        dish: [],
        reviews: [],
        dishLoaded: false,
        reviewsLoaded: false,
        reviewRating: '',
        reviewBody: '',
        dateVisited: '',
        redirectTo: null
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
                console.log("Dish.js loadReview api result", response);
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
            author: this.props.user._id,
            dish: this.state.dish._id,
            restaurant: this.props.match.params.restaurant,
            rating: this.state.reviewRating.slice(0,1),
            body: this.state.reviewBody,
            date: this.state.dateVisited
        }
        console.log("new review: ", newReview);
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

    //When the user clicks the "Delete Dish" button, delete the dish and all associated reviews
    handleDeleteDish = id => {
        console.log("Clicked delete dish for dish Id: ", id)
        API.deleteDish(id)
            .then(response => {
                console.log("Delete dish response: ", response);
                this.setState({
                    redirectTo: `/restaurants/${this.state.dish.restaurant._id}`
                });
                console.log("set state to redirect to restaurant")
            }).catch(error => {
                console.log('Error deleting dish: ')
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

        console.log("Dish.js this.state", this.state);
        console.log("Dish.js this.props", this.props);

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="content-area">
                    <div className="container">
                        <div className ="jumbotron">
                            {this.state.dishLoaded ? (
                                <div>
                                    <div>
                                        <p>
                                            <a href={`/restaurants/${this.state.dish.restaurant._id}`}>
                                                Back to {this.state.dish.restaurant.name}
                                            </a> 
                                        </p>
                                        <h2>{this.state.dish.name}</h2>
                                        <p>
                                            {this.state.dish.description}                                               
                                        </p>
                                        {this.props.loggedIn && (
                                            <div>
                                                {this.props.user.account_type === 'administrator' && (
                                                    <button 
                                                        className="btn btn-primary mb-3"
                                                        onClick={() => this.handleDeleteDish(this.state.dish._id)}
                                                    >
                                                        Delete Dish
                                                    </button>   
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <h3>Reviews</h3>
                                {this.state.reviewsLoaded ? (
                                    <div className="row">
                                        {this.state.reviews.map(review => (
                                        <div className="col-12" key={review._id}>
                                            <div className="card mb-1">
                                                <div className="card-body">
                                                    {review.author ? (
                                                    <h5 className="card-title">{review.author.username}</h5>
                                                ) : (
                                                        <h5 className="card-title"> Deactivated User </h5>
                                                    )}
                                                    <p className="card-text">{review.rating}/5 Stars 
                                                        <span className="text-muted"> {moment(review.date).format('MMMM Do, YYYY')}</span>
                                                    </p>
                                                    <p className="card-text">{review.body}</p>
                                                    {this.props.user && (
                                                        <div>
                                                            {(this.props.userData.account_type === 'administrator') && (
                                                                <button 
                                                                    className="btn btn-primary"
                                                                    onClick={() => this.handleDeleteReview(review._id)}
                                                                    >
                                                                    Delete Review
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Loader />
                                )}                
                                    {this.props.loggedIn ? (
                                        <form className="mb-2">
                                            <h4 className="mt-2">Add your own review:</h4>
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
                                    ) : (
                                        <p>
                                            <a href='/sign_in'>Sign in</a> to add a review
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <Loader />
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    };
};
    
export default Dish;