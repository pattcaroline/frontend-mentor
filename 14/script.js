const billError = document.getElementById("bill-error");
const billContainer = document.getElementById("bill-input-container");
const billInput = document.getElementById("bill-input");
const numPeopleInput = document.getElementById("numPeople");
const numPeopleContainer = document.getElementById("people-input-container");
const numPeopleError = document.getElementById("people-error");
const tipBtns = document.querySelectorAll("[data-tip]");
const customTipInput = document.getElementById("custom-tip-input");

const tipDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");

let billTotal = 0;
let tipAmount = 0;
let billPerPerson = 0;
let activeTipPercentage = 0;
let activePeople = 0;

// Validate bill amount above 0 and not negative number
billInput.addEventListener("input", () => {
  if (parseFloat(billInput.value) === 0 || parseFloat(billInput.value) < 0) {
    billError.classList.remove("hidden");
    billContainer.classList.add("border-2", "border-orange-400");
  } else {
    billError.classList.add("hidden");
    billContainer.classList.remove("border-2", "border-orange-400");
  }
});

// Validate number of people greater than 0 and not negative
numPeopleInput.addEventListener("input", () => {
  if (
    parseInt(numPeopleInput.value) === 0 ||
    parseInt(numPeopleInput.value) < 0
  ) {
    numPeopleError.classList.remove("hidden");
    numPeopleContainer.classList.add("border-2");
    numPeopleContainer.classList.add("border-orange-400");
  } else {
    numPeopleError.classList.add("hidden");
    numPeopleContainer.classList.remove("border-2");
    numPeopleContainer.classList.remove("border-orange-400");
  }
});

// Get tip percentage selected by user
tipBtns.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    // 1- reset all buttons back to default dark green
    tipBtns.forEach((btn) => {
      btn.classList.remove("bg-green-400", "text-green-900");
      btn.classList.add("bg-green-900", "text-white");
    });

    // 2- clear out the custom input value so they don;t conflict
    customTipInput.value = "";

    // 3- Highlight the specific button clicked
    e.target.classList.remove("bg-green-900", "text-white");
    e.target.classList.add("bg-green-400", "text-green-900");

    // 4- Save percentage selected and calculate tip
    activeTipPercentage = parseFloat(e.target.dataset.tip);
    calculateTip();
  });
});

// Get custom tip percentage selected by user
customTipInput.addEventListener("input", () => {
  tipBtns.forEach((btn) => {
    btn.classList.remove("bg-green-400", "text-green-900");
    btn.classList.add("bg-green-900", "text-white");
  });
  activeTipPercentage = parseFloat(customTipInput.value) || 0;
  calculateTip();
});

// Get number of people sharing the bill
numPeopleInput.addEventListener("input", () => {
  activePeople = parseInt(numPeopleInput.value);
  calculateTip();
});

// Reset Button
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  numPeopleInput.value = "";
  customTipInput.value = "";
  activePeople = 0;
  activeTipPercentage = 0;
  billError.classList.add("hidden");
  billContainer.classList.remove("bg-orange-400");
  numPeopleError.classList.add("hidden");
  numPeopleContainer.classList.remove("bg-orange-400");
  tipDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  tipBtns.forEach((btn) => {
    btn.classList.remove("bg-green-400", "text-green-900");
    btn.classList.add("bg-green-900", "text-white");
  });
});

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(numPeopleInput.value);

  if (isNaN(bill) || isNaN(people) || people <= 0) {
    tipDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    return;
  }

  billTotal = bill + bill * (activeTipPercentage / 100);

  tipAmount = (bill * (activeTipPercentage / 100)) / people;

  billPerPerson = billTotal / people;

  tipDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${billPerPerson.toFixed(2)}`;
}

calculateTip();
