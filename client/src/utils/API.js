import axios from 'axios';

export default {
    // Gets all restaurants
    getRestaurants: function () {
        return axios.get("/api/restaurants");
    },
    // Gets the restaurant with the given id
    getRestaurant: function (id) {
        return axios.get(`/api/restaurants/${id}`);
    },

    // Gets all dishes
    getDishes: function () {
        return axios.get("/api/dishes");
    },
    // Get the dish with the given id
    getDish: function (id) {
        return axios.get(`/api/dishes/${id}`);
    },

    // Get the reviews with the given dish id
    getDishReviews: function (dishId) {
        return axios.get(`/api/dishes/${dishId}/reviews`);
    },

    //Add a new review
    addReview: function(newReview) {
        return axios.post(`/api/reviews/`, newReview);
    },
    //Add a new review
    deleteReview: function(id) {
        return axios.delete(`/api/reviews/${id}`, id);
    }
};