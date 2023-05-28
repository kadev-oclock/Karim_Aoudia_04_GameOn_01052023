// DOM Elements
const btnClose = document.querySelector(".bground");
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
console.log(validInput);
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
  const checkbox1Checked = checkbox1Input.checked;

  // Validation du champ Prénom
  if (firstName.length < 2) {
    errorMessage(
      firstNameError,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom ."
    );
    return false;
  } else if (!firstName.match(/^[a-zA-Z]{2,}$/)) {
    errorMessage(firstNameError, "prénom doit commencer par une lettre.");
    return false;
  }

  // Validation du champ Nom
  if (lastName.length < 2) {
    errorMessage(
      nameError,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    return false;
  } else if (!lastName.match(/^[a-zA-Z]{2,}$/)) {
    errorMessage(nameError, "nom doit commencer par une lettre.");
    return false;
  }

  // Validation de l'adresse e-mail
  if (!isValidEmail(email)) {
    errorMessage(emailError, "Veuillez entrer une adresse e-mail valide.");
    return false;
  }

  // Validation de la date de naissance
  if (!isValidDate(birthdate)) {
    errorMessage(birthdateError, "Vous devez entrer votre date de naissance.");
    return false;
  }

  // Validation du nombre de concours
  if (!isValidQuantity(quantity)) {
    errorMessage(
      quantityError,
      "Veuillez entrer un nombre valide pour le nombre de concours (entre 0 et 99)."
    );
    return false;
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
    return false;
  }

  // Validation de la case à cocher des conditions générales
  if (!checkbox1Checked) {
    errorMessage(
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    return false;
  }

  // Après avoir effectué toutes les validations avec succès
  confirmationMessage.textContent = "Merci ! Votre réservation a été reçue.";
  formSubmit.reset();
  // Code pour fermer le formulaire ici
  document.querySelector(".btn-submit").value = "Fermer";

  // Changer la valeur du bouton une fois le formulaire validé
  document.querySelector(".btn-submit").addEventListener("click", function () {
    btnClose.style.display = "none";
  });
  return false;
}

//function message erreur
function errorMessage(champ, message, isValid) {
  if (!isValid) {
    champ.textContent = message;
  } else {
    champ.textContent = "";
  }
  validInput.forEach(function (input) {
    if (!isValid) {
      input.classList.toggle("errors");
    } else {
      input.classList.toggle("");
    }
  });
}

// Fonction de validation de l'adresse e-mail
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+\.[a-z]{2,10}$/g;
  return emailPattern.test(email);
}

// Fonction de validation de la date de naissance
function isValidDate(date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(date);
}

// Fonction de validation du nombre de concours
function isValidQuantity(quantity) {
  const quantityPattern = /^\d{1,2}$/;
  return quantityPattern.test(quantity);
}
