import axios from 'axios';

export default {

    //---------------Restaurant Routes---------------

    // Gets all restaurants
    getRestaurants: function () {
        return axios.get("/api/restaurants");
    },
    // Gets the restaurant with the given id
    getRestaurant: function (id) {
        return axios.get(`/api/restaurants/${id}`);
    },

    //---------------Dish Routes---------------

    // Gets all dishes
    getAllDishes: function () {
        return axios.get("/api/dishes");
    },
    // Gets all dishes for the given restaurant
    getRestaurantDishes: function (restaurantId) {
        return axios.get(`/api/restaurants/${restaurantId}/dishes`);
    },
    // Get the dish with the given id
    getDish: function (id) {
        return axios.get(`/api/dishes/${id}`);
    },
    //Add a new dish
    addDish: function (newDish) {
        return axios.post(`/api/dishes/`, newDish);
    },
    //Add a new dish
    deleteDish: function (dishId) {
        return axios.delete(`/api/dishes/${dishId}`, dishId);
    },

    //---------------Review Routes---------------

    // Get the reviews with the given dish id
    getDishReviews: function (dishId) {
        return axios.get(`/api/dishes/${dishId}/reviews`);
    },

    //Add a new review
    addReview: function (newReview) {
        return axios.post(`/api/reviews/`, newReview);
    },
    //Add a new review
    deleteReview: function (id) {
        return axios.delete(`/api/reviews/${id}`, id);
    }
};