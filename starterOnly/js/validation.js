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

// Fonction de validation / empêche l'envoi du formulaire
function validate(event) {
  event.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const birthdate = birthdateInput.value;
  const quantity = quantityInput.value.trim();
  let locationChecked = false;
  let checkbox1Checked = checkbox1Input.checked;

  /* This code is validating the input in the first name field of a form. It first sets the
`firstNameValid` variable to `true`. Then, it checks if the length of the input is less than 2
characters or if it contains any non-alphabetic characters using a regular expression. If either of
these conditions is true, `firstNameValid` is set to `false`. */

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
    errorMessage(firstNameError, "", "first");
  }

  /* This code is validating the input in the last name field of a form. It first sets the
`lastNameValid` variable to `true`. Then, it checks if the length of the input is less than 2
characters or if it contains any non-alphabetic characters using a regular expression. If either of
these conditions is true, `lastNameValid` is set to `false`. If `lastNameValid` is false, the
`errorMessage` function is called to display an error message in the `nameError` element. If
`lastNameValid` is true, the `errorMessage` function is called to clear any error message in the
`nameError` element. */

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
    errorMessage(nameError, "", "last");
  }
  // Validation de l'adresse e-mail
  let emailValid = isValidEmail(email);
  if (!emailValid) {
    errorMessage(
      emailError,
      "Veuillez entrer une adresse e-mail valide.",
      "email"
    );
  } else {
    errorMessage(emailError, "", "email");
  }

  /* This code is validating the birthdate input field. It calls the `isValidDate` function to check if
the input date is valid and returns a `Date` object representing the input date if it is valid,
otherwise it returns an empty string. If the input date is not valid, the `errorMessage` function is
called to display an error message in the `birthdateError` element. If the input date is valid, the
`errorMessage` function is called to clear any error message in the `birthdateError` element. The
error message displayed in the `birthdateError` element reminds the user that they must enter their
birthdate and be at least 13 years old. */

  let birthdateValid = isValidDate(birthdate);
  if (birthdateValid == "") {
    errorMessage(
      birthdateError,
      "Vous devez entrer votre date de naissance et avoir au moins 13ans.",
      "birthdate"
    );
  } else {
    errorMessage(birthdateError, "", "birthdate");
  }

  // Validation du nombre de concours
  let quantityValid = isValidQuantity(quantity);
  if (!quantityValid) {
    errorMessage(
      quantityError,
      "Veuillez entrer un nombre valide pour le nombre de concours (entre 0 et 99).",
      "quantity"
    );
  } else {
    errorMessage(quantityError, "", "quantity");
  }

  /* This code is checking if at least one of the location input fields (radio buttons) has been checked.
  It does this by looping through all the location input fields and checking if the `checked` property
  is true for any of them. If it finds a checked input field, it sets the `locationChecked` variable
  to true and breaks out of the loop. If none of the input fields are checked, it sets
`locationChecked` to false. */

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

  // validation formulaire
  isValid =
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    birthdateValid &&
    quantityValid &&
    locationChecked &&
    checkbox1Checked;
  if (isValid) {
    // overlay();
    modalBody.classList.add("hidden-form");
    successModal.classList.remove("hidden-form");
    formSubmit.reset();
    return true;
  } else if (!isValid) {
    return false;
  }
}

/**
 * The function sets an error message for a given field and adds or removes a CSS class based on
 * whether the message is empty or not.
 * @param champ - This parameter is likely referring to a DOM element that displays an error message
 * related to a form field.
 * @param message - The error message that will be displayed in the specified champ element.
 * @param champInput - champInput is a string that represents the ID of the HTML element that
 * corresponds to the input field where the error message should be displayed.
 */
function errorMessage(champ, message, champInput) {
  champ.textContent = message;
  let champError = document.querySelector("#" + champInput);
  if (champInput) {
    if (message.length > 0) {
      champError.classList.add("errors");
    } else {
      champError.classList.remove("errors");
    }
  }
}

/**
 * The function checks if a given email address is valid according to a specific pattern.
 * @param email - The email parameter is a string representing an email address that needs to be
 * validated.
 * @returns a boolean value indicating whether the input email string matches the specified email
 * pattern. If the email string matches the pattern, the function will return true, otherwise it will
 * return false.
 */
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+\.[a-z]{2,10}$/g;
  return emailPattern.test(email);
}

/**
 * The function checks if a given date is valid and returns it if it is, otherwise it returns an empty
 * string.
 * @param date - The `date` parameter is a string representing a date in the format "YYYY-MM-DD".
 * @returns If the input `date` matches the pattern `yyyy-mm-dd` and is at least 13 years ago from the
 * current date, then the function returns a `Date` object representing the input date. Otherwise, an
 * empty string is returned.
 */
function isValidDate(date) {
  let dateInput = new Date(date.replace(/-/g, "/"));
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const currentDate = new Date();
  const pastDate = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (datePattern.test(date) && dateInput <= pastDate) {
    return dateInput;
  } else {
    return "";
  }
}

/**
 * The function checks if a given quantity is valid based on a regular expression pattern.
 * @param quantity - The parameter "quantity" is a value that represents the quantity of a certain item
 * or product. It is used as an input for the function "isValidQuantity" which checks if the quantity
 * is valid or not based on a regular expression pattern.
 * @returns The function `isValidQuantity` is returning a boolean value. It will return `true` if the
 * `quantity` parameter matches the regular expression pattern `/^\d{1,2}$/`, which checks if the
 * quantity is a string of 1 or 2 digits. It will return `false` otherwise.
 */
function isValidQuantity(quantity) {
  const quantityPattern = /^\d{1,2}$/;
  return quantityPattern.test(quantity);
}

/**
 * The function toggles the visibility of a modal body and a success modal.
 */
// function overlay() {
//   const modalBodyClasses = modalBody.classList;
//   if (modalBodyClasses.contains("modal-body")) {
    // modalBodyClasses.add("hidden-form");
  //   modalBody.classList.add("hidden-form");
  //   successModal.classList.remove("hidden-form");
  // } else {
    // modalBodyClasses.remove("hidden-form");
  //   modalBody.classList.remove("hidden-form");
  //   successModal.classList.add("hidden-form");
  // }
// }
