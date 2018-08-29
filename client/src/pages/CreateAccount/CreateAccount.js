import React, { Component } from 'react';
import axios from 'axios';

class CreateAccount extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        usernameMessage: 'Please choose a unique username',
        validUsername: false    
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        //Update the username and password
        this.setState({
          [name]: value
        }, () => {
            //Check if the username is already taken and update state appropriately
            axios.get(`/api/users/${this.state.username}`)
            .then(response => {
                if(response.data) {
                    this.setState({
                        usernameMessage: 'Username already taken',
                        validUsername: false
                    })
               } else {
                   this.setState({
                       usernameMessage: "Username available",
                       validUsername: true
                    })
               }
            })
        });
    };

    //When the user clicks the "Create an Account" button
    handleFormSubmit = event => {
        event.preventDefault();
        //Check if there is already a user with that username
        axios.get(`/api/users/${this.state.username}`)
        .then(response => {
            if(response.data) {
                console.log("There is already a user by that name");
           } else {
               console.log("There is no user by that name");
               axios.post('/api/users/', {
                   username: this.state.username,
                   password: this.state.password
               })
                   .then(response => {
                       if (response.data) {
                           this.setState({
                               redirectTo: '/dishes'
                           })
                       } else {
                           console.log('Sign-up error');
                       }
                   }).catch(error => {
                       console.log('Sign up server error: ');
                       console.log(error);
                   })
           };
        });
    };

    render() {

        const validUsername = this.state.validUsername;

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
                                <small id="usernameHelp" className="form-text">{this.state.usernameMessage}</small>
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
                                    disabled={!validUsername}
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