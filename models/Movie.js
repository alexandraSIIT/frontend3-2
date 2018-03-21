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

GetMovie.prototype.getMovieDetails = function(){
    //this is the GetMovie object instance
    var that = this;
    return $.getJSON('https://ancient-caverns-16784.herokuapp.com/movies/' + this.id, function(movieDetails) {
        that.description = movieDetails.description;
        that.genre = movieDetails.Genre;
        that.poster = movieDetails.Poster;
        that.country = movieDetails.Country;
        that.year = movieDetails.Year;
        that.title = movieDetails.Title;
        that.id = movieDetails._id;
        });
};

GetMovie.prototype.updateMovie = function(formInputs){
    return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + this.id,
            dataType: 'json',
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