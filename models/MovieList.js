function Movies() {
}

Movies.prototype.getAll = function() {
    return $.get('https://ancient-caverns-16784.herokuapp.com/');
}