// This function sends the username and passsword to the API which generates a specific token
function Registering(baseURL,userName,password){
    return $.ajax({
        url: baseURL + "auth/register",
        method:'POST',
        dataType:"json",
        data: { username: userName.val(),
        	password: password.val()
        },
            success:function(response){ 
                console.log(response);
            }
   
    });
}

// This function is logging out the user by sending the session's token associated with the user.
function logOutRequest(baseURL, authToken){
    const headerName = "X-Auth-Token";
    $.ajax({
            url: baseURL + "auth/logout",
            method:'GET',
            beforeSend:function(xhr){
            xhr.setRequestHeader(headerName, authToken);
            },
            success:function(response){ 
                console.log(response.message);
            }
    });
}

// This function logs in the user when cliked
function loggingIn() {
    $.ajax({
      url: baseURL + "auth/login",
      method:'POST',
      dataType:"json",
      data: { username: userName.val(),
        	password: password.val()
        },
      success: function(response) {
        console.log('response', response);
      }
    });
}