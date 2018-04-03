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
        this.released = movieDetails.Released;
        this.runtime = movieDetails.Runtime;
        this.director = movieDetails.Director;
        this.writer = movieDetails.Writer;
        this.actors = movieDetails.Actors;
        this.language = movieDetails.Language;
        this.awards = movieDetails.Awards;
        this.ratings = movieDetails.Ratings;
        this.imdbRating = movieDetails.imdbRating;
    });
};

GetMovie.prototype.updateMovie = (formInputs) => {
    return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + this.id,
            
            method: 'PUT',
            data: {
                "title": formInputs[0].value || this.title,
                "year": formInputs[2].value || this.year,
                "genre": formInputs[4].value || this.genre,
                "country": formInputs[1].value || this.country,
                "poster": formInputs[3].value || this.poster,
                "description": formInputs[5].value || this.description
            }
        });
};
