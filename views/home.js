/*global $, MovieListView, login deleteMovie, getMoviesList, postMovie, searchMovie, response, LoggingIn, baseURL, userName, passWord, getCookieAsObject, getNextMovies,getPrevMovies,PaginationView*/


$(document).ready(function(){
    const baseURL = "https://ancient-caverns-16784.herokuapp.com/";
    const logOutBtn = $('#log-out');
    
    const registerLogIn = $('#register-logIn');
    SyncHtmlPages(registerLogIn,logOutBtn);
    const registerBtn = $('#register');
    const registerForm = $('#registerFormCont');
    registerBtn.click(function registerFormAppear(){
        registerForm.addClass('show').removeClass('hide');
        showingPassword();
        exitRegisterForm(registerForm);
    });
    
    const logInBtn = $('#log-in');
    logInBtn.click(function LogInForm(){
        const loginForm = $("#login");
        loginForm.addClass('show').removeClass('hide');
        exitLogInForm(loginForm);
    });
    
    const logInSubmit = $('#logIn-submit');
    logInSubmit.click(LogInSubmitClick);

    
    function LogInSubmitClick(event){
        const username = $("#LogInForm [ name=Username]");
        const password = $("#LogInForm [ name=Password]");
        const logInbtn = $("#login");
        const allowedChr = /[^a-z0-9]/gi;
        event.preventDefault();
        if (validateUsername(allowedChr, username) && validatePassword(allowedChr,password)){
        loggingIn(baseURL, username, password).then(function(response){
            resetForm();
            logOutBtn.addClass('show').removeClass('hide');
            registerLogIn.addClass('hide').removeClass('show');
            logInbtn.addClass('hide').removeClass('show');
            const accessToken = response.accessToken; 
            document.cookie = "token=" + accessToken; //setting the token as a cookie
            appearBtn();
            
        }).catch(function(e){
            console.log(e);
                $('#messageUser').html(e.responseJSON.message);
            });
       
        }
    }


    const registerSubmitBtn = $('#register-submit');
    registerSubmitBtn.click(registerSubmitClick);

    logOutBtn.click(onClickLogOut);

    // Search Event - Results are displayed in the console

    const valueInput = $('#search');
    const userOption = $('option');

    $('#search').on('keypress', (e) => {
        let key = e.which || e.keyCode;
        if (key === 13) { 
            e.preventDefault();
            console.log(valueInput.val());
            
            let valueToSearch = valueInput.val();
            valueToSearch = valueToSearch.toLowerCase().replace(/\b[a-z]/g, (letter) => {
                return letter.toUpperCase();
            });
            console.log(valueToSearch);
            userChoice();
            searchMovie(baseURL, user, valueToSearch);
        }
    });
    
    let user;
    function userChoice() {
        if (userOption[0].selected === true) {
            user = "?Title=";
        }
        else if (userOption[1].selected === true) {
            user = "?Genre=";
            }
        else if (userOption[2].selected === true) {
            user = "?Year=";
            }
        else if (userOption[3].selected === true) {
            user = "?Language=";
            }
        return user;
    }
    
    function onClickLogOut(){
        const authToken = getCookiesAsObject();
        logOutBtn.addClass('hide').removeClass('show');
        registerLogIn.addClass('show').removeClass('hide');
        logOutRequest(baseURL,authToken);
        deleteToken();
        disappearBtn();
    }

   
    // This function is called when clicking the submit button
    function registerSubmitClick(event){
        const baseURL = "https://ancient-caverns-16784.herokuapp.com/";
        event.preventDefault();
        actionOnRegisterSubmit(baseURL,logOutBtn,registerLogIn,registerForm);
    }



    //This function makes the password visible when checking the "show password checkbox"
    function showingPassword(){ 
        const confPassword = $("[name=ConfirmPassword]");
        const password = $("#RegisterForm [name=Password]");
        $('#check').on("change", function (){ 
            if(this.checked){
                password.attr('type','text');
                confPassword.attr('type','text');
            }
            else{
                password.attr('type', 'password');
                confPassword.attr('type','password');
            }
        });   
    }

function exitLogInForm(loginForm){
        const xBtnLogIn = $("#exit");
        xBtnLogIn.click(function(){
            loginForm.addClass('hide').removeClass('show');
            resetForm();
        });
    }

function exitRegisterForm(registerForm){
    const xBtnRegister = $('#x');
    xBtnRegister.click(function(){
        registerForm.addClass('hide').removeClass('show');
        resetForm();
    });
    
}
    
// This function deletes the token from cookie
function deleteToken() {
    document.cookie = "token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function actionOnRegisterSubmit(baseURL, logOutBtn, registerLogIn, registerForm){
    const firstName = $("[name=FirstName]");
    const lastName = $("[name=LastName]");
    const emailAdress = $("[name=EmailAdress]");
    const confPassword = $("[name=ConfirmPassword]");
    const username = $("#RegisterForm [name=Username]");
    const password = $("#RegisterForm [name=Password]");
    var allowedChr = /[^a-z0-9]/gi;
    if (validateName(firstName,lastName) && validateEmail(emailAdress) && validateUsername(allowedChr,username) && validatePassword(allowedChr,password) && confirmPassword(password,confPassword) ){
        Registering(baseURL, username, password).then(function(response){
            appearBtn();
            resetForm();
            logOutBtn.addClass('show').removeClass('hide');
            registerLogIn.addClass('hide').removeClass('show');
            registerForm.addClass('hide').removeClass('show');
            const accessToken = response.accessToken; 
            document.cookie = "token=" + accessToken; //setting the token as a cookie
        }).catch(function(e){
            $('#messageUsername').html("This username already exists. Please enter another username.");
        });
    };
};
function LogInForm() {
    const login = $('#login');
    login.addClass('show').removeClass('hide');
}
    
function onClickLogIn(){
    let auth = response.authenticated;
    let authenticatedToken = response.authToken;
    console.log(auth);
    appearBtn();
}

function validateName(firstName,lastName){
    if (firstName.val() === ''){
        $('#messages1').html('This field is required.');
        firstName.keydown(function(){
            $('#messages1').html('');
        });
        return false;
    }    
    if (lastName.val() === ''){
        $('#messages2').html('This field is required.');
        lastName.keydown(function(){
            $('#messages2').html('');
        });
        return false;
    } 
    else return true;
}

function validateUsername(allowedChr, username){
    const usernameVal = username.val();
     if (allowedChr.test(usernameVal) || (usernameVal==="")){
        $('#messages4').html('This field is required. Only digits and letters are allowed.');
        username.keydown(function(){
            $('#messages4').html('');
            $('#messageUsername').html('');
        });
        return false;
    } else return true;
}

function validateEmail(emailAdress){
    const text = emailAdress.val();
    const arpos = text.indexOf("@");
    const dotpos = text.lastIndexOf(".");
    const messageCont3 = $("#messages3");
    if (text === "" || arpos < 1 || dotpos < arpos + 2 || dotpos + 2 > text.length){
        messageCont3.html("Please enter a valid email adress!");
        emailAdress.keydown(function(){
            $('#messages3').html('');
        });
        return false;
    }else return true;
}

function validatePassword(allowedChr, password){
    const passValue = password.val();
    const messageCont5 = $("#messages5");
    if(allowedChr.test(passValue) || (passValue==="")){
        messageCont5.html("The password is required and must contain only digits and letters");
        password.keydown(function(){
            $('#messages5').html('');
        });
        return false;
    }  
    return true;
}

function confirmPassword(password,confPassword){
    const messageCont6 = $("#messages6");
    if (confPassword.val() !== password.val()){
        messageCont6.html("The passwords does not match. Please enter it again.");
        confPassword.keydown(function(){
            $('#messages6').html('');
        });
        return false;
    } else 
    return true;
}

function resetForm(){
    $("#RegisterForm").trigger("reset");
    const messageFormVal = $(".message").val();
    $(".message").html(function() {
        return messageFormVal.replace(messageFormVal, "");
    });
    const messageLogIn = $("#messageUsername").val();
    $("#messageUsername").html(function() {
        return messageLogIn.replace(messageLogIn, "")
    })
    
    $("#LogInForm").trigger("reset");
    const messageReg = $("#messageUser").val();
    $("#messageUser").html(function() {
        return messageReg.replace(messageReg, "")
    })
}

// This function checks for the token in cookie. Therefore it syncronizes both HTML
// pages so that when the registration has been done at home page it is applied on
// details page too.
function SyncHtmlPages(registerLogIn,logOutBtn){
        const authToken = getCookiesAsObject();
        if(!authToken){
            registerLogIn.addClass('show').removeClass('hide');
            logOutBtn.addClass('hide').removeClass('show');
        } else {
            logOutBtn.addClass('show').removeClass('hide');
            registerLogIn.addClass('hide').removeClass('show');
        }   
}
}); 
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
    if (!cookies.token){
        return false;
    }else {
        const authToken = cookies.token;
        return authToken;
        }
} 

function verifyCookieStatus(){
    const authToken = getCookiesAsObject();
    if (!authToken){
        return false;
    }else {
        return true;
    }
}

function appearBtn(){
    const addBtn = $(".add");
    addBtn.show();
    const deleteBtn = $(".del");
    deleteBtn.show();
    const editBtn = $("#edit")
    editBtn.show();
}

function disappearBtn(){
    const addBtn = $(".add");
    addBtn.hide();
    const deleteBtn = $(".del");
    deleteBtn.hide();
    const editBtn = $("#edit");
    editBtn.hide();
}

function makeDelBtnAppear(deleteBtn){
    const value = verifyCookieStatus();
    const addBtn = $(".add");
    if (value){
        deleteBtn.show();
        addBtn.show();
    };
    
};


function displaySearchResult(list) {
    let createContainer = $('#createContainer');
    let listElement = $('#movieList');
    let results = list.results;
    let movie = new MovieListView();
    console.log(list.results.length);
    listElement.children().remove();
    
    if (list.results.length == 0) {
        console.log("no movies to show");
        listElement.append(
            `<h3 id="not-found">No movies found.</h3>`
        );
    }
    //Goes through each inividual movie and appends it to the listElement
    for (let i=0; i<results.length; i++){
        let movie = new MovieListView(results[i]);
        listElement.append(
            `<li class="movie-list-item" data-idcode="${movie.id}">
                <img class="poster-small" src="${movie.imageUrl}" alt="${movie.title}"></img></br>
                <div class="movie-info">
                    <h3><a target="_self" href="/frontend3-2/pages/movieDetails.html?movieId=${movie.id}">${movie.title} (${movie.year})</a></h3>
                    <div>Type: ${movie.type}</div>
                    <div>${movie.runtime} - ${movie.genre}</div>
                    <div>Rating: <span class="star">&bigstar;</span> ${movie.rating} / 10 - (${movie.votes} votes)</div>
                    <button class="del hide" id="${movie.id}">Delete Movie</button>
                </div>
            </li>`
        );
        const deleteBtn = $(".del");
        makeDelBtnAppear(deleteBtn);
    }
    
    // Pagination Stuff
    let pagination = list.pagination;
    let pag = new PaginationView(list.pagination);
    listElement.append(
    `   <div class="pagination">
            <a id="prevPage">Prev</a>
            <a id="currentPage">${pag.currentPage}</a>
            <a id="nextPage">Next</a>
        </div>`
    );

    $('#nextPage').on('click', (event) =>{
        getNextMovies(pag.nextPage);
    });
    
    $('#prevPage').on('click', (event) =>{
        getPrevMovies(pag.prevPage);
    });
    
    //Below are the event listeners for the delete, add, cancel and approve buttons
    
    $('.del').on('click', (event) => {
        movie.deleteMovie($(event.currentTarget).attr('id')).then(() => {
            listElement.html('');
            getMoviesList();
        });
    });

    $('#add').on('click', () => {
        createContainer.css('display', 'block');
    });
    
    $('#cancel').on('click', () => {
        createContainer.css('display', 'none');
        deleteFormContents();
    });
    
    $('#approve').unbind('click').bind('click', () => {
        var formInputs = $('#createContainer');
        movie.postMovie(formInputs).then(() => {
            listElement.html('');
            getMoviesList();
        })
    });
}

