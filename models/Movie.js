function Movie() {
    this.id = null;
    this.title = "";
    this.details = "";
    this.imageUrl = "";
}

Movie.prototype.getMovieInfo = function() {
    var that = this;
    return $.get('https://ancient-caverns-16784.herokuapp.com/' + this.id, function(movieInfo) {
        that.id = movieInfo._id;
        that.title = movieInfo.title;
        that.details = movieInfo.description;
        that.userId = movieInfo.imageUrl;
        console.log(movieInfo.title);
        console.log(movieInfo.description);
        console.log(movieInfo.imageUrl);
        console.log(movieInfo._id);
    });
}