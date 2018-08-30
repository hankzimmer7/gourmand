import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Profile extends Component {

    state = {
        loggedIn: false,
        user: []
    };

    componentDidMount () {
        console.log("this.props")
        console.log(this.props);
    }

    updateUser () {
        console.log("Updating user");
        console.log("this.props:");
        console.log(this.props);

        if(this.props.user) {
            console.log("A user is logged in");
        } else {
            console.log("No user is logged in");
        }
    }

    componentDidUpdate(nextProps) {
        if(JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)) // Check if it's a new user, you can also use some unique property, like the ID
        {
               this.updateUser();
        }
    } 

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/sign_in" />
        } else {
            return (
                <div className="content-area">
                    <div className="container">
                        <div className="jumbotron">
                            <h2>Profile Page</h2>
                            <h3>{this.props.user && this.props.user.username}</h3>
                            <h3>{this.props.user && (this.props.user.city, this.props.user.state)}</h3>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
    
export default Profile;