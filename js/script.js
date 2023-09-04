
import { API_KEY } from './config.js'
const searchIcon = document.getElementById('search-icon');
const input= document.getElementById('search');
const errorBox =document.getElementById('error');
const locationBox =document.getElementById('location');
const temperature = document.getElementById('temperature');
const descriptionWeather = document.getElementById('description');
const humidityInfo = document.getElementById('humidity-info');
const windInfo = document.getElementById('wind-info');
const imgWeather = document.getElementById('weather-img');


input.addEventListener('keyup', e => {
    if (e.key=="Enter"){
        requestWeather();
       
    }

    

});
searchIcon.addEventListener('click', () =>{
   
    requestWeather();
  
    
    
});

function requestWeather(){
    const city = input.value.trim();
    if (city !== "") {
        requestApi(city);
    }
}

function requestApi(city){
   
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    fetch(API).then(response => response.json()).then(result => weatherDetails(result));
    

}

function weatherDetails(info){


   
    if (info === "" || info.cod=="404") {
        errorBox.classList.remove('hidden');
        errorBox.classList.add('visible');
        locationBox.classList.remove('visible');
        locationBox.classList.add('hidden');
    }else{
        temperature.innerText= Math.floor(info.main.temp)+'º';
        descriptionWeather.innerText =info.weather[0].description.charAt(0).toUpperCase() + info.weather[0].description.slice(1);
        humidityInfo.innerText = info.main.humidity+'%';
        windInfo.innerText = info.wind.speed +'Km/h'
        errorBox.classList.add('hidden');
        errorBox.classList.remove('visible');
        locationBox.classList.remove('hidden');
        locationBox.classList.add('visible');
    };

    if (info.weather[0].id== 800){
        imgWeather.src = "img/clear.svg"
    }else if (info.weather[0].id>=200 && info.weather[0].id<=232){
        imgWeather.src = "img/storm.svg"
    }else if(info.weather[0].id>=600 && info.weather[0].id<=622){
            imgWeather.src = "img/snow.svg"
        } else if (info.weather[0].id>=701 && info.weather[0].id<=781){
        imgWeather.src = "img/haze.svg"
    }else if(info.weather[0].id>=801 && info.weather[0].id<=804){
            imgWeather.src = "img/cloud.svg"
        }else if((info.weather[0].id>=300 && info.weather[0].id<=321) || (info.weather[0].id>=500 && info.weather[0].id<=531)) {
            imgWeather.src = "img/rain.svg"
    }
}
