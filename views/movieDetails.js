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
        console.log(movie);
        $('#movie-title').text(`${movie.title} - Movie Roll`);
        container.append(`

            <h1>${movie.title}</h1><h2><span id="star">&bigstar;</span>${movie.imdbRating}/10</h2></br>
            <ul>
                <li class="separator">${movie.runtime}</li>
                <li class="separator">${movie.genre}</li>
                <li>${movie.country} (${movie.year})</li>
            </ul>
            <img src="${movie.poster}"  class="poster"></img>
            <p id="description" class="left">${movie.description}</p>
            <p class="left"><span class="crew">Director: </span><span class="stars">${movie.director}</span></p>
            <p class="left"><span class="crew">Actors: </span><span class="stars">${movie.actors}</span></p>
            <button id="edit">Edit Article</button>
        `);
        
        $('#edit').on('click', function(){
            editContainer.css('display', 'block');
            $('.labels-edit input[name=Title]').val(movie.title);
            $('.labels-edit input[name=Year]').val(movie.year); 
            $('.labels-edit input[name=Runtime]').val(movie.runtime); 
            $('.labels-edit input[name=Genre]').val(movie.genre); 
            $('.labels-edit input[name=Country]').val(movie.country); 
            $('.labels-edit input[name=Poster]').val(movie.poster); 
            $('.labels-edit input[name=imdbRating]').val(movie.imdbRating); 
            $('.labels-edit input[name=Director]').val(movie.director); 
            $('.labels-edit input[name=Actors]').val(movie.actors); 
            $('.labels-edit input[name=Description]').val(movie.description); 
        });
        
        $('#cancel').on('click', function(){
            editContainer.css('display', 'none');
            deleteFormContents();
        });
        
        $('#approve').unbind('click').bind('click', function(){
            var formInputs = $('#editContainer');
            // console.log('this is formInputs', formInputs[0].children);
            // console.log(movie);
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
        .each(function(){
            this.value = '';
        });
}
