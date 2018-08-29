import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {

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

        //Check if the username is valid
        axios.get(`/api/users/${this.state.username}`)
        .then(response => {
            if(response.data) {
                const { username, password} = response.data;
                    //Check the username and password
                if(username === this.state.username && password === this.state.password) {
                    console.log("password is correct");
                    alert("Password is correct!");
               } else {
                   console.log("Password incorrect!");
                   alert("Incorrect password");              
               };
            } else {
                console.log("The username is invalid")
                alert("Invalid username");
            }
        });
    }

    render () {
        return (
            <div className="content-area">
                <div className="container">
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
                            <div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    value="Log In"
                                    onClick={this.handleFormSubmit}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
};

export default SignIn;