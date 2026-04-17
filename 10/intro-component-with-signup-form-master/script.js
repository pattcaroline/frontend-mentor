const form = document.getElementById("form");

const fields = [
  {
    id: "first-name",
    errorId: "first-name-error",
    message: "First Name cannot be empty",
    placeholder: "First Name",
    validate: (value) => value.trim() !== "",
  },
  {
    id: "last-name",
    errorId: "last-name-error",
    message: "Last Name cannot be empty",
    placeholder: "Last Name",
    validate: (value) => value.trim() !== "",
  },
  {
    id: "email",
    errorId: "email-error",
    message: "Looks like this is not an email",
    placeholder: "Email Address",
    errorPlaceholder: "email@example.com",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: "password",
    errorId: "password-error",
    message: "Password cannot be empty",
    placeholder: "Password",
    validate: (value) => value.trim() !== "",
  },
];

function validateField(field) {
  const input = document.getElementById(field.id);
  const errorSpan = document.getElementById(field.errorId);
  const wrapper = input.closest(".form-field");
  const isValid = field.validate(input.value);

  if (!isValid) {
    wrapper.classList.add("form-field--error");
    wrapper.classList.remove("form-field--success");
    errorSpan.textContent = field.message;
    input.setAttribute("aria-invalid", "true");
    if (field.errorPlaceholder) {
      input.placeholder = field.errorPlaceholder;
    }
  } else {
    wrapper.classList.remove("form-field--error");
    //Only add success if the field has a value
    if (input.value.trim() !== "") {
      wrapper.classList.add("form-field--success");
    } else {
      wrapper.classList.remove("form-field--success");
    }
    errorSpan.textContent = "";
    input.setAttribute("aria-invalid", "false");
    input.placeholder = field.placeholder;
  }

  return isValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = fields.map(validateField).every(Boolean);
  if (allValid) {
    alert("Submitted!");
    form.submit();
  }
});

fields.forEach((field) => {
  const input = document.getElementById(field.id);
  input.addEventListener("input", () => validateField(field));
});
