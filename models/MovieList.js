/*global $, displayAllMovies, getTokenFromCookie,getCookiesAsObject, displaySearchResult, displayMoviesPagination*/


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

MovieListView.prototype.deleteMovie = function(id) {
    return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + id,
            headers: {
                'X-Auth-Token': getCookiesAsObject()
            },
            method: 'DELETE'
    });
}

MovieListView.prototype.postMovie = function(formInputs) {
    let empty = 0;
    const element = formInputs[0].children[0];
    for (let i=0; i<element.length; i++) {
        if (formInputs[0].children[0][i].value == '') {
            empty ++;
        }
    }
    if (empty==0) {
        return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies',
            type: 'POST',
            headers: {
                'X-Auth-Token': getCookiesAsObject(),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $('.form-add-movie').serialize()
        });
    }
    else 
        {
            alert('Please fill in all fields.');
        }
    
}



class PaginationView {
    constructor(obj) {
        obj = obj || {};
        this.currentPage = obj.currentPage || null;
        this.nextPage = obj.links.next || null;
        this.prevPage = obj.links.prev || null;
        this.selfPage = obj.links.self || null;
    }
}

// Search: This function is an AJAX call to bring the desired movie
function searchMovie(baseURL, userOption, valueToSearch) {
    return $.getJSON(baseUrl+ "/movies" + userOption + valueToSearch)
    .then(displaySearchResult);
}

function getNextMovies(url) {
    return $.getJSON(url)
    .then(displayMoviesPagination);
}

function getPrevMovies(url) {
    return $.getJSON(url)
    .then(displayMoviesPagination);
}

