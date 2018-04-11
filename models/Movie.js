 /*global getCookiesAsObject $*/

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
    // console.log(this);
    return $.getJSON('https://ancient-caverns-16784.herokuapp.com/movies/' + this.id, (movieDetails) => {
        this.description = movieDetails.Description;
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
    return $.ajax({
            url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + this.id,
            method: 'PUT',
            headers: {
                'X-Auth-Token': getCookiesAsObject(),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                "Title": formInputs[0].children[0][0].value || this.title,
                "Year": formInputs[0].children[0][1].value || this.year,
                "Runtime": formInputs[0].children[0][2].value || this.runtime,
                "Genre": formInputs[0].children[0][3].value || this.genre,
                "Country": formInputs[0].children[0][4].value || this.country,
                "Poster": formInputs[0].children[0][5].value || this.poster,
                "imdbRating": formInputs[0].children[0][6].value|| this.imdbRating,
                "Director": formInputs[0].children[0][7].value || this.director,
                "Actors": formInputs[0].children[0][8].value || this.actors,
                "Description": formInputs[0].children[0][9].value || this.description
            }
        });
};


// GetMovie.prototype.updateMovie = function() {
//     console.log(this);
//     return $.ajax({
//             url: 'https://ancient-caverns-16784.herokuapp.com/movies/' + this.id,
//             method: 'PUT',
//             headers: {
//                 'X-Auth-Token': getCookiesAsObject(),
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             data: $('.form-edit-movie').serialize(),
//             succes: function (response) {
//                 console.log(response);
//             }
//         });
// };



