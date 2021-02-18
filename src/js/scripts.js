(function () {

   'use strict'

   let mySwiper = new Swiper('.swiper-container', {

      loop: true,

      // Navigation arrows
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      slidesPerView: 4,
      breakpoints: {
         // when window width is >= 320px
         300: {
            slidesPerView: 1,
            spaceBetween: 10
         },
         480: {
            slidesPerView: 1,
            spaceBetween: 50
         },
         // when window width is >= 480px
         540: {
            slidesPerView: 2
         },
         // when window width is >= 640px
         800: {
            slidesPerView: 3
         },
         1000: {
            slidesPerView: 4
         }
      }

   });

   //mask for input .tell
   window.addEventListener("DOMContentLoaded", function () {
      [].forEach.call(document.querySelectorAll('.tel'), function (input) {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+38 (0__) ___ ____",
               i = 0,
               def = matrix.replace(/\D/g, ""),
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, function (a) {
                  return i < val.length ? val.charAt(i++) || def.charAt(i) : a
               });
            i = new_value.indexOf("_");
            if (i != -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
               function (a) {
                  return "\\d{1," + a.length + "}"
               }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 7) this.value = "";
         }

         input.addEventListener("input", mask, false);
         input.addEventListener("focus", mask, false);
         input.addEventListener("blur", mask, false);
         input.addEventListener("keydown", mask, false)

      });

   });
   //mask for input .tell

   function isInViewport(elem) {
      let bounding = elem.getBoundingClientRect();
      return (
         bounding.top >= 0 &&
         bounding.left >= 0 &&
         bounding.top + bounding.height / 2 <= (window.innerHeight || document.documentElement.clientHeight) &&
         bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
   }

   function checkItems() {
      let items = document.querySelectorAll('.animate');

      items.forEach(item => {
         if (isInViewport(item)) {
            let animateMode = item.getAttribute('data-animate'),
               animateDelay = item.getAttribute('data-delay');
            item.classList.add('animate__animated', 'animate__' + animateMode);
            if (animateDelay) {
               item.classList.add(animateDelay);
            }

            if (item.getAttribute('data-access')) {
               let card = document.querySelector('.card');
               setTimeout(() => card.classList.toggle('is-flipped'), 2500);
            }

            item.classList.remove('animate');

         }
      });
   }


   let card = document.querySelector('.card'),
      contactUs = document.getElementById('contactUs');

   card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
   });

   contactUs.addEventListener('click', () => {
      let links = document.querySelector('.links');

      if (document.body.clientWidth < 1150) {
         if (links.className == 'links flex animate__animated animate__fadeInDown') {
            links.classList.remove('animate__fadeInDown');
            links.classList.add('animate__fadeOutUpBig');
         } else {
            links.classList.remove('animate__fadeOutUpBig');
            links.classList.add('animate__animated', 'animate__fadeInDown');
         }
      }
   });

   checkItems();

   window.addEventListener('scroll', function (e) {
      checkItems();
   });
   // debugger

   let menu = document.querySelector('.menu');

   if (document.body.clientWidth < 960) {

      menu.addEventListener('click', () => {
         let nav = document.querySelector('.navigate'),
            links = document.querySelector('.links');;

         menu.classList.toggle('open');
         nav.classList.toggle('scale-0');
         nav.classList.toggle('scale-1');
         document.body.classList.toggle('overflow');
         links.classList.remove('animate__fadeInDown');
         links.classList.add('animate__fadeOutUpBig');
      });



      let menuItens = document.querySelectorAll('.navigate__item');

      menuItens.forEach(item => {
         item.addEventListener('click', () => {
            if (!item.getAttribute('data-contact')) menu.click();
         });

      });

   }
})();