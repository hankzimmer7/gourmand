import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class SignIn extends Component {

    state = {
        username: '',
        password: '',
        message: '',
        redirectTo: null     
    }

    componentDidMount = () => {
        console.log("SignIn.js this.props: ", this.props)
        if (this.props.loggedIn) {
            this.setState({
                redirectTo: '/dish_search'
            })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    //When the user clicks the "Sign In" button
    handleFormSubmit = event => {
        event.preventDefault();

        if (!this.state.username) {
            return (
                this.setState({
                    message: 'Please enter your username'
            }))
        }
        if (!this.state.password) {
            return (
                this.setState({
                    message: 'Please enter your password'
            }))
        }

        axios
            .post('/api/users/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        user: response.data
                    })
                    // update the state to redirect to dish search
                    this.setState({
                        redirectTo: '/dishes_search'
                    })
                }
            }).catch(error => {
                console.log('login error: ', error);
                // Display to the user that there was a login error
                this.setState({
                    message: 'Incorrect username or password'
                });              
            })
    }

    render () {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="content-area">
                    <div className="container sign-in-container">
                        <div className="jumbotron">
                            <h2>Sign In</h2>
                            <p className="text-danger">{this.state.message}</p>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="username" 
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password" 
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-block mb-3" 
                                        value="Log In"
                                        onClick={this.handleFormSubmit}
                                    >
                                        Sign In
                                    </button>
                                    <p className="text-center">Don't have an account?</p>
                                    <a 
                                        href="/create_account"
                                        className="btn btn-primary btn-block" 
                                        value="Create an Account"
                                    >
                                        Create an Account
                                    </a>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    };
};

export default SignIn;