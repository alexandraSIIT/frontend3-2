 /*global $*/

function GetMovie(){
    this.id = null;
    this.title = '';
    this.year = 0;
    this.genre = '';
    this.country = '';
    this.poster = '';
    this.description = '';
}

GetMovie.prototype.getMovieDetails = function() {
    //this is the GetMovie object instance
    // var that = this;
    console.log(this);
    return $.getJSON('https://ancient-caverns-16784.herokuapp.com/movies/' + this.id, (movieDetails) => {
        this.description = movieDetails.Plot;
        this.genre = movieDetails.Genre;
        this.poster = movieDetails.Poster;
        this.country = movieDetails.Country;
        this.year = movieDetails.Year;
        this.title = movieDetails.Title;
        this.id = movieDetails._id;
        this.runtime = movieDetails.Runtime;
        this.director = movieDetails.Director;
        this.actors = movieDetails.Actors;
        this.language = movieDetails.Language;
        this.ratings = movieDetails.Ratings;
        this.imdbRating = movieDetails.imdbRating;
    });
};

GetMovie.prototype.updateMovie = function(formInputs) {
    console.log(this);
    return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + this.id,
            method: 'PUT',
            headers: {
                'X-Auth-Token': '40c8Oq4jvRVp7LLVp6G_SU2bcLh8rA_x',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                "Title": formInputs[0].value || this.title,
                "Year": formInputs[2].value || this.year,
                "Genre": formInputs[4].value || this.genre,
                "Country": formInputs[1].value || this.country,
                "Poster": formInputs[3].value || this.poster,
                "Description": formInputs[5].value || this.description
            }
        });
};
