import React, { Component } from 'react';
import API from "../../utils/API";

class Dish extends Component {
    state = {
        dish: [],
        reviews: [],
        dishLoaded: false,
        reviewsLoaded: false,
        reviewRating: '',
        reviewBody: ''
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleReviewSubmit = event => {
        event.preventDefault();
        const newReview = {
            author_id: "need to add",
            dish_id: this.state.dish._id,
            rating: this.state.reviewRating.slice(0,1),
            body: this.state.reviewBody
        }
        console.log("new review: ", newReview);
        // axios
        //     .post('/api/users/login', {
        //         username: this.state.username,
        //         password: this.state.password
        //     })
        //     .then(response => {
        //         if (response.status === 200) {
        //             // update App.js state
        //             this.props.updateUser({
        //                 loggedIn: true,
        //                 user: response.data
        //             })
        //             // update the state to redirect to home
        //             this.setState({
        //                 redirectTo: '/profile'
        //             })
        //         }
        //     }).catch(error => {
        //         console.log('login error: ')
        //         console.log(error);                
        //     })
    }
    
    render() {

        console.log("Dish.js this.state",this.state);
        console.log("Dish.js this.props", this.props);

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
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
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