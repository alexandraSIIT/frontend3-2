/*global $, GetMovie, location*/


$(document).ready(function(){
    var editContainer = $('#editContainer');
    var container = $('#container');
    var movie = new GetMovie();
    movie.id = getUrlParameter('movieId');
    movie.getMovieDetails().then(displayPage);
    
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    function displayPage(){
        // var date = new Date(movie.year);
        
        container.append(`
            <h1>${movie.title}</h1><h2><span id="star">&bigstar;</span>${movie.imdbRating}/10</h2></br>
            <ul>
                <li class="separator">${movie.runtime}</li>
                <li class="separator">${movie.genre}</li>
                <li>${movie.country} (${movie.year})</li>
            </ul>
            <img src="${movie.poster}" alt="${movie.title}" class="poster"></img>
            <p id="description" class="left">${movie.description}</p>
            <p class="left"><span class="crew">Director: </span><span class="stars">${movie.director}</span></p>
            <p class="left"><span class="crew">Actors: </span><span class="stars">${movie.actors}</span></p>
            <button id="edit hide">Edit Article</button>
        `);
                         
        $('#edit').on('click', function(){
            editContainer.css('display', 'block');
        });
        
        $('#cancel').on('click', function(){
            editContainer.css('display', 'none');
            deleteFormContents();
        });
        
        $('#approve').unbind('click').bind('click', function(){
            var formInputs = $('#editContainer').children('input, textarea');
            console.log(movie);
            movie.updateMovie(formInputs).then(function(){
                container.html('');
                movie.getMovieDetails().then(displayPage);
                editContainer.css('display', 'none');
            });
        });
    }
});

function deleteFormContents() {
    $('#editContainer')
        .children('input, textarea')
        .each(function(){
            this.value = '';
        });
}
