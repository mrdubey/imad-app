console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML="new change";
//change in image
var img=document.getElementById('madi');
img.onclick=function()
{
    img.style.marginLeft='100px';
};