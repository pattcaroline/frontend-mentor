const form = document.querySelector("form");
const emailError = document.getElementById("email-error");
const emailInput = document.getElementById("email");
const confirmedEmail = document.getElementById("confirmed-email");
const dismissBtn = document.getElementById("dismiss-btn");
const successCard = document.getElementById("success-card");
const signupCard = document.getElementById("signup-card");

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email) => emailRegExp.test(email);

function showError(message) {
  emailError.textContent = message;
  emailError.classList.remove("hidden");
  emailInput.classList.add("is-error");
  emailInput.setAttribute("aria-invalid", "true");
}

function clearError() {
  emailError.textContent = "";
  emailError.classList.add("hidden");
  emailInput.classList.remove("is-error");
  emailInput.removeAttribute("aria-invalid");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    showError("Email is required");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Valid email required");
    console.log("email", email);
    console.log("isValidEmail", isValidEmail(email));
    return;
  }

  // Success Card Display - swap screens
  clearError();
  confirmedEmail.textContent = email;
  signupCard.hidden = true;
  successCard.hidden = false;
});

// Clear error as user types
emailInput.addEventListener("input", clearError);

// Dismiss - go back to form
dismissBtn.addEventListener("click", () => {
  form.reset();
  successCard.hidden = true;
  signupCard.hidden = false;
});
