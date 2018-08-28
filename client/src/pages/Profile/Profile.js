import React, { Component } from 'react';

class Profile extends Component {

    state = {
        profile: {}
    };

    render() {
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Profile Page</h2>
                        <h3>Name</h3>
                    </div>
                </div>
            </div>
        );
    }
}
    
export default Profile;