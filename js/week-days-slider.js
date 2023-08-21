const sliderLeftArrow = document.querySelector('.main__weekly-and-air__weekly__days__left-arrow');
const sliderRightArrow = document.querySelector('.main__weekly-and-air__weekly__days__right-arrow');

if(sliderRightArrow){
   sliderRightArrow.addEventListener('click', rightArrowService);
  
}



if(sliderLeftArrow) {
   sliderLeftArrow.addEventListener('click', leftArrowService)
}

function rightArrowService() {
   if(mainIndex != 32) {
      mainIndex += 8;
      // console.log(mainIndex);
      sendAndFetchApiRequest(returnActualCity(), mainIndex, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      if(sliderLeftArrow.classList.contains('arrow-blocked')){
         sliderLeftArrow.classList.remove('arrow-blocked');
      }
      if (mainIndex == 32) {
         sliderRightArrow.classList.add('arrow-blocked');
      }
   }
}

function leftArrowService() {
   if(mainIndex != 0){
      mainIndex -= 8;
      // console.log(mainIndex);
      sendAndFetchApiRequest(returnActualCity(), mainIndex, returnActualTemperatureUnit(), returnActualWindSpeedUnit());
      if(sliderRightArrow.classList.contains('arrow-blocked')){
         sliderRightArrow.classList.remove('arrow-blocked');
      }
      if (mainIndex == 0) {
         sliderLeftArrow.classList.add('arrow-blocked');
      }
   }

}