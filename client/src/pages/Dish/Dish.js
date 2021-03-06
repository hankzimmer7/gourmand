import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import API from "../../utils/API";
import moment from 'moment';
import Loader from '../../components/Loader';

class Dish extends Component {
    state = {
        dish: [],
        averageRating: '',
        dishLoaded: false,
        reviewRating: '',
        reviewBody: '',
        dateVisited: '',
        reviewErrorMessage: '',
        redirectTo: null
    };

    componentDidMount() {
        this.loadDish();
    };
    
    //Load the dish an save it in the component state
    loadDish = () => {
        const id = this.props.match.params.dish;
        API.getDish(id)
            .then(response => {
                this.setState({ 
                    dish: response.data,
                    dishLoaded: true
                }, () => {
                    // If the dish has reviews, caluclate the average rating
                    if (this.state.dish.reviews.length) {
                        this.calculateAverageRating();
                    }
                });
            }
            )
        .catch(err => console.log(err));
    };

    //Calculates the average dish rating based off of the reviews
    calculateAverageRating = () => {
        let totalRating = this.state.dish.reviews.reduce(function (accumulator, review) {
            return accumulator + review.rating;
            }, 0);
        let newRating = (Math.round(totalRating/this.state.dish.reviews.length*10)/10).toFixed(1);
        this.setState({ averageRating: newRating})
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

        if (!this.state.reviewRating) {
            return (
                this.setState({
                    reviewErrorMessage: 'Please enter a review rating'
            }))
        }
        if (!this.state.dateVisited) {
            return (
                this.setState({
                    reviewErrorMessage: 'Please the date you visited the restaurant'
            }))
        }
        const newReview = {
            author: this.props.user._id,
            dish: this.state.dish._id,
            restaurant: this.props.match.params.restaurant,
            rating: this.state.reviewRating.slice(0,1),
            body: this.state.reviewBody,
            date: this.state.dateVisited
        }
        API.addReview(newReview)
            .then(response => {
                this.setState({
                    reviewRating: '',
                    reviewBody: '',
                    dateVisited: '',
                    reviewErrorMessage: ''
                })
                this.loadDish();
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
                this.setState({
                    redirectTo: `/restaurants/${this.state.dish.restaurant._id}`
                });
            }).catch(error => {
                console.log('Error deleting dish: ')
                console.log(error);   
            })
    }

    //When the user clicks the "Delete Review" button, delete the review
    handleDeleteReview = id => {
        API.deleteReview(id)
            .then(response => {
                this.loadDish();
            }).catch(error => {
                console.log('Error deleting review: ')
                console.log(error);   
            })
    }
    
    render() {

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
                                        <p>
                                            {(this.state.dish.reviews.length>0) && `${this.state.averageRating} Stars, `}
                                            {this.state.dish.reviews.length} Reviews
                                        </p>
                                        {this.props.loggedIn && (
                                            <div>
                                                {this.props.user.account_type === 'administrator' && (
                                                    <button 
                                                        className="btn mb-3"
                                                        onClick={() => this.handleDeleteDish(this.state.dish._id)}
                                                    >
                                                        Delete Dish
                                                    </button>   
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <h3>Reviews</h3>
                                    <div className="row">
                                        {this.state.dish.reviews.map(review => (
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
                                                    {this.props.loggedIn && (
                                                        <div>
                                                            {(this.props.user.account_type === 'administrator') && (
                                                                <button 
                                                                    className="btn"
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
                                    {this.props.loggedIn ? (
                                        <form className="mb-2">
                                            <h4 className="mt-2">Add your own review:</h4>
                                            <p className="text-danger">{this.state.reviewErrorMessage}</p>
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
                                                className="btn btn-lg"
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