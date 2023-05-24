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

// Event listener pour la soumission du formulaire
formSubmit.addEventListener("submit", validate);

// Fonction de validation
function validate(event) {
  event.preventDefault(); // On empêche l'envoi du formulaire

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const birthdate = birthdateInput.value;
  const quantity = quantityInput.value;
  let locationChecked = false;
  const checkbox1Checked = checkbox1Input.checked;

  // Validation du champ Prénom
  if (firstName.trim().length < 2) {
    alert("Veuillez entrer un prénom valide (au moins 2 caractères).");
    return false;
  }

  // Validation du champ Nom
  if (lastName.trim().length < 2) {
    alert("Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    return false;
  }

  // Validation de l'adresse e-mail
  if (!isValidEmail(email)) {
    alert("Veuillez entrer une adresse e-mail valide.");
    return false;
  }

  // Validation de la date de naissance
  if (!isValidDate(birthdate)) {
    alert("Vous devez entrer votre date de naissance.");
    return false;
  }

  // Validation du nombre de concours
  if (!isValidQuantity(quantity)) {
    alert("Veuillez entrer un nombre valide pour le nombre de concours (entre 0 et 99).");
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
    alert("Vous devez choisir une option.");
    return false;
  }

  // Validation de la case à cocher des conditions générales
  if (!checkbox1Checked) {
    alert("Vous devez vérifier que vous acceptez les termes et conditions.");
    return false;
  }

  // Après avoir effectué toutes les validations avec succès
  confirmationMessage.textContent = "Merci ! Votre réservation a été reçue.";
  return true;
}

// Fonction de validation de l'adresse e-mail
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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


