const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

$(document).ready(function () {
  $("#signUp").click(function () {
    var x = false;
    var wrongsignUp="" ;
    
    if($('#name').val() !="" &&  $('#password').val()!="" && $('#mail').val()!="" && $('#phone').val()!="" )
     {
      
      var User =  { UserName: $('#name').val(),  UserPassword: $('#password').val(), UserPhone:$('#phone').val(), UserMail: $('#mail').val() };
      
      console.log(User);
      $.ajax({
        url: 'https://localhost:44373/Api/Users/',
        type: 'GET',
        success: function (data, textStatus, xhr) {
            data.forEach(element => {
                if(element.UserName === $('#name').val() )
                {
                  wrongsignUp="username is already taken" ;
                    x=true ;
                }
                if(element.UserMail===$('#mail').val())
                {
                  wrongsignUp="Mail is already taken" ;
                   x=true ;
                }
                if(element.UserPhone ===$('#phone').val())
                {
                  wrongsignUp="Phone Number is already taken" ;
                  x=true ;
                }
               
            });
            console.log(x) ;

            if(x==true)
            {
              alert(''+wrongsignUp)
            }
            else
            {
              console.log('register') ;
              $.ajax({
                          url: 'https://localhost:44373/api/Users/',
                          type: 'POST',
                          dataType: 'json',
                          data: User,
                          success: function (data, textStatus, xhr) {
                            alert('Registeration is Succesfully..!');
                            location.href = "index.html?userId="+$('#name').val()+"" ;
                          },
                          error: function (xhr, textStatus, errorThrown) {
                              alert('Please Try Again, No Connection...!');
                          }
                     });
            }
        },
        error: function (xhr, textStatus, errorThrown){
            alert('Wrong in get contacts to check..!');
            console.log(xhr);  }
          });
    } 
    else
    {
      alert('please fill required data');
    }
  });
});

$(document).ready(function () {
  $("#login").click(function (){

    var UserId =0 ;
    var userName="" ;
    var y = false;
    if($('#loginusername').val()!="" &&  $('#loginpass').val()!="" )
     {
      $.ajax({
        url: 'https://localhost:44373/Api/Users/',
        type: 'GET',
        success: function (data, textStatus, xhr) {
            data.forEach(element => {
             
                if(element.UserName === $('#loginusername').val() && element.UserPassword === $('#loginpass').val() )
                {
                  y=true ;
                  UserId=element.UserId ;
                  userName=element.UserName ;
                }

             });

             if(y===true)
             {
                alert('login successfully..!') 
                location.href = "index.html?userId="+UserId+"&userName="+userName+" " ;
             }
             else{
               alert('username or password is wrong')
             }
        },
     
        error: function (xhr, textStatus, errorThrown){
            alert('Wrong in get contacts to check..!');
            console.log(xhr);
              } });        
    }       
    else
    {
      alert('please fill required data');
    }
  });
});