$(document).ready(function () {
    
    $("#submit").click(function () {

        // var Contact = {
        //     ContacName: $('#name').val(),
        //     ContactNumber: $('#phone').val(),
        //     ContactMail: $('#mail').val(),

        // };

    //     $.ajax({
     //        url: 'https://localhost:44373/api/Contacts?name='+$('#name').val()+'&email='+$('#mail').val()+'&phone='+$('#phone').val()+'&id='+userId+'',
    //         type: 'POST',
    //         dataType: 'json',
    //         // data:Contact,
    //         success: function (data, textStatus, xhr) {
    //           alert('Contact Added Succesfully..!');
    //           location.href = "index.html?userId="+userId+"" ;
             
    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             alert('Please Try Again, No Connection...!');
    //         }
    //     });

    $.ajax({
    url:'https://localhost:44373/api/Users?UserPhone='+ $('#phone').val() ,
    type:'GET',
                success: function (data, textStatus, xhr) {
                  if(data==null)
                  console.log("this contact not found") ;
                  else
                  {
                      console.log("is found") ;
                      console.log(data) ;
                      addContact(data.UserName,data.UserMail,data.UserPhone) ;
                  }
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert('Please Try Again, No Connection...!');
                }
    })

   
    });
});

function addContact(UserName,UserMail,UserPhone){
    var qs= window.location.search;
    var urlparams=new URLSearchParams(qs);
    var userId=urlparams.get('userId'); 
     $.ajax({
            url: 'https://localhost:44373/api/Contacts?name='+UserName+'&email='+UserMail+'&phone='+UserPhone+'&id='+userId+'',
            type: 'POST',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
              alert('Contact Added Succesfully..!');
              location.href = "index.html?userId="+userId+"" ;
             
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Please Try Again, No Connection...!');
            }
        });   
}