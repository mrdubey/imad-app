//counter code
var button = document.getElementById("counter");
button.onclick= function()
{
    //Create a request
    var request=new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                var counter =request.responseText;
                 var span=document.getElementById('count');
                 span.innerHTML=counter.toString();
            }
        }
        //not done
    };
    //Make the request
    request.open('GET','http://sndpdby28.imad.hasura-app.io/counter',true);
    request.send(null);
   
};

//submit name
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('Submit_btn');
submit.onclick=function()
{
    
    
    //capture the list
    var names=['name1','name2','name3']
    var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>' + names[i] + '</li>'
    }
    var ul=document.getElementById('namesList');
    ul.innerHTML=list;
};