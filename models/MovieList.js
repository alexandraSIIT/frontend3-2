/*global $, displayAllMovies*/
$(onHtmlLoaded);
let baseUrl = "https://ancient-caverns-16784.herokuapp.com";
function onHtmlLoaded(){
    getMoviesList();
}

function getMoviesList(){
    $.getJSON(baseUrl + "/movies?take=10&skip=0").then(displayAllMovies);
}

function MovieListView(obj) {
    this.title = obj.Title || "";
    // this.description = obj.description || "";
    this.imageUrl = obj.Poster || "";
    this.id = obj._id || null;
    this.year = obj.Year || null;
    this.runtime = obj.Runtime || null;
    this.genre = obj.Genre || "";
    this.lang = obj.Language || "";
    this.country = obj.Country || "";
    this.rating = obj.imdbRating || null;
    this.votes = obj.imdbVotes || null;
    this.imdbId = obj.imdbID || null;
    this.type = obj.type || "";
}

function deleteMovie(id){
    $.ajax({
        url: 'https://ancient-caverns-16784.herokuapp.com/' + id,
        method: 'DELETE',
        dataType: 'json'
    });
}

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
        })
}