$(onHtmlLoaded)
function onHtmlLoaded(){
    var editContainer = $('#editContainer');
    var container = $('#container');
    var movie = new GetMovie();
    movie._id = getUrlParameter('movieId');
    movie.getMovieDetails().then(displayPage);
    
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    function displayPage(){
        var date = new Date(movie.year);
        container.append('<img src="' + movie.Poster + '" alt="' + movie.Title + '"></img>' +
                         '<h3>' + movie.title + '</h3><span>genre:' + movie.Genre + '</span>' +
                         '<p>' + movie.description + '</p>' +
                         '<span>Made in ' + movie.Country + ' on ' + date + '</span></br>' +
                         '<button id="edit">Edit Article</button>');
                         
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