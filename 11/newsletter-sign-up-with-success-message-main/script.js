const email = document.getElementById("email");
const form = document.querySelector("form");
const error = document.getElementById("error");

const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

const isValidEmail = () => {
  const validity =
    email.ariaValueMax.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

const updateError = (isValid) => {
  if (isValid) {
    error.textContent = "";
    error.removeAttribute("class");
  } else {
    error.textContent = "Please, enter a valid email.";
    error.setAttribute("class", "active");
  }
};
