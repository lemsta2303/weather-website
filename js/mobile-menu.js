const optionsSection = document.querySelector('.main__options');
const mobileMenuButton = document.querySelector('.mobile-menu-btn');

if(mobileMenuButton){
   mobileMenuButton.addEventListener('click', mobileMenu)
}

function mobileMenu() {
   optionsSection.classList.toggle('active-menu');
   mobileMenuButton.classList.toggle('active-menu-btn');
}