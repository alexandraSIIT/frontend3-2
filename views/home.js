/*global $*/
function displayAllMovies(x){
    let createContainer = $('#createContainer');
    let list = $('#movieList');
    for (let i=0; i<x.results.length; i++){
        let movie = new MovieListView(x.results[i]);
        list.append('<li data-idcode="' + movie.id + '">' +
                        '<img src=' + movie.imageUrl + ' alt="' + movie.title + '"></img></br>' +
                        '<a target="_blank" href="https://ancient-caverns-16784.herokuapp.com/movies/' + movie.id + '">' +movie.title + '</a>' +
                        // '<div>' + movie.description + '</div>' +
                        '<button class="del">Delete Movie</button>' +
                        '</li></br>');
    }

    $('.del').on('click', function(){
        deleteMovie($(this.closest('li')).data('idcode'));
        list.html('');
        getMoviesList();
    });

    $('.add').on('click', function(){
        createContainer.css('display', 'block');
    });
    
    $('#cancel').on('click', function(){
        createContainer.css('display', 'none');
        deleteFormContents();
    })
    
    $('#approve').on('click', function(){
        var formInputs = $('#createContainer').children('input, textarea');
        postMovie(formInputs).then(function(){
            list.html('');
            getMoviesList();
        });
    })
}

function deleteFormContents() {
    $('#createContainer')
        .children('input, textarea')
        .each(function(){
            this.value = '';
        })
}