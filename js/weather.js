const apiKey = '98b3e8ec96b066ca74e2cdfdcad1a2fe';
let city = 'Sępólno Krajeńskie';
const apiUrl = (city_local, api_key) => 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_local + '&units=metric&appid=' + api_key;
let actualUnit = 'C';
const loadingOverlay = document.querySelector('.loading-overlay');


function sendAndFetchApiRequest(cityName, index, unit){
  fetch(apiUrl(cityName,apiKey))
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    useApiData(data, index, unit);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function useApiData(data, index, unit){
  setBackgroundAndIcon(data, index);
  setMainInformation(data, index, unit);
  loadingOverlay.classList.add('loading-overlay-nodisplay');
}

function setMainInformation(data, index, unit){
  const headerInfoCityName = document.querySelector('.header__info__city__name');
  const headerInfoWeatherDescription = document.querySelector('.header__info__weather-description');
  const headerInfoTemperature = document.querySelector('.header__info__temperature');
  const headerInfoWeekDay = document.querySelector('.header__info__day__week-day');
  const headerInfoDay = document.querySelector('.header__info__day__date');
  const headerInfoTime = document.querySelector('.header__info__day__time');
  headerInfoCityName.innerText = data.city.name;
  headerInfoWeatherDescription.innerText = data.list[index].weather[0].description.toUpperCase();
  headerInfoTemperature.innerText = returnTempreatureValueInChoosenUnit(data.list[index].main.temp, unit);
  headerInfoWeekDay.innerText = getDayOfWeekWithTimezone(data.list[index].dt_txt, data.city.timezone);
  headerInfoDay.innerText = formatDateWithTimezone(data.list[index].dt_txt, data.city.timezone);
  headerInfoTime.innerText = extractTimeWithTimezone(data.list[index].dt_txt, data.city.timezone);
}

function setBackgroundAndIcon(data, index){
  const backgroundImg = document.querySelector('.bg-photo');
  const bigIconImgMobile = document.querySelector('.big-icon-photo-mobile');
  const bigIconImgDesktop = document.querySelector('.big-icon-photo-desktop');
  const weatherType = data.list[index].weather[0].main;
  // const weatherType = "Snow";
  if (weatherType === "Clear"){
    backgroundImg.src = '/img/background-images/clear.jpg';
    backgroundImg.alt = "clear;"
    bigIconImgMobile.src = '/img/weather-icon-images/clear.svg';
    bigIconImgMobile.alt = "clear";
    bigIconImgDesktop.src  = '/img/weather-icon-images/clear.svg';
    bigIconImgDesktop.alt = "clear";
  } else if (weatherType === "Clouds" ){
    backgroundImg.src = '/img/background-images/clouds.jpg';
    backgroundImg.alt = "clouds";
    bigIconImgMobile.src = '/img/weather-icon-images/clouds.svg';
    bigIconImgMobile.alt = "clouds";
    bigIconImgDesktop.src  = '/img/weather-icon-images/clouds.svg';
    bigIconImgDesktop.alt = "clouds";
  } else if (weatherType === "Rain" ){
    backgroundImg.src = '/img/background-images/rain.jpg';
    backgroundImg.alt = "rain";
    bigIconImgMobile.src = '/img/weather-icon-images/rain.svg';
    bigIconImgMobile.alt = "rain";
    bigIconImgDesktop.src  = '/img/weather-icon-images/rain.svg';
    bigIconImgDesktop.alt = "rain";
  } else if (weatherType === "Snow" ) {
    backgroundImg.src = '/img/background-images/snow.jpg';
    backgroundImg.alt = "snow";
    bigIconImgMobile.src = '/img/weather-icon-images/snow.svg';
    bigIconImgMobile.alt = "snow";
    bigIconImgDesktop.src  = '/img/weather-icon-images/snow.svg';
    bigIconImgDesktop.alt = "snow";
  }
}

function returnTempreatureValueInChoosenUnit(value, unit){
  if (unit == 'C') return Math.round(value) + '°C';
  else if (unit == 'F') return Math.round(( value * (9/5) ) + 32) + '°F';
  else if (unit == 'K') return Math.round( value + 273.15 ) + 'K';
}

// function getDayOfWeek(dateStr) {
//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const dateObject = new Date(dateStr);
//   const dayIndex = dateObject.getDay();
//   return daysOfWeek[dayIndex];
// }

// function formatDate(dateStr) {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const dateObject = new Date(dateStr);
//   const formattedDate = `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
//   return formattedDate;
// }

// function extractTime(dateStr) {
//   const dateObject = new Date(dateStr);
//   const hours = String(dateObject.getHours()).padStart(2, '0');
//   const minutes = String(dateObject.getMinutes()).padStart(2, '0');
//   return `${hours}:${minutes}`;
// }

function getDayOfWeekWithTimezone(dateStr, timezoneOffset) {
  const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  const dateObject = new Date(dateStr);
  const polishTimeZoneRegulation = -7200;

  dateObject.setSeconds(dateObject.getSeconds() + timezoneOffset + polishTimeZoneRegulation);
  
  const dayIndex = dateObject.getDay();
  return daysOfWeek[dayIndex];
}

function formatDateWithTimezone(dateStr, timezoneOffset) {
  const months = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
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


sendAndFetchApiRequest(city, 0, actualUnit);