document.addEventListener("DOMContentLoaded", function () {
  
  $('.slider__wrapp').slick({
    centerMode: true,
    centerPadding: '10%',
    arrows: false,
    dots: true,
    slidesToShow: 1,
  });
 
  
  // =====start popup
  // const modalBtn = document.querySelectorAll('[data-modal]');

  // const modal = document.querySelectorAll('.modal');
  // const body = document.querySelector('body');

  // modalBtn.forEach(item => {
  //   item.addEventListener('click', event => {

  //     let $this = event.currentTarget;
  //     let modalId = $this.getAttribute('data-modal');

  //     let modal = document.getElementById(modalId);
  //     let modalWrapper = modal.querySelector('.popup__wrapper');

  //     modalWrapper.addEventListener('click', event => {
  //       event.stopPropagation();
  //     });

  //     modal.classList.add('popup-show');
  //     body.classList.add('no-scroll');

  //     setTimeout(function () {
  //       modalWrapper.style.transform = 'none';
  //     }, 1);
  //   });
  // });

  // modal.forEach(item => {
  //   item.addEventListener('click', event => {
  //     let currentModal = event.currentTarget

  //     closeModal(currentModal)
  //   });
  // });

  // function closeModal(currentModal) {
  //   let modalWrapper = currentModal.querySelector('.popup__wrapper');

  //   modalWrapper.removeAttribute('style');
  //   body.classList.remove('no-scroll');


  //   setTimeout(function () {
  //     currentModal.classList.remove('popup-show');
  //   }, 300);
  // }
  // =====start popup


});