import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class CreateAccount extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        usernameMessage: 'Please choose a unique username',
        usernameMessageStyle: 'form-text',
        errorMessage: '',
        validUsername: false,
        redirectTo: null 
    }

    componentDidMount = () => {
        if (this.props.loggedIn) {
            this.setState({
                redirectTo: '/dish_search'
            })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        //Update the username and password
        this.setState({
          [name]: value
        }, () => {
            
            if(this.state.username) {

                //Check if the username is already taken and update state appropriately
                axios.get(`/api/users/${this.state.username}`)
                .then(response => {
                    if(response.data) {
                        this.setState({
                            usernameMessage: 'Username already taken',
                            usernameMessageStyle: 'form-text text-warning',
                            validUsername: false
                        })
                   } else {
                       this.setState({
                           usernameMessage: "Username available",
                           usernameMessageStyle: 'form-text text-success',
                           validUsername: true
                        })
                   }
                })
            } else {
                this.setState({
                    usernameMessage: "Please enter a unique username",
                    usernameMessageStyle: 'form-text',
                    validUsername: true
                 })
            }            
        });
    };

    //When the user clicks the "Create an Account" button
    handleFormSubmit = event => {
        event.preventDefault();

        if (!this.state.username) {
            return (
                this.setState({
                    errorMessage: 'Please enter a username'
            }))
        } else
        if (!this.state.password) {
            return (
                this.setState({
                    errorMessage: 'Please enter a password'
            }))
        } else
        if (!this.state.confirmPassword) {
            return (
                this.setState({
                    errorMessage: 'Please confirm your password'
            }))
        } else
        if (this.state.password !== this.state.confirmPassword) {
            return (
                this.setState({
                    errorMessage: 'The passwords entered do not match',
                    password: '',
                    confirmPassword: ''
            }))
        }

        //Check if there is already a user with that username
        axios.get(`/api/users/${this.state.username}`)
        .then(response => {
            //If the username is already taken
            if(response.data) {
                // Should never reach this, but just in case, return an error
                return (
                    this.setState({
                        errorMessage: 'That username is already taken',
                        username: ''
                }))
           } else {
               axios.post('/api/users/', {
                   username: this.state.username,
                   password: this.state.password
               })
                   .then(response => {
                       if (response.data) {

                           //Login to the newly created account
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
                                       window.location.reload();
                                   }
                               }).catch(error => {
                                   console.log('login error: ', error)            
                               })

                       } else {
                           console.log('Sign-up error');
                       }
                   }).catch(error => {
                       console.log('Sign up server error: ', error);
                   })
           };
        });
    };

    render() {

        // console.log("CreateAccount.js this.state:", this.state);

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="content-area">
                    <div className="container create-account-container">
                        <div className="jumbotron">
                            <h2>Create an Account</h2>
                            <p className="text-danger">{this.state.errorMessage}</p>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <small 
                                        id="usernameHelp" 
                                        className={this.state.usernameMessageStyle}>       
                                            {this.state.usernameMessage}
                                    </small>
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
                                <div className="form-group">
                                    <label htmlFor="passwordConfirm">Confirm Password:</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="confirmPassword" 
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div>
                                    <button 
                                        type="submit" 
                                        className="btn" 
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
        }
    };
};

export default CreateAccount;