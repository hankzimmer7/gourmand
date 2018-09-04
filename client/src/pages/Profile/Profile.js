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

    componentDidMount () {
        console.log("Profile.js this.props: ", this.props)
        if (this.props.loggedIn) {
            this.loadUser();
        } else {
            this.setState({
                redirectTo: '/sign_in'
            })
        }
    }

    loadUser = () => {
        axios.get(`/api/users/${this.props.user.username}`)
        .then(response => {
            if(response.data) {
                console.log(`Response from get /api/users/${this.props.user.username}`, response);
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
                // console.log("Profile.js loadReview api result", response);
                this.setState({ 
                    reviews: response.data,
                    reviewsLoaded: true
                });
            }
            )
        .catch(err => console.log(err));
    };

    // updateUser () {
    //     console.log("Updating user");
    //     console.log("this.props: ", this.props);
    //     if(this.props.user) {
    //         console.log("A user is logged in");

    //         //Get the user's info and store it in Profile's state
    //         axios.get(`/api/users/${this.props.user.username}`)
    //             .then(response => {
    //                 if(response.data) {
    //                     // console.log(`Response from get /api/users/${this.props.user.username}`, response)
    //                     this.setState({
    //                         user:response.data
    //                     });
    //                } else {
    //                     console.log(`No response from get /api/users/${this.props.user.username}`)
    //                }
    //             }
    //         )
    //     } else {
    //         console.log("No user is logged in");
    //         // update the state to redirect to sign in
    //         this.setState({
    //             redirectTo: '/sign_in'
    //         })
    //     }
    // }

    // componentDidUpdate(nextProps) {
    //     if(JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)) // Check if it's a new user, you can also use some unique property, like the ID
    //     {
    //            this.updateUser();
    //     }
    // } 

    render() {

        console.log("Profile.js this.state: ", this.state);
        // console.log("Profile.js this.state.user.length: ", this.state.user.length);

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="content-area">
                    <div className="container">
                        <div className="jumbotron">
                            {/* <h2>Profile Page</h2> */}
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
                                                <h5 className="card-title"><a href={`/restaurants/${review.restaurant._id}/dishes/${review.dish._id}`}>{review.dish.name}</a></h5>
                                                <p><a href={`/restaurants/${review.restaurant._id}`}>{review.restaurant.name}</a></p>
                                                <p className="card-text">{review.rating}/5 Stars 
                                                    <span className="text-muted"> {moment(review.date).format('MMMM Do, YYYY')}</span>
                                                </p>
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