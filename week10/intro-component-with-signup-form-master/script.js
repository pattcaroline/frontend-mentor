const form = document.getElementById("form");

const fields = [
  {
    id: "first-name",
    errorId: "first-name-error",
    message: "First Name cannot be empty",
    validade: (value) => value.trim() !== "",
  },
  {
    id: "last-name",
    errorId: "last-name-error",
    message: "Last Name cannot be empty",
    validade: (value) => value.trim() !== "",
  },
  {
    id: "email",
    errorId: "email-error",
    message: "Looks like this is not an email",
    validade: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: "password",
    errorId: "password-error",
    message: "Password cannot be empty",
    validade: (value) => value.trim() !== "",
  },
];

function validadeField(field) {
  const input = document.getElementById(field.id);
  const errorSpan = document.getElementById(field.errorId);
  const wrapper = input.closest(".form-field");
  const isValid = field.validade(input.value);

  if (!isValid) {
    wrapper.classList.add("form-field--error");
    errorSpan.textContent = field.message;
  } else {
    wrapper.classList.remove("form-field--error");
    wrapper.classList.add("form-field--success");
    errorSpan.textContent = "";
  }

  return isValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = fields.map(validadeField).every(Boolean);
  if (allValid) {
    alert("Submitted!");
    form.submit();
  }
});

fields.forEach((field) => {
  const input = document.getElementById(field.id);
  input.addEventListener("input", () => validadeField(field));
});
