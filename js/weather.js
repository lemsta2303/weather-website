const apiKey = '98b3e8ec96b066ca74e2cdfdcad1a2fe';
let city = 'Warsaw';
const apiUrl = (city_local, api_key) => 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_local + '&units=metric&appid=' + api_key;
let temperatureUnit;
let windSpeedUnit = 'km/h';
const loadingOverlay = document.querySelector('.loading-overlay');

function returnActualTemperatureUnit() {
  if(localStorage.getItem('temperature-unit')){
    return localStorage.getItem('temperature-unit');
  }
  else return 'C'; //defaultowo
}

function returnActualWindSpeedUnit() {
  if (localStorage.getItem('wind-speed-unit')){
    return localStorage.getItem('wind-speed-unit');
  }
  else return 'm/s';
}

function returnActualCity() {
  if (localStorage.getItem('city')) {
    return localStorage.getItem('city');
  }
  else return 'Warsaw';
}

function sendAndFetchApiRequest(cityName, index, tempUnit, windUnit){
  fetch(apiUrl(cityName,apiKey))
  .then(response => response.json())
  .then(data => {
    //console.log(data); 
    useApiData(data, index, tempUnit, windUnit);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function useApiData(data, index, temperatureUnit, windUnit){
  const setBackgroundAndIconPromise = setBackgroundAndIcon(data, index);
  const setMainInformationPromise = setMainInformation(data, index, temperatureUnit, windUnit);
  const setDailyForecastPromise = setDailyForecast(data,index,temperatureUnit,windUnit);
  Promise.all([setBackgroundAndIconPromise, setMainInformationPromise, setDailyForecastPromise])
    .then(() => {
      setTimeout(() => {
        loadingOverlay.classList.add('loading-overlay-nodisplay');
      }, 100); 
      drawCanvasGraph();
      setDailyForecastElementsPosition();
    })
    .catch(error => {
      console.error('An error occurred:', error);
      setTimeout(() => {
        loadingOverlay.classList.add('loading-overlay-nodisplay');
      }, 100); 
    });
}

function setMainInformation(data, index, temperatureUnit, windUnit){
  
  return new Promise((resolve)=>{
    const headerInfoCityName = document.querySelector('.header__info__city__name');
    const headerInfoWeatherDescription = document.querySelector('.header__info__weather-description');
    const headerInfoTemperature = document.querySelector('.header__info__temperature');
    const headerInfoWeekDay = document.querySelector('.header__info__day__week-day');
    const headerInfoDay = document.querySelector('.header__info__day__date');
    const headerInfoTime = document.querySelector('.header__info__day__time');
    const airConditionRealFeel = document.querySelector('.real-feel-value');
    const airConditionWindSpeed = document.querySelector('.wind-speed-value');
    const airConditionHumidity = document.querySelector('.humidity-value');
    headerInfoCityName.innerText = data.city.name;
    headerInfoWeatherDescription.innerText = data.list[index].weather[0].description.toUpperCase();
    headerInfoTemperature.innerText = returnTempreatureValueInChoosenUnit(data.list[index].main.temp, temperatureUnit);
    headerInfoWeekDay.innerText = getDayOfWeekWithTimezone(data.list[index].dt_txt, data.city.timezone);
    headerInfoDay.innerText = formatDateWithTimezone(data.list[index].dt_txt, data.city.timezone);
    headerInfoTime.innerText = extractTimeWithTimezone(data.list[index].dt_txt, data.city.timezone);
    airConditionRealFeel.innerText = returnTempreatureValueInChoosenUnit(data.list[index].main.feels_like, temperatureUnit);
    airConditionWindSpeed.innerText = returnWindSpeedInChoosenUnit(data.list[index].wind.speed,windUnit);
    airConditionHumidity.innerText = data.list[index].main.humidity + '%';
    resolve();
    
  });
}

function setBackgroundAndIcon(data, index){
  return new Promise((resolve) => {
    const backgroundImg = document.querySelector('.bg-photo');
    const bigIconImgMobile = document.querySelector('.big-icon-photo-mobile');
    const bigIconImgDesktop = document.querySelector('.big-icon-photo-desktop');
    const weatherSmallIcon = document.querySelector('.weather-small-icon');
    const weatherType = data.list[index].weather[0].main;
    
    if (weatherType === "Clear"){
      backgroundImg.src = '/img/background-images/clear.webp';
      backgroundImg.alt = "clear;"
      bigIconImgMobile.src = '/img/weather-icon-images/clear.svg';
      bigIconImgMobile.alt = "clear";
      bigIconImgDesktop.src  = '/img/weather-icon-images/clear.svg';
      bigIconImgDesktop.alt = "clear";
      weatherSmallIcon.src = '/img/weather-icon-images/clear.svg';
      weatherSmallIcon.alt = "clear";
    } else if (weatherType === "Clouds" ){
      backgroundImg.src = '/img/background-images/clouds.webp';
      backgroundImg.alt = "clouds";
      bigIconImgMobile.src = '/img/weather-icon-images/clouds.svg';
      bigIconImgMobile.alt = "clouds";
      bigIconImgDesktop.src  = '/img/weather-icon-images/clouds.svg';
      bigIconImgDesktop.alt = "clouds";
      weatherSmallIcon.src = '/img/weather-icon-images/clouds.svg';
      weatherSmallIcon.alt = "clouds";
    } else if (weatherType === "Rain" ){
      backgroundImg.src = '/img/background-images/rain.webp';
      backgroundImg.alt = "rain";
      bigIconImgMobile.src = '/img/weather-icon-images/rain.svg';
      bigIconImgMobile.alt = "rain";
      bigIconImgDesktop.src  = '/img/weather-icon-images/rain.svg';
      bigIconImgDesktop.alt = "rain";
      weatherSmallIcon.src = '/img/weather-icon-images/rain.svg';
      weatherSmallIcon.alt = "rain";
    } else if (weatherType === "Snow" ) {
      backgroundImg.src = '/img/background-images/snow.webp';
      backgroundImg.alt = "snow";
      bigIconImgMobile.src = '/img/weather-icon-images/snow.svg';
      bigIconImgMobile.alt = "snow";
      bigIconImgDesktop.src  = '/img/weather-icon-images/snow.svg';
      bigIconImgDesktop.alt = "snow";
      weatherSmallIcon.src = '/img/weather-icon-images/snow.svg';
      weatherSmallIcon.alt = "snow";
    }
    resolve();
  });
}

function setDailyForecast(data,index,temperatureUnit, windUnit){
  return new Promise((resolve)=>{
    const dailyForecastElements = document.querySelectorAll('.main__daily-forecast__graph__element');
    const dailyForecastTemperatures = document.querySelectorAll('.main__daily-forecast__graph__element__temperature');
    const dailyForecastIcons = document.querySelectorAll('.daily-forecast-element-icon');
    const dailyForecastWindSpeed = document.querySelectorAll('.main__daily-forecast__graph__element__icon__wind');
    const dailyForecastTime = document.querySelectorAll('.main__daily-forecast__graph__element__icon__time');
    for( let i = 0; i<dailyForecastElements.length; i++ ) {
      dailyForecastTemperatures[i].innerText = returnTempreatureValueInChoosenUnit(data.list[i].main.temp, temperatureUnit);
      let weatherType = data.list[i].weather[0].main;
      if (weatherType === "Clear"){
        dailyForecastIcons[i].src = '/img/weather-icon-images/clear.svg';
        dailyForecastIcons[i].alt = 'clear';
      } else if (weatherType === "Clouds" ){
        dailyForecastIcons[i].src = '/img/weather-icon-images/clouds.svg';
        dailyForecastIcons[i].alt = 'clouds';
      } else if (weatherType === "Rain" ){
        dailyForecastIcons[i].src = '/img/weather-icon-images/rain.svg';
        dailyForecastIcons[i].alt = 'rain';
      } else if (weatherType === "Snow" ) {
        dailyForecastIcons[i].src = '/img/weather-icon-images/snow.svg';
        dailyForecastIcons[i].alt = 'snow';
      }
      dailyForecastWindSpeed[i].innerText = returnWindSpeedInChoosenUnit(data.list[i].wind.speed,windUnit);
      if(i===0) dailyForecastTime[i].innerText = "Now";
      else dailyForecastTime[i].innerText = extractTimeWithTimezone(data.list[i].dt_txt, data.city.timezone);
    }
    resolve();
  });
}

function setDailyForecastElementsPosition(){
  const dailyForecastElements = document.querySelectorAll('.main__daily-forecast__graph__element');
  const dailyForecastTemperatures = document.querySelectorAll('.main__daily-forecast__graph__element__temperature');
  let max = -Infinity;
  let min = Infinity;
  let temperatureSummary = 0 ;
  for(let i = 0 ; i < dailyForecastElements.length; i++ ){
    const temperature = parseInt(dailyForecastTemperatures[i].innerText);
    temperatureSummary += temperature;
    if(temperature < min){
      min = temperature;
    }
    if(temperature > max) {
      max = temperature;
    }
  }
  const unit = 10 / (max-min);
  const averageTemperature = temperatureSummary / dailyForecastElements.length;
  for(let i = 0 ; i < dailyForecastElements.length; i++) {
    const temperature = parseInt(dailyForecastTemperatures[i].innerText);
    if (temperature === max) {
      dailyForecastElements[i].style.transform = "translateY(-5rem)";
      dailyForecastElements[i].dataset.transformValue = -5;
    }
    else if (temperature === min) {
      dailyForecastElements[i].style.transform = "translateY(5rem)";
      dailyForecastElements[i].dataset.transformValue = 5;
    }
    else {
      const dynamicMarginBottom = () => {
        const temperatureDiff = (temperature - min) * unit;
        return 5 - temperatureDiff;
      }
      dailyForecastElements[i].style.transform = `translateY(${dynamicMarginBottom()}rem)`;
      dailyForecastElements[i].dataset.transformValue = dynamicMarginBottom();
    }
  }
  changeElementsPositionInDailyWeatherOnMobile();
}

function returnTempreatureValueInChoosenUnit(value, unit){
  if (unit == 'C') return Math.round(value) + '°C';
  else if (unit == 'F') return Math.round(( value * (9/5) ) + 32) + '°F';
  else if (unit == 'K') return Math.round( value + 273.15 ) + 'K';
}

function returnWindSpeedInChoosenUnit(value, unit){
  if(unit==='m/s') return (value).toFixed(1) + 'm/s';
  else if (unit==='km/h') return (value * 3.6).toFixed(1) + 'km/h';
  else if (unit==='M/h') return (value * 2.2).toFixed(1) + 'M/h';
 }

function getDayOfWeekWithTimezone(dateStr, timezoneOffset) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateObject = new Date(dateStr);
  const polishTimeZoneRegulation = -7200;

  dateObject.setSeconds(dateObject.getSeconds() + timezoneOffset + polishTimeZoneRegulation);
  
  const dayIndex = dateObject.getDay();
  return daysOfWeek[dayIndex];
}

function formatDateWithTimezone(dateStr, timezoneOffset) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateObject = new Date(dateStr);
  const polishTimeZoneRegulation = -7200;

  dateObject.setSeconds(dateObject.getSeconds() + timezoneOffset + polishTimeZoneRegulation);
  
  const formattedDate = `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
  return formattedDate;
}

function extractTimeWithTimezone(dateStr, timezoneOffset) {
  const dateObject = new Date(dateStr);
  const polishTimeZoneRegulation = -7200;

  dateObject.setSeconds(dateObject.getSeconds() + timezoneOffset + polishTimeZoneRegulation);
  
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function changeElementsPositionInDailyWeatherOnMobile() {
  if (window.innerWidth < 960) {
    const elements = document.querySelectorAll('.main__daily-forecast__graph__element');
    elements.forEach( (item) => {
      item.style.transform = `translateY(${item.dataset.transformValue/2}rem)`;
    })
  }
  else{
    const elements = document.querySelectorAll('.main__daily-forecast__graph__element');
    elements.forEach( (item) => {
      item.style.transform = `translateY(${item.dataset.transformValue}rem)`;
    })
  }
}

window.addEventListener('resize', changeElementsPositionInDailyWeatherOnMobile); 
sendAndFetchApiRequest(returnActualCity(), 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());