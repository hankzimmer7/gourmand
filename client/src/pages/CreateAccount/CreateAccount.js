import React, { Component } from 'react';
import axios from 'axios';

class CreateAccount extends Component {

    state = {
        username: "",
        password: ""      
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('sign-up-form, username: ');
        console.log(this.state.username);
        console.log('sign-up-form, password: ');
        console.log(this.state.password);
        axios.post('/api/login/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log('successful signup')
                    this.setState({
                        redirectTo: '/login'
                    })
                } else {
                    console.log('Sign-up error');
                }
            }).catch(error => {
                console.log('Sign up server error: ');
                console.log(error);
            })
    }

    render() {
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Create an Account</h2>
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
                            <div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    value="Log In"
                                    onClick={this.handleFormSubmit}
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
        )
    };
};

export default CreateAccount;