const imageContainer=document.getElementById('current-image-container');
window.addEventListener('load',()=>{
    getCurrentImageOfTheDay();
});
//////////////////////
const search=document.getElementById('search');
const datesearch=document.getElementById('search-input');
datesearch.value="";
search.addEventListener('click',(e)=>{
    e.preventDefault();
    if (datesearch.value!="") {
        console.log(datesearch.value)
        getImageOfTheDay(datesearch.value);     
    }else{
     console.error('Input Date Search cannot be empty!!');
    }
});
///////////
function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=nw7T7hIEwj8oHTX4Jgp3yyNDvSnk3gDOb5S5977k&date=${currentDate}`)
    .then((res)=>{
        console.log(res);
        return res.json();
    }).then((data)=>{
        console.log(data);
        document.getElementById('current-image-container').innerHTML=`
        <p id='title1'>Nasa Picture of the Day</p>
        <div><img src='${data.url}' alt='image of the day'>
        <p id='title12'>${data.title}</p>
        <p>${data.explanation}</p>
        </div>`;
    let locStorage=JSON.parse(localStorage.getItem('searches'))??[];
    if (locStorage.length==0) {
        localStorage.setItem('searches',JSON.stringify(locStorage));
    }
    addSearchToHistory();
    }).catch((e)=>{
        console.error('An error occured!!',e);
    });
}
function getImageOfTheDay(getdate,checkrender){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=nw7T7hIEwj8oHTX4Jgp3yyNDvSnk3gDOb5S5977k&date=${getdate}`)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        document.getElementById('current-image-container').innerHTML=`
        <p id='title1'>Picture On ${getdate}</p>
        <div><img src='${data.url}' alt='image of the date:${getdate}'>
        <p id='title12'>${data.title}</p>
        <p>${data.explanation}</p>
        </div>`;
        if (checkrender!="no") {
            saveSearch(getdate);
            addSearchToHistory();     
        } 
    }).catch((e)=>{
        console.error('An error occured while searching image data!!',e);
    });
}
function saveSearch(date1){
    let searchdata=JSON.parse(localStorage.getItem('searches'))??[];
    if (searchdata.length==0) {
        localStorage.setItem('searches',JSON.stringify(searchdata));
    }
   searchdata.push(date1);
   localStorage.setItem('searches',JSON.stringify(searchdata));
}
function addSearchToHistory(){
    const locStorage=JSON.parse(localStorage.getItem('searches'));
    ///removing 
const remove=document.querySelectorAll('#search-history>li');
if (remove.length>0) {
    remove.forEach((elem)=>{
        elem.removeEventListener('click',()=>{
         getImageOfTheDay(elem.textContent,'no');})
         });  
}
    document.getElementById('search-history').innerHTML="";
    if (locStorage.length>0) {
        locStorage.forEach((elem)=>{
            document.getElementById('search-history').innerHTML+=`
            <li>${elem}</li>`;
           }); 
    }
    const searchhistory=document.querySelectorAll('#search-history>li');
    if (searchhistory.length>0) {
        searchhistory.forEach((elem)=>{
            elem.addEventListener('click',()=>{
                getImageOfTheDay(elem.textContent,'no');
            });
            });   
    }
    
}
