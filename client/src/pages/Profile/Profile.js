import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

class Profile extends Component {

    state = {
        user: [],
        userLoaded: false,
    };

    componentDidMount () {
        // console.log("Profile.js this.props: ", this.props)
        this.loadUser();
    }

    loadUser = () => {
        axios.get(`/api/users/${this.props.user.username}`)
        .then(response => {
            if(response.data) {
                console.log(`Response from get /api/users/${this.props.user.username}`, response)
                this.setState({
                    user:response.data,
                    userLoaded: true
                });
           } else {
                console.log(`No response from get /api/users/${this.props.user.username}`)
           }
        })
    }

    // updateUser () {
    //     console.log("Updating user");
    //     console.log("this.props: ", this.props);
    //     if(this.props.user) {
    //         console.log("A user is logged in");

    //         //Get the user's info and store it in Profile's state
    //         axios.get(`/api/users/${this.props.user.username}`)
    //             .then(response => {
    //                 if(response.data) {
    //                     console.log(`Response from get /api/users/${this.props.user.username}`, response)
    //                     this.setState({
    //                         user:response.data
    //                     });
    //                } else {
    //                     console.log(`No response from get /api/users/${this.props.user.username}`)
    //                }
    //             }
    //         )
    //     } else {
    //         console.log("No user is logged in");
    //     }
    // }

    // componentDidUpdate(nextProps) {
    //     if(JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)) // Check if it's a new user, you can also use some unique property, like the ID
    //     {
    //            this.updateUser();
    //     }
    // } 

    render() {

        console.log("Profile.js this.state: ", this.state);
        console.log("Profile.js this.state.user.length: ", this.state.user.length);
        return (
            <div className="content-area">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Profile Page</h2>
                        {this.state.userLoaded ? (
                            <div>
                            <h3>Username: {this.state.user.username}</h3>
                            {this.state.user.city && <h3>City: {this.state.user.city}</h3>}
                            {this.state.user.state && <h3>State: {this.state.user.state}</h3>}
                            </div>
                            
                         ) : (
                         <Loader />
                         )}
                    </div>
                </div>
            </div>
        );
    }
}
    
export default Profile;