import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class SignIn extends Component {

    state = {
        username: "",
        password: "",
        redirectTo: null     
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
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
                        redirectTo: '/profile'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);                
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
                            <form action="/login" method="post">
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