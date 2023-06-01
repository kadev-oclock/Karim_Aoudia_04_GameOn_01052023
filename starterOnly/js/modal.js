// responsive navigation menu
function editNav() {
  if (burgerNav.className === "topnav") {
    burgerNav.className += " responsive";
  } else {
    burgerNav.className = "topnav";
  }
}

// DOM Elements
const burgerNav = document.getElementById("myTopnav");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const btnClose = document.querySelector(".bground");
const hiddenForm = document.querySelector(".btn-close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal on click icon
modalClose.addEventListener("click", closeModal);


//function close modal
function closeModal() {
  modalbg.style.display = "none";
}

//fonction fermer la modal  après soumission du formulaire
function closeConfirmationModal() {
  btnClose.style.display = "none";
}
hiddenForm.addEventListener("click", closeConfirmationModal);


