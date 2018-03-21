/*global $, MovieListView, deleteMovie, getMoviesList, postMovie*/
function displayAllMovies(x){
    let createContainer = $('#createContainer');
    let listElement = $('#movieList');
    let results = x.results;
    for (let i=0; i<results.length; i++){
        let movie = new MovieListView(results[i]);
        listElement.append('<li data-idcode="' + movie.id + '">' +
                        '<img src=' + movie.imageUrl + ' alt="' + movie.title + '"></img></br>' +
                        '<a target="_blank" href="https://ancient-caverns-16784.herokuapp.com/movies/' + movie.id + '">' +movie.title + '</a>' +
                        // '<div>' + movie.description + '</div>' +
                        '<button class="del">Delete Movie</button>' +
                        '</li></br>');
    }

    $('.del').on('click', () => {
        deleteMovie($(this.closest('li')).data('idcode'));
        listElement.html('');
        getMoviesList();
    });

    $('.add').on('click', () => {
        createContainer.css('display', 'block');
    });
    
    $('#cancel').on('click', () => {
        createContainer.css('display', 'none');
        deleteFormContents();
    });
    
    $('#approve').on('click', () => {
        var formInputs = $('#createContainer').children('input, textarea');
        postMovie(formInputs).then(() => {
            listElement.html('');
            getMoviesList();
        });
    });
}

function deleteFormContents() {
    $('#createContainer')
        .children('input, textarea')
        .each(() => {
            this.value = '';
        });
}