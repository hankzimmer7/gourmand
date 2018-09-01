import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'
import axios from 'axios';

class CreateAccount extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        usernameMessage: 'Please choose a unique username',
        validUsername: false,
        // redirectTo: null 
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
        // console.log("CreateAccount.js sending a get request to /api/users");
        axios.get(`/api/users/${this.state.username}`)
        .then(response => {
            if(response.data) {
                // console.log("There is already a user by that name");
           } else {
            //    console.log("There is no user by that name");
            //    console.log('CreateAccount.js is about to post to /api/users')
               axios.post('/api/users/', {
                   username: this.state.username,
                   password: this.state.password
               })
                   .then(response => {
                       if (response.data) {
                        //    console.log('response from post request to /api/users', response);
                        //    this.setState({
                        //        redirectTo: '/profile'
                        //    })

                           //Login to the newly created account
                        //    console.log('CreateAccount.js is about to post to /api/users/login');
                           axios
                               .post('/api/users/login', {
                                   username: this.state.username,
                                   password: this.state.password
                               })
                               .then(response => {
                                //    console.log('CreateAccount.js got the following response after posting to api/users/login: ', response);
                                //    console.log('response.data is:', response.data);
                                   if (response.status === 200) {
                                       // update App.js state
                                       this.props.updateUser({
                                           loggedIn: true,
                                           user: response.data
                                       })
                                   }
                               }).catch(error => {
                                   console.log('login error: ')
                                   console.log(error);                
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

        // console.log("CreateAccount.js this.state:", this.state);

        // if (this.state.redirectTo) {
        //     return <Redirect to={{ pathname: this.state.redirectTo }} />
        // } else {
            return (
                <div className="content-area">
                    <div className="container create-account-container">
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
                                        disabled={!this.state.validUsername}
                                        >
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
            )
        // }
    };
};

export default CreateAccount;