/*global $, MovieListView, deleteMovie, getMoviesList, postMovie, searchMovie, response, LoggingIn, baseURL, userName, password, getCookieAsObject*/


$(document).ready(function() {
    const baseURL = "https://ancient-caverns-16784.herokuapp.com/";
    const authToken = getCookiesAsObject();
    const allowedChr = /^[a-zA-Z0-9]+$/;
    const registerBtn = $('#register');
    const registerForm = $('#registerForm');
    registerBtn.click(function registerFormAppear(){
      registerForm.addClass('show').removeClass('hide');
       registerForm.addClass('show').removeClass('hide');
    });
    const firstName = $("[name=FirstName]");
    const lastName = $("[name=LastName]");
    const emailAdress = $("[name=EmailAdress]");
    const username = $("[name=Username]");
    const password = $("[name=Password]");
    const confPassword = $("[name=ConfirmPassword]");
    
    const editBtn = $('.edit');   
    const deleteBtn = $('.del');   
    const AddBtn = $('.add'); 
    
    const registerSubmitBtn = $('#register-submit');
    registerSubmitBtn.click(registerSubmitClick);
    
    const logOutBtn = $('#log-out');
    logOutBtn.click(onClickLogOut);
    
    // This function recalls the getCookiesAsObject for the const authToken to have the 
    // current token value saved in the cookies.
    // Also calls logOutRequest function

    const showPassword = $('#check');
    const registerLogIn = $('#register-logIn');
    
    //This function makes the password visible when checking the "show password checkbox"
    $('#check').on("change", function (e){ 
    if(this.checked){
        password.attr('type','text');
    }
    else{
        password.attr('type', 'password');
    }
    });         
    // Search Event - Results are displayed in the console
    
    const valueInput = $('#search');
    const userOption = $('option');

    $('#search').on('keypress', (e) => {
        let key = e.which || e.keyCode;
        if (key === 13) { 
            e.preventDefault();
            console.log(valueInput.val());
            
            let valueToSearch = valueInput.val();

            userChoice();
            searchMovie(baseURL, user, valueToSearch)
            .catch(console.log);
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
 

// This function recalls the getCookiesAsObject for the const authToken to have the 
// current token value saved in the cookies.
// Also calls logOutRequest function
function onClickLogOut(){
    logOutBtn.addClass('hide').removeClass('show');
    registerLogIn.addClass('show').removeClass('hide');
    const authToken= getCookiesAsObject();
    logOutRequest(baseURL,authToken);
    deleteToken();
    resetForm();
    
}

// This function deletes the token from cookie
    function deleteToken() {
    document.cookie = "token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

}


// This function is called when clicking the submit button
function registerSubmitClick(event){
    event.preventDefault();
    if (validateName() && validateEmail() && validateUsername(allowedChr) && validatePassword(allowedChr) && confirmPassword() ){
    Registering(baseURL, username, password).then(function(response){
        logOutBtn.addClass('show').removeClass('hide');
        registerLogIn.addClass('hide').removeClass('show');
        registerForm.addClass('hide').removeClass('show');
        const accessToken = response.accessToken; 
        document.cookie = "token=" + accessToken; //setting the token as a cookie
        }).catch(function(e){
            $('#messageUsername').html("This username already exists. Please enter another username.");
        });
       
        
      }
}


function resetForm(){
    $(".logInForm").trigger("reset");
}

function validateName(){
    if (firstName.val() === ''){
        $('#messages1').html('This field is required.');
        onkeypress();
        return false;
    }    
    if (lastName.val() === ''){
        $('#messages2').html('This field is required.');
        onkeypress();
        return false;
    } 
    else return true;
}

function validateUsername(allowedChr){
     if (username.val() === '' || !allowedChr.test(username.val().length)){
        $('#messages4').html('This field is required. Only digits and letters are allowed.');
        onkeypress();
        return false;
    } else return true;
}

function validateEmail(){
    const text = emailAdress.val();
    const arpos = text.indexOf("@");
    const dotpos = text.lastIndexOf(".");
    const messageCont3 = $("#messages3");
    if (text === "" || arpos < 1 || dotpos < arpos + 2 || dotpos + 2 > text.length){
        messageCont3.html("Please enter a valid email adress!");
        onkeypress();
        return false;
    }else return true;
}

function validatePassword(allowedChr){
    const passValue = password.val();
    const messageCont5 = $("#messages5");
    if(!allowedChr.test(passValue) || (passValue.length === 0)){
        messageCont5.html("The password is required and must contain only digits and letters");
        onkeypress();
        return false;
    }  
    return true;
}

function confirmPassword(){
    messageCont6 = $("#messages6");
    if (confPassword.val() !== password.val()){
        messageCont6.html("The passwords does not match. Please enter it again.");
        onkeypress();
        return false;
    }else return true;
}

//This function hides the warning when the user starts typing in the field.
function onkeypress(){
  firstName.keypress(function(){
    $('#messages1').html('');
  });
  
  lastName.keypress(function(){
    $('#messages2').html('');
  });
  
  emailAdress.keypress(function(){
    $('#messages3').html('');
  });

  password.keypress(function(){
    $('#messages5').html('');
  });

  confPassword.keypress(function(){
    $('#messages6').html('');
  });

  username.keypress(function(){
    $('#messages4').html('');
    $('#messageUsername').html('');
  });

   firstName.keypress(function(){
    $('#messages1').html('');
  });
  
   lastName.keypress(function(){
    $('#messages2').html('');
  });
  
};


});


// This function sets the token's value as a cookie "token=tokenValue"
function setCookie(response){
    const accessToken = response.accessToken;
    document.cookie = "token=" + accessToken;

};

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
                <button class="del" id="${movie.id}">Delete Movie</button>
            </li></br>`
        );
    }
    
    //Below are the event listeners for the delete, add, cancel and approve buttons
    
    $('.del').on('click', (event) => {
        deleteMovie($(event.currentTarget).attr('id')).then(() => {
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
        
        postMovie(formInputs).then(() => {
            listElement.html('');
            getMoviesList();
        })
     
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

// This function calls getCookiesAsObject for the
// const authToken in order to login

const logInBtn = $('#log-in');
    logInBtn.click(onClickLogIn);
    
function onClickLogIn(){
    let auth = response.authenticated;
    let authenticatedToken = response.authToken;
    console.log(auth);
}
function LogInSubmitClick(){
    LoggingIn(baseURL, userName, password).then(getCookieAsObject);
}