//Function below renders the movie list "list" in a user friendly format
//Then it attaches some event listeners for interface buttons
function displayAllMovies(list){
    console.log(list);
    let createContainer = $('#createContainer');
    let listElement = $('#movieList');
    
    let results = list.results;
    // const authToken = getCookiesAsObject();
    let movie = new MovieListView();
    movie.id = getUrlParameter('movieId');
    
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    

    //Goes through each inividual movie and appends it to the listElement
    for (let i=0; i<results.length; i++){
        let movie = new MovieListView(results[i]);
        listElement.append(
            `<li class="movie-list-item" data-idcode="${movie.id}">
                <img class="poster-small" src="${movie.imageUrl}" alt="${movie.title}"></img></br>
                <div class="movie-info">
                    <h3><a target="_self" href="/frontend3-2/pages/movieDetails.html?movieId=${movie.id}">${movie.title} (${movie.year})</a></h3>
                    <div>Type: ${movie.type}</div>
                    <div>${movie.runtime} - ${movie.genre}</div>
                    <div>Rating: <span class="star">&bigstar;</span> ${movie.rating} / 10 - (${movie.votes} votes)</div>
                    <button class="del hide" id="${movie.id}">Delete Movie</button>
                </div>
            </li>`

        );
        const deleteBtn = $('.del');
        makeDelBtnAppear(deleteBtn);
    }

    
    // Pagination Stuff
    let pagination = list.pagination;
    let pag = new PaginationView(list.pagination);
    listElement.append(
    `   <div class="pagination">
            <a id="prevPage">Prev</a>
            <a id="currentPage">${pag.currentPage}</a>
            <a id="nextPage">Next</a>
        </div>`
    );

    $('#nextPage').on('click', (event) =>{
        getNextMovies(pag.nextPage);
    });
    $('#prevPage').on('click', (event) =>{
        event.preventDefault();
    });
    
    
    
    
    //Below are the event listeners for the delete, add, cancel and approve buttons
    
    $('.del').on('click', (event) => {
        movie.deleteMovie($(event.currentTarget).attr('id')).then(() => {
            listElement.html('');
            getMoviesList();
        });
    });

    $('.add').on('click', () => {
        createContainer.css('display', 'block');
    });
    
    $('#cancel').on('click', () => {
        createContainer.css('display', 'none');
        deleteFormContents();
    });
    
    $('#approve').unbind('click').bind('click', () => {
        var formInputs = $('#createContainer');
        let x = formInputs[0].children[0];
        let empty = 0;
        for (let i=0; i<x.length; i++) {
            if (x[i].value == '') {
                empty++;
                if (empty == 1) {
                    break;
                }
            }
        }
        if (!empty) {
            movie.postMovie(formInputs).then(() => {
            listElement.html('');
            getMoviesList();
            });
        }else {
            alert('Please fill in all fields.');
        }
    });
}


function displayMoviesPagination(list){
    let createContainer = $('#createContainer');
    let listElement = $('#movieList');
    let results = list.results;
    listElement.children().remove();
    let movie = new MovieListView();
    //Goes through each inividual movie and appends it to the listElement
    for (let i=0; i<results.length; i++){
        let movie = new MovieListView(results[i]);
        listElement.append(
            `<li class="movie-list-item" data-idcode="${movie.id}">
                <img class="poster-small" src="${movie.imageUrl}" alt="${movie.title}"></img></br>
                <div class="movie-info">
                    <h3><a target="_self" href="/frontend3-2/pages/movieDetails.html?movieId=${movie.id}">${movie.title} (${movie.year})</a></h3>
                    <div>Type: ${movie.type}</div>
                    <div>${movie.runtime} - ${movie.genre}</div>
                    <div>Rating: <span class="star">&bigstar;</span> ${movie.rating} / 10 - (${movie.votes} votes)</div>
                    <button class="del hide" id="${movie.id}">Delete Movie</button>
                </div>
            </li>`
        );
        const deleteBtn = $('.del');
        makeDelBtnAppear(deleteBtn);
    }
    
    // Pagination Stuff
    let pagination = list.pagination;
    let pag = new PaginationView(list.pagination);
    listElement.append(
    `   <div class="pagination">
            <a id="prevPage">Prev</a>
            <a id="currentPage">${pag.currentPage}</a>
            <a id="nextPage">Next</a>
        </div>`
    );

    $('#nextPage').on('click', (event) =>{
        getNextMovies(pag.nextPage);
    });
    $('#prevPage').on('click', (event) =>{
        getPrevMovies(pag.prevPage);
    });
   
    //Below are the event listeners for the delete, add, cancel and approve buttons
    
    $('.del').on('click', (event) => {
        movie.deleteMovie($(event.currentTarget).attr('id')).then(() => {
            listElement.html('');
            getMoviesList();
        });
    });

    $('.add').on('click', () => {
        createContainer.css('display', 'block');
    });
    
    $('#cancel').on('click', () => {
        createContainer.css('display', 'none');
        deleteFormContents();
    });
    
    $('#approve').unbind('click').bind('click', () => {
        var formInputs = $('#createContainer');
        movie.postMovie(formInputs).then(() => {
            listElement.html('');
            getMoviesList();
        })
    });
}

function displayPrevMovies(list){
    let createContainer = $('#createContainer');
    let listElement = $('#movieList');
    let results = list.results;
    let movie = new MovieListView();
    listElement.children().remove();
    //Goes through each inividual movie and appends it to the listElement
    $('#currentPage').html(list.pagination.currentPage);
    for (let i=0; i<results.length; i++){
        let movie = new MovieListView(results[i]);
        listElement.append(
            `<li class="movie-list-item" data-idcode="${movie.id}">
                <img class="poster-small" src="${movie.imageUrl}" alt="${movie.title}"></img></br>
                <div class="movie-info">
                    <h3><a target="_self" href="/frontend3-2/pages/movieDetails.html?movieId=${movie.id}">${movie.title} (${movie.year})</a></h3>
                    <div>Type: ${movie.type}</div>
                    <div>${movie.runtime} - ${movie.genre}</div>
                    <div>Rating: <span class="star">&bigstar;</span> ${movie.rating} / 10 - (${movie.votes} votes)</div>
                    <button class="del hide" id="${movie.id}">Delete Movie</button>
                </div>
            </li>`
        );
        // makeDelBtnAppear(listElement, movie);
        const deleteBtn = $('.del');
        makeDelBtnAppear(deleteBtn);
    }
    
    // $('#currentPage').html(list.pagination.currentPage);
    //Below are the event listeners for the delete, add, cancel and approve buttons
    
    $('.del').on('click', (event) => {
        movie.deleteMovie($(event.currentTarget).attr('id')).then(() => {
            listElement.html('');
            getMoviesList();
        });
    });

    $('.add').on('click', () => {
        createContainer.css('display', 'block');
    });
    
    $('#cancel').on('click', () => {
        createContainer.css('display', 'none');
        deleteFormContents();
    });
    
    $('#approve').unbind('click').bind('click', () => {
        var formInputs = $('#createContainer');
        movie.postMovie(formInputs).then(() => {
            listElement.html('');
            getMoviesList();
        });
     });
}

//This function resets the add movie form
function deleteFormContents() {
    $('#createContainer')
        .each(() => {
            this.value = '';
        });
}

function LogInForm() {
    const login = $('#login');
    login.addClass('show').removeClass('hide');
}
    
function onClickLogIn(){
    let auth = response.authenticated;
    let authenticatedToken = response.authToken;
    console.log(auth);
}




