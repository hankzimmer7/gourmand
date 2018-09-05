import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from "../../utils/API";
import axios from 'axios';
import moment from 'moment';
import Loader from '../../components/Loader';

class Profile extends Component {

    state = {
        user: [],
        reviews: [],
        userLoaded: false,
        reviewsLoaded: false,
        redirectTo: null
    };

    componentDidMount = () => {
        if (this.props.loggedIn) {
            this.loadUser();
        } else {
            this.setState({
                redirectTo: '/sign_in'
            })
        }
    }

    //Load the current user information
    loadUser = () => {
        axios.get(`/api/users/${this.props.user.username}`)
        .then(response => {
            if(response.data) {
                this.setState({
                    user:response.data,
                    userLoaded: true
                });
                this.loadReviews();
           } else {
                console.log(`No response from get /api/users/${this.props.user.username}`)
           }
        })
    }

    //Load the reviews for the current user
    loadReviews = () => {
        const userId = this.state.user._id;
        API.getUserReviews(userId)
            .then(response => {
                this.setState({ 
                    reviews: response.data,
                    reviewsLoaded: true
                });
            }
            )
        .catch(err => console.log(err));
    };

    //When the user clicks the "Delete Review" button, delete the review
    handleDeleteReview = id => {
        API.deleteReview(id)
            .then(res => {
                this.loadReviews();
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
                        <div className="jumbotron">
                            {this.state.userLoaded ? (
                                <div>
                                <h2>{this.state.user.username}</h2>
                                {this.state.user.city && <span>{this.state.user.city}, </span>}
                                {this.state.user.state && <span>{this.state.user.state}</span>}
                                <h4>My Reviews</h4>
                                </div>

                            ) : (
                            <Loader />
                            )}
                            {this.state.reviewsLoaded ? (
                                <div className="row">
                                    {this.state.reviews.map(review => (
                                    <div className="col-12" key={review._id}>
                                        <div className="card mb-1">
                                            <div className="card-body">
                                                <h3 className="card-title">
                                                    <a href={`/restaurants/${review.restaurant._id}/dishes/${review.dish._id}`}>
                                                        {review.dish.name}
                                                    </a>
                                                </h3>
                                                <p><a href={`/restaurants/${review.restaurant._id}`}>{review.restaurant.name}</a></p>
                                                <p className="card-text">{review.rating}/5 Stars 
                                                    <span className="text-muted"> {moment(review.date).format('MMMM Do, YYYY')}</span>
                                                </p>
                                                <p className="card-text">{review.body}</p>
                                                <button 
                                                    className="btn"
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
                                <Loader />
                            )}           
                        </div>
                    </div>
                </div>
            );
        }
    }    
}
    
export default Profile;