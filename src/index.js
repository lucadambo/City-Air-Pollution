import './styles.css';
import _ from 'lodash'

// API

const API_KEY = process.env.API_KEY;

// TEST FOR GEOLOCATION
if ('geolocation' in navigator){
  console.log('Geolocation available');
  window.alert('This app uses the geolocation service');
} else {
  console.log('Geolocation not available');
  window.alert('Geolocation could not be used. Check that it is activated or use the city search option');
  document.querySelector('.geoLoc-btn').style.visibility = 'hidden';
}

//GET COORDS BY GEOLOCATION'S USER
const geoLocBtn = document.querySelector ('.geoLoc-btn');
geoLocBtn.addEventListener('click', getData);

function getData(){
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCoords(lat,lon);
    });
}


//GET CITY FROM FETCH REQUEST WITH COORDS
const axios = require('axios');

async function getCoords(lat, lon){
  const responseGeo = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`);
  console.log(responseGeo);
  getCityFromGeo(responseGeo);
  const foo = _.get(responseGeo, 'data.data.city', "prova");
  console.log(foo);
}

function getCityFromGeo(responseGeo) {
  const city = responseGeo.data.data.city.name;
  getResult(city);
}

//GET CITY FROM SEARCH BAR
const searchCityBtn = document.querySelector('.src-btn');
searchCityBtn.addEventListener('click', setAction);


function setAction() {
  const searchCityInput = document.querySelector('.city-search');
  getResult(searchCityInput.value);
  console.log(searchCityInput.value);
}
// function setAction(evt) {
//   if(evt.keyCode === 13 ){
//     getResult(searchCity.value);
//   }
// }

//GET DEFINITIVE RESPONSE BASED ON THE CITY OF CHOICE
async function getResult(city) {
  const responseCity = await axios.get(`https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`);
  console.log(responseCity);
  const error = "You have typed in a city that is not in the database. Please try again";
  const foo = _.get(responseCity, 'data.data[0].aqi', error);
  console.log(foo);
  if(foo == error){

    const comment = document.querySelector('.comment');
    comment.innerText = error;

    const cleanPng = document.querySelector('td.png');
    cleanPng.style.visibility = 'hidden';

    const cleanCity = document.querySelector('.location');
    cleanCity.innerHTML = "OH NO!";

    const cleanUpdate = document.querySelector('.update');
    cleanUpdate.style.visibility = 'hidden';

    const cleanIndex = document.querySelector('.index');
    cleanIndex.style.visibility = 'hidden';

    const hint = document.querySelector('td.hint');
    hint.style.visibility = 'hidden';

    const newQueryBtn = document.querySelector ('.new-btn');
    newQueryBtn.style.visibility = 'visible';

    const searchCityInput = document.querySelector('.city-search');
    searchCityInput.style.visibility = 'hidden';

    const searchCityBtn = document.querySelector('.src-btn');
    searchCityBtn.style.visibility = 'hidden';

    const geoLocBtn = document.querySelector('.geoLoc-btn');
    geoLocBtn.style.visibility = 'hidden';

    const grid = document.querySelector('.warning');
    grid.style.visibility = 'hidden';

    const p = document.querySelector('p');
    p.style.visibility = 'hidden';


  }
  videoResults(responseCity);
}


//SHOW THE RESULTS OBTAINED ON THE VIDEO

function videoResults(responseQualityAir) {
  if(responseQualityAir.data.data.length === 0){
    window.alert('The request cannot be processed. Please try again making sure you have entered a valid city name, otherwise use geolocation');
  } else {
    const city = document.querySelector('.location');
    city.innerText = 'The city analized is: ' + responseQualityAir.data.data[0].station.name;
    console.log(responseQualityAir.data.data[0].station.name);

    const update = document.querySelector('.update');
    const updateValue = responseQualityAir.data.data[0].time.stime;
    update.innerText = 'The latest update related to the searched city is ' + updateValue;

    const index = document.querySelector('.index');
    const indexValue = responseQualityAir.data.data[0].aqi;
    index.innerText = 'The air pollution index is ' + indexValue;

    let commentText;
    let image;
    let warning;

    switch(true) {
      case (indexValue < 50):
      commentText = 'Air quality is good';
      image = 'Good.png';
      warning = 'Air quality is considered satisfactory, and air pollution poses little or no risk';
      break
    case (indexValue < 100):
      commentText = 'Air quality is Moderate'
      image = 'Moderate.png'
      warning = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'
      // background = ''
      break
    case (indexValue < 150):
      commentText = 'Air quality is Unhealthy for Sensitive Groups'
      image = 'Unhealthy.png'
      warning = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'
      // background = ''
      break
    case (indexValue < 200):
      commentText = 'Air quality is Unhealthy'
      image = 'UnhealthyRisk.png'
      warning = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects'
      // background = ''
      break
    case (indexValue < 300):
      commentText = 'Air quality is Very Unhealthy'
      image = 'VeryUnhealthy'
      warning = 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
      // background = ''
      break
    case (indexValue < 999):
      commentText = 'Air quality is Hazardous'
      image = 'Hazardous.png'
      warning = 'Health alert: everyone may experience more serious health effects'
      // background = ''
      break
    }

    const comment = document.querySelector('.comment');
    comment.innerText = commentText;

    const png = document.querySelector('td.png');
    png.innerHTML = "<img src='../src/img/" + image + "' width='140px' height='auto'>";

    const hint = document.querySelector('td.hint');
    hint.innerText = warning;

    const newSearch = document.querySelector('.new-search');
    newSearch.innerText = 'Do you want to make another search?';
    newSearch.style.visibility = 'visible';

    const newQueryBtn = document.querySelector ('.new-btn');
    newQueryBtn.style.visibility = 'visible';

    const searchCityInput = document.querySelector('.city-search');
    searchCityInput.style.visibility = 'hidden';

    const searchCityBtn = document.querySelector('.src-btn');
    searchCityBtn.style.visibility = 'hidden';

    const geoLocBtn = document.querySelector('.geoLoc-btn');
    geoLocBtn.style.visibility = 'hidden';

    const p = document.querySelector('p');
    p.style.visibility = 'hidden';



  }

}



// CLEAN UP AFTER A SEARCH

const newQueryBtn = document.querySelector ('.new-btn');
newQueryBtn.addEventListener('click', cleanData);

function cleanData() {
  const cleanInputCity = document.querySelector('.city-search');
  cleanInputCity.value=""

  const cleanComment = document.querySelector('.comment');
  cleanComment.innerText = "--";

  const cleanPng = document.querySelector('td.png');
  if (cleanPng.style.visibility == 'hidden'){
    cleanPng.style.visibility = 'visible';
  }
  cleanPng.innerHTML = "--";


  const cleanCity = document.querySelector('.location');
  cleanCity.innerText = "--";

  const cleanUpdate = document.querySelector('.update');
  cleanUpdate.innerText = "--";

  const cleanIndex = document.querySelector('.index');
  if (cleanIndex.style.visibility == 'hidden'){
    cleanIndex.style.visibility = 'visible';
  }
  cleanIndex.innerText = "--";


  const hint = document.querySelector('td.hint');
  if (hint.style.visibility == 'hidden'){
    hint.style.visibility = 'visible';
  }
  hint.innerText = "--";

  newQueryBtn.style.visibility = 'hidden';

  const searchCityInput = document.querySelector('.city-search');
  searchCityInput.style.visibility = 'visible';

  const searchCityBtn = document.querySelector('.src-btn');
  searchCityBtn.style.visibility = 'visible';

  const geoLocBtn = document.querySelector('.geoLoc-btn');
  geoLocBtn.style.visibility = 'visible';

  const p = document.querySelector('p');
  p.style.visibility = 'visible';

  const newSearch = document.querySelector('.new-search');
  newSearch.style.visibility = 'hidden';

  const grid = document.querySelector('.warning');
  if (grid.style.visibility == 'hidden'){
    grid.style.visibility = 'visible';
  }



}
