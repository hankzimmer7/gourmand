import React, { Component } from 'react';

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
        console.log('sign-up-form, username: ');
        console.log(this.state.username);
        console.log('sign-up-form, password: ');
        console.log(this.state.password);
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