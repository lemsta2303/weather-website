const optionsClosingButton = document.querySelector('.options-window__wrapper__closing-button');
const optionsButton = document.querySelector('.main__options__settings')
const optionsWindow = document.querySelector('.options-window');
const optionsUnderOverlay = document.querySelector('.options-under-overlay');

const optionsChoiceCelsius = document.querySelector('.choice-celsius');
const optionsChoiceFahrenheit = document.querySelector('.choice-fahrenheit');
const optionsChoiceKelvin = document.querySelector('.choice-kelvin');

const optionsChoiceMetresPerSecond = document.querySelector('.choice-metres-per-second');
const optionsChoiceKilometresPerHour = document.querySelector('.choice-kilometres-per-hour');
const optionsChoiceMilesPerHour = document.querySelector('.choice-miles-per-hour');

if(optionsClosingButton){
   optionsClosingButton.addEventListener('click', closeOptionsWindow);
}

if(optionsButton){
   optionsButton.addEventListener('click', openOptionsWindow)
}

if(optionsUnderOverlay){
   optionsUnderOverlay.addEventListener('click', closeOptionsWindow);
}

setingTemperatureUnitInLocalStorage();
setingWindSpeedUnitInLocalStorage();

function closeOptionsWindow(){
   if(optionsWindow){
      optionsWindow.classList.add('options-window-nodisplay');
   }
   if(optionsUnderOverlay){
      optionsUnderOverlay.classList.add('options-window-nodisplay');
   }
}

function openOptionsWindow() {
   if(optionsWindow){
      optionsWindow.classList.remove('options-window-nodisplay');
   }
   if(optionsUnderOverlay){
      optionsUnderOverlay.classList.remove('options-window-nodisplay');
   }
}

function setingTemperatureUnitInLocalStorage(){ 
   if(optionsChoiceCelsius){
      optionsChoiceCelsius.addEventListener('click', () => {
         localStorage.setItem('temperature-unit', 'C');
         setActiveOnActualTemperatureButton();
         sendAndFetchApiRequest(city, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      })
   }
   if(optionsChoiceFahrenheit){
      optionsChoiceFahrenheit.addEventListener('click', () => {
         localStorage.setItem('temperature-unit', 'F');
         setActiveOnActualTemperatureButton();
         sendAndFetchApiRequest(city, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      })
   }
   if(optionsChoiceKelvin){
      optionsChoiceKelvin.addEventListener('click', () => {
         localStorage.setItem('temperature-unit', 'K');
         setActiveOnActualTemperatureButton();
         sendAndFetchApiRequest(city, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      })
   }
}

setActiveOnActualTemperatureButton();
setActiveOnActualWindSpeedButton();

function setActiveOnActualTemperatureButton(){
   const temperatureLocalStorage = localStorage.getItem('temperature-unit')
   if(temperatureLocalStorage){
      if (temperatureLocalStorage == 'C'){
         optionsChoiceFahrenheit.classList.remove('options-element-active');
         optionsChoiceKelvin.classList.remove('options-element-active');
         optionsChoiceCelsius.classList.add('options-element-active');
      }
      else if (temperatureLocalStorage == 'F'){
         optionsChoiceCelsius.classList.remove('options-element-active');
         optionsChoiceKelvin.classList.remove('options-element-active');
         optionsChoiceFahrenheit.classList.add('options-element-active');
      }
      else if (temperatureLocalStorage == 'K'){
         optionsChoiceCelsius.classList.remove('options-element-active');
         optionsChoiceFahrenheit.classList.remove('options-element-active');
         optionsChoiceKelvin.classList.add('options-element-active');
      }
   }
   else{
      optionsChoiceFahrenheit.classList.remove('options-element-active');
      optionsChoiceKelvin.classList.remove('options-element-active');
      optionsChoiceCelsius.classList.add('options-element-active');
   }
}

function setActiveOnActualWindSpeedButton(){
   const windSpeedLocalStorage = localStorage.getItem('wind-speed-unit');
   if(windSpeedLocalStorage) {
      if(windSpeedLocalStorage == 'm/s' ){
         optionsChoiceMetresPerSecond.classList.add('options-element-active');
         optionsChoiceKilometresPerHour.classList.remove('options-element-active');
         optionsChoiceMilesPerHour.classList.remove('options-element-active');
      }
      else if (windSpeedLocalStorage == 'km/h') {
         optionsChoiceMetresPerSecond.classList.remove('options-element-active');
         optionsChoiceKilometresPerHour.classList.add('options-element-active');
         optionsChoiceMilesPerHour.classList.remove('options-element-active');
      } 
      else if (windSpeedLocalStorage == 'M/h') {
         optionsChoiceMetresPerSecond.classList.remove('options-element-active');
         optionsChoiceKilometresPerHour.classList.remove('options-element-active');
         optionsChoiceMilesPerHour.classList.add('options-element-active');
      }
   } else{
         optionsChoiceMetresPerSecond.classList.add('options-element-active');
         optionsChoiceKilometresPerHour.classList.remove('options-element-active');
         optionsChoiceMilesPerHour.classList.remove('options-element-active');
   }
}

function setingWindSpeedUnitInLocalStorage(){
   if(optionsChoiceMetresPerSecond){
      optionsChoiceMetresPerSecond.addEventListener('click',() => {
         localStorage.setItem('wind-speed-unit', 'm/s');
         setActiveOnActualWindSpeedButton();
         sendAndFetchApiRequest(city, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      })
   }
   if(optionsChoiceKilometresPerHour){
      optionsChoiceKilometresPerHour.addEventListener('click', () => {
         localStorage.setItem('wind-speed-unit', 'km/h');
         setActiveOnActualWindSpeedButton();
         sendAndFetchApiRequest(city, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      })
   }
   if(optionsChoiceMilesPerHour){
      optionsChoiceMilesPerHour.addEventListener('click', () => {
         localStorage.setItem('wind-speed-unit', 'M/h');
         setActiveOnActualWindSpeedButton();
         sendAndFetchApiRequest(city, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      })
   }
}

