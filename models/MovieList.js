/*global $, displayAllMovies, getTokenFromCookie,getCookiesAsObject*/


$(onHtmlLoaded);
let baseUrl = 'https://ancient-caverns-16784.herokuapp.com';

//First, we request the movie list from the server
function onHtmlLoaded(){
    getMoviesList();
}

//After the movie list yields a response, we pass it to displayAllMovies in home.js
function getMoviesList(){
    $.getJSON(baseUrl + '/movies?take=10&skip=0').then(displayAllMovies);
}

//This class is for creating movie instances from the movie list that we ajax get above
class MovieListView {
    constructor(obj) {
        obj = obj || {};
        this.id = obj._id || null;
        this.title = obj.Title || "";
        this.year = obj.Year || null;
        this.runtime = obj.Runtime || null;
        this.genre = obj.Genre || "";
        this.lang = obj.Language || "";
        this.country = obj.Country || "";
        this.imageUrl = obj.Poster || "";
        this.rating = obj.imdbRating || null;
        this.votes = obj.imdbVotes || null;
        this.imdbId = obj.imdbID || null;
        this.type = obj.Type || "";
    }
}




// This function is a simple ajax call to delete a movie from the API
function deleteMovie(id){
    return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + id,
            headers: {
                'X-Auth-Token': getCookiesAsObject()
            },
            method: 'DELETE'
    });
}

// This function is a ajax call to post a new movie to the API
function postMovie(formInputs) {
     return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies',
            type: 'POST',
            headers: {
                'X-Auth-Token': getCookiesAsObject(),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $('.form-add-movie').serialize(),
            succes: function (response) {
                console.log(response);
            },
            error: function (response) {
                console.log(response)
            },
            failed: function (response) {
                console.log(response);
            }
     })
}

// Search: This function is an AJAX call to bring the desired movie
function searchMovie(baseURL, userOption, valueToSearch) {
    return $.get(baseUrl+ "/movies" + userOption + valueToSearch)
    .then((e) => {
        console.log(e);
    });
  
}
