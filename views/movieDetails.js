/*global $, GetMovie, location*/

$(onHtmlLoaded);

function onHtmlLoaded(){
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
        console.log(movie);
        container.append(`
            <h1>${movie.title}</h1><span>${movie.imdbRating}</span></br>
            <p>genre:${movie.runtime}</p>
            <p>genre:${movie.genre}</p>
            <img src="${movie.poster}" alt="${movie.title}"></img>
            <p>${movie.description}</p>
            <span>${movie.country} (${movie.year})</span></br>
            <p>Director: ${movie.director}</p>
            <p>Actors: ${movie.actors}</p>
            <p>${movie.language}</p>
            
            <button id="edit">Edit Article</button>
            
        `);
                         
        $('#edit').on('click', function(){
            editContainer.css('display', 'block');
        });
        
        $('#cancel').on('click', function(){
            editContainer.css('display', 'none');
            deleteFormContents();
        });
        
        $('#approve').on('click', function(){
            var formInputs = $('#editContainer').children('input, textarea');
            movie.updateMovie(formInputs).then(function(){
                container.html('');
                movie.getMovieDetails().then(displayPage);
                editContainer.css('display', 'none');
            });
        });
    }
}

function deleteFormContents() {
    $('#editContainer')
        .children('input, textarea')
        .each(function(){
            this.value = '';
        });
}