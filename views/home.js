/*global $, MovieListView, deleteMovie, getMoviesList, postMovie*/

//Function below renders the movie list "list" in a user friendly format
//Then it attaches some event listeners for interface buttons
function displayAllMovies(list){
    let createContainer = $('#createContainer');
    let listElement = $('#movieList');
    let results = list.results;
    //Goes through each inividual movie and appends it to the listElement
    for (let i=0; i<results.length; i++){
        let movie = new MovieListView(results[i]);
        listElement.append(
            `<li data-idcode="${movie.id}">
                <img src="${movie.imageUrl}" alt="${movie.title}"></img></br>
                <h3><a target="_blank" href="https://ancient-caverns-16784.herokuapp.com/movies/?movieId=${movie.id}">${movie.title} (${movie.year})</a></h3>
                <div>Type: ${movie.type}</div>
                <div>${movie.runtime} - ${movie.genre}</div>
                <div>Rating: ${movie.rating} - (${movie.votes} votes)</div>
                <button class="del">Delete Movie</button>
            </li></br>`
        );
    }
    
    //Below are the event listeners for the delete, add, cancel and approve buttons
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

//This function resets the add movie form
function deleteFormContents() {
    $('#createContainer')
        .children('input, textarea')
        .each(() => {
            this.value = '';
        });
}