/*global $, displayAllMovies*/

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

//This function is a simple ajax call to delete a movie from the API
function deleteMovie(id){
    $.ajax({
        url: 'https://ancient-caverns-16784.herokuapp.com/' + id,
        method: 'DELETE',
        dataType: 'json'
    });
}

//This function is a ajax call to post a new movie to the API
function postMovie(formInputs){
     return $.post({
            url: 'https://ancient-caverns-16784.herokuapp.com',
            dataType: 'json',
            data: {
                "title": formInputs[0].value,
                "releaseDate": formInputs[2].value,
                "genre": formInputs[4].value,
                "publisher": formInputs[1].value,
                "imageUrl": formInputs[3].value,
                "description": formInputs[5].value
            }
        });
}