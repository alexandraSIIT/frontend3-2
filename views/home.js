/*global $, MovieListView, deleteMovie, getMoviesList, postMovie*/

$(document).ready(function() {
    const baseURL = "https://ancient-caverns-16784.herokuapp.com/";

    const registerBtn = $('#register');
    const registerForm = $('#registerForm');
    registerBtn.click(function registerFormAppear(){
       registerForm.addClass('show').removeClass('hide');
    });
    
    const userName = $("[name=Username]");
    const password = $("[name=Password]");
    const registerSubmitBtn = $('#register-submit');
    
    registerSubmitBtn.click(hideRegisterForm);
    registerSubmitBtn.click(registerSubmitClick);
    
    const logOutBtn = $('#log-out');
    logOutBtn.click(onClickLogOut);
// This function recalls the getCookiesAsObject for the const authToken to have the 
// current token value saved in the cookies.
// Also calls logOutRequest function
function onClickLogOut(){
    logOutBtn.addClass('hide').removeClass('show');
    const authToken= getCookiesAsObject();
    logOutRequest(baseURL,authToken);
    deleteToken();
};

// This function deletes the token from cookie
    function deleteToken() {
    document.cookie = "token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

}

// This function is called when clicking the submit button
function registerSubmitClick(){
    Registering(baseURL, userName, password).then(setCookie);
}

// This function prevents the page from refreshing after submit button click.
// Also it hides the register form.
function hideRegisterForm(event){
    event.preventDefault();
    registerForm.addClass('hide').removeClass('show');
    logOutBtn.addClass('show').removeClass('hide');
    
}
});

// This function sets the token's value as a cookie "token=tokenValue"
function setCookie(response){
    const accessToken = response.accessToken;
    document.cookie = "token=" + accessToken;
}

// This function takes the token that was previously saved in cookies
function getCookiesAsObject() {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split("; ");
    const cookies = {};
    cookiesArray.forEach(function(c) {
        const cookie = c.split("=");
        const key = cookie[0]; 
        const value = cookie[1];
        cookies[key] = value;
    });
    const authToken = cookies.token;
    return authToken;
} 



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
                <img class="poster-small" src="${movie.imageUrl}" alt="${movie.title}"></img></br>
                <h3><a target="_blank" href="/frontend3-2/pages/movieDetails.html?movieId=${movie.id}">${movie.title} (${movie.year})</a></h3>
                <div>Type: ${movie.type}</div>
                <div>${movie.runtime} - ${movie.genre}</div>
                <div>Rating: ${movie.rating} / 10 - (${movie.votes} votes)</div>
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