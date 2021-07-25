$(document).ready(function () {
    var qs= window.location.search;
    var urlparams=new URLSearchParams(qs);
    var userId=urlparams.get('userId');
    var userName=urlparams.get('userName');

    $.ajax({
            url: 'https://localhost:44373/Api/Contacts?userid='+userId,
            type: 'GET',
            success: function (data, textStatus, xhr) {
            data.forEach(element => {
                    $("#ContactsList").append(getContacts(element.ContacName,element.ContactMail,element.ContactNumber,element.ContactId));          
        });
        },
    error: function (xhr, textStatus, errorThrown){
        alert('No Connection..!');
        console.log(xhr);
        }
    });

    $("#submit").click(function () {
        var array= []
        $("input:checkbox[name='contact_cb']:checked").each(function(){
         array.push({"ContactId": $(this).val()});       
        });
       
     if( $('#ProjectName').val()!=="")
     { 
         if( array.length!=0)
         {
                var Project = {
                ProjectName: $('#ProjectName').val(),
                UserId: userId,
                ProjectContacts:array
                 };
            $.ajax({
                url: 'https://localhost:44373/api/projects/',
                type: 'POST',
                dataType: 'json',
                data: Project,
                success: function (data, textStatus, xhr) {
                alert('Project Added Succesfully..!');
                 location.href = "index.html?userId="+userId+"&userName="+userName+"" ;
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Please Try Again, No Connection...!');
            }
            });
        }
        else
        {
         alert('please choose group member') 
        }
            
    }
    else{
        alert('please Enter Project Name')
    }
     });
}); 

function getContacts(name,mail,phone,id)
{
var  res ="<div class='card-panel whiteColor lighten-5 z-depth-1'>";
res+="<div class='row valign-wrapper'>" ;
res+="<div class='col filled-in'> <input value='"+id+"' type='checkbox' name='contact_cb' style='opacity: 0.7; pointer-events: visible;' id='contact_cb' ></div>"

res+="<div class='col s3'>";
res+="<img src='Image/add-user.png' class='circle responsive-img'> </div>";

res+="<div class='col s8'>";
res+="<span class='black-text'>";
res+="<b>"+name+"</b><br>" ;
res+="<span class='grey-text' style='font-size: 13px;'>"+mail+"</span><br>";
res+="<span class='grey-text' style='font-size: 14px;'> "+phone+"</span>";
res+="</span> </div> </div> </div> </div>";

return res ;
                
}
