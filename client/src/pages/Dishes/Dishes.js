import React, { Component } from 'react';
import API from "../../utils/API";
import Searchbar from '../../components/Searchbar';

class Dishes extends Component {
    state = {
        dishes: [],
        googlePlacesApiKey: "AIzaSyAuoNJE7m_i1c1zl5H5cw3cXMRDw6XFve8",
    };

      componentDidMount() {
        this.loadDishes();
    };
    
    loadDishes = () => {
        API.getDishes()
            .then(res =>
            this.setState({ dishes: res.data})
            )
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            
            <div className="container">
                <h2>Dishes Page</h2>
                <Searchbar />
                <div className ="jumobotron">

                    {this.state.dishes.length ? (
                    <div className="row">
                        {this.state.dishes.map(dish => (
                            <div className="col-12" key={dish._id}>
                                <div className="card mb-1">
                                    <div className="card-body">
                                        <h2 className="card-title"><a href={"/restaurants/" + dish._id}>{dish.name}</a></h2>
                                        <p className="card-text">{dish.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : (
                    <h3>No Results to Display</h3>
                    )}                
                </div>
            </div>

        );
    };
};


    
export default Dishes;