const citiesChoiceWindow = document.querySelector('.cities-choice');
const citiesChoiceElements = document.querySelectorAll('.cities-choice__element');
const citiesUnderOverlay = document.querySelector('.options-under-overlay');
const citiesChoiceButton = document.querySelector('.main__options__cities');

if(citiesChoiceElements){
   citiesChoiceElements.forEach((element) => {
      element.addEventListener('click', () => {
         cityChoosing(element)
      })
   })
}

if(citiesUnderOverlay){
   citiesUnderOverlay.addEventListener('click', () => {
      citiesUnderOverlay.classList.add('options-window-nodisplay');
      if(citiesChoiceWindow){
         citiesChoiceWindow.classList.add('options-window-nodisplay')
      }
   });
}

if(citiesChoiceButton){
   citiesChoiceButton.addEventListener('click', () =>
   {  
      if(citiesUnderOverlay){
         citiesUnderOverlay.classList.remove('options-window-nodisplay');
      }
      if(citiesChoiceWindow){
         citiesChoiceWindow.classList.remove('options-window-nodisplay')
      }
   })
}

function cityChoosing(element){
   if(citiesChoiceWindow){
      citiesChoiceWindow.classList.add('options-window-nodisplay')
   }
   if(citiesUnderOverlay){
      citiesUnderOverlay.classList.add('options-window-nodisplay');
   }
   localStorage.setItem('city', element.dataset.cityName);
   sendAndFetchApiRequest(element.dataset.cityName, 0, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
   if(sliderLeftArrow) sliderLeftArrow.classList.add('arrow-blocked');
   if(sliderRightArrow) sliderRightArrow.classList.remove('arrow-blocked');
   mainIndex = 0;
}

