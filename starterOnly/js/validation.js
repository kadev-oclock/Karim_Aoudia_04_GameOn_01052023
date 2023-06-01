// DOM Elements

const formSubmit = document.querySelector("form");
const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");
const emailInput = document.querySelector("#email");
const birthdateInput = document.querySelector("#birthdate");
const quantityInput = document.querySelector("#quantity");
const locationInputs = document.querySelectorAll("[name='location']");
const checkbox1Input = document.querySelector("#checkbox1");
const confirmationMessage = document.querySelector("#confirmationMessage");
const formContainer = document.querySelector(".content");
const validInput = document.querySelectorAll(".text-control");
const modalBody = document.querySelector(".modal-body");
const successModal = document.querySelector(".success-form");

// Event listener pour la soumission du formulaire
formSubmit.addEventListener("submit", validate);

// Fonction de validation et On empêche l'envoi du formulaire
function validate(event) {
  event.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const birthdate = birthdateInput.value.trim();
  const quantity = quantityInput.value.trim();
  let locationChecked = false;
  let checkbox1Checked = checkbox1Input.checked;

  // Validation du champ Prénom
  let firstNameValid = true;

  if (firstName.length < 2) {
    firstNameValid = false;
  } else if (!firstName.match(/^[a-zA-Z]{2,}$/)) {
    firstNameValid = false;
  }

  if (!firstNameValid) {
    errorMessage(
      firstNameError,
      "le prénom doit comporter au moins 2 lettres et pas de caratère spéciaux.",
      "first"
    );
  } else {
    errorMessage(firstNameError, "");
  }

  // Validation du champ Nom
  let lastNameValid = true;

  if (lastName.length < 2) {
    lastNameValid = false;
  } else if (!lastName.match(/^[a-zA-Z]{2,}$/)) {
    lastNameValid = false;
  }

  if (!lastNameValid) {
    errorMessage(
      nameError,
      "le nom doit comporter au moins 2 lettres et pas de caractère spéciaux.",
      "last"
    );
  } else {
    errorMessage(nameError, "");
  }
  // Validation de l'adresse e-mail
 let emailValid = isValidEmail(email);
  if (!emailValid) {
    errorMessage(emailError, "Veuillez entrer une adresse e-mail valide.","email");
  } else {
    errorMessage(emailError, "");
  }
let birthdateValid  = isValidDate(birthdate);
  // Validation de la date de naissance
  if (!birthdateValid) {
    errorMessage(
      birthdateError,
      "Vous devez entrer votre date de naissance.",
      "birthdate"
    );
  } else {
    errorMessage(birthdateError, "", "birthdate");
  }
  // Validation du nombre de concours
  let quantityValid  = isValidQuantity(quantity);
  if (!quantityValid) {
    errorMessage(
      quantityError,
      "Veuillez entrer un nombre valide pour le nombre de concours (entre 0 et 99).","quantity"
    );
  } else {
    errorMessage(quantityError, "","quantity");
  }

    // Validation du choix de l'emplacement
    for (let i = 0; i < locationInputs.length; i++) {
      if (locationInputs[i].checked) {
        locationChecked = true;
        break;
      }
    }
  
    if (!locationChecked) {
      errorMessage(locationError, "Vous devez choisir une option.");
    } else {
      errorMessage(locationError, "");
    }
  
    // Validation de la case à cocher des conditions générales
    if (!checkbox1Checked) {
      errorMessage(
        checkboxError,
        "Vous devez vérifier que vous acceptez les termes et conditions."
      );
    } else {
      errorMessage(checkboxError, "");
    }

  // Code pour fermer le formulaire ici
  isValid = firstNameValid && lastNameValid && emailValid && quantityValid && locationChecked && checkbox1Checked;
  if (isValid) {
    overlay();
    formSubmit.reset();
  }
}

//function message erreur
function errorMessage(champ, message, champInput) {
  champ.textContent = message;
  console.log(champInput);
  let champError = document.querySelector("#" + champInput);
  if(champInput){
  if (message.length > 0) {
    champError.classList.add("errors");
  } else {
    champError.classList.remove("errors");
  }
}
}

// Fonction de validation de l'adresse e-mail
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+\.[a-z]{2,10}$/g;
  return emailPattern.test(email);
}

// Fonction de validation de la date de naissance
function isValidDate(date) {
  const datePattern = /(200[0-4]|19[2-9]\d)\-(1[0-2]|0[1-9])\-(3[0-1]|[0-2]\d)/;
  return datePattern.test(date);
}

// Fonction de validation du nombre de concours
function isValidQuantity(quantity) {
  const quantityPattern = /^\d{1,2}$/;
  return quantityPattern.test(quantity);
}

// fonction message remerciement
function overlay() {
  const modalBodyClasses = modalBody.classList;
  if (modalBodyClasses.contains("modal-body")) {
    modalBodyClasses.add("hidden-form");
    successModal.classList.remove("hidden-form");
  } else {
    modalBodyClasses.remove("hidden-form");
    successModal.classList.add("hidden-form");
  }
}
