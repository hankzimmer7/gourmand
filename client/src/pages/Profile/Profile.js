import React, { Component } from 'react';

class Profile extends Component {

    state = {
        profile: {}
    };

    componentDidMount () {
        console.log(this.props);
    }

    render() {
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
    
export default Profile;