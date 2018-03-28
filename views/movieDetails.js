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
            <img src="${movie.poster}" alt="${movie.title}"></img>
            <h3>${movie.title}</h3><span>genre:${movie.genre}</span>
            <p>${movie.description}</p>
            <span>${movie.country} (${movie.year})</span></br>
            <p>Released: ${movie.released}</p>
            <p>${movie.director}</p>
            <p>${movie.writer}</p>
            <p>${movie.actors}</p>
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