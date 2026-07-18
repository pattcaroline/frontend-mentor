const charLengthEl = document.getElementById("char-length");
const rangeEl = document.getElementById("range-length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const form = document.getElementById("password-form");
const passwordDisplay = document.getElementById("password-display");
const clipboardPassword = document.getElementById("copy-password");
const copyMessageEl = document.getElementById("copy-message");

const strengthTextEl = document.getElementById("strength-category");
const barElements = document.querySelectorAll("#strength-bars-container .bar");

// Creating arrays with characters that will be used randomly to generate password
const UPPERCASE_CHARACTERS = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHARACTERS = arrayFromLowToHigh(97, 122);
const NUMBER_CHARACTERS = arrayFromLowToHigh(48, 57);
const SYMBOL_CHARACTERS = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

// Syncronizing input number with input range
charLengthEl.addEventListener("input", syncCharacterAmount);
rangeEl.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const charLengthValue = charLengthEl.value;
  const includeUppercase = uppercaseEl.checked;
  const includeLowercase = lowercaseEl.checked;
  const includeNumbers = numbersEl.checked;
  const includeSymbols = symbolsEl.checked;

  const password = passwordGenerator(
    charLengthValue,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  );

  passwordDisplay.textContent = password;

  const score = calculateStrengthScore(
    parseInt(charLengthEl.value, 10),
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  );

  updateStrenghtUI(score);
});

function passwordGenerator(
  charLengthValue,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  // Empty array for allowed characters
  let charCodesPool = [];

  // Hold final password characters
  const passwordCharactersFinal = [];

  // Combining arrays based on user's selections
  // Add one guaranteed character checked by user
  if (includeUppercase) {
    charCodesPool = charCodesPool.concat(UPPERCASE_CHARACTERS);
    const randomUpper =
      UPPERCASE_CHARACTERS[
        Math.floor(Math.random() * UPPERCASE_CHARACTERS.length)
      ];
    passwordCharactersFinal.push(String.fromCharCode(randomUpper));
  }

  if (includeLowercase) {
    charCodesPool = charCodesPool.concat(LOWERCASE_CHARACTERS);
    const randomLower =
      LOWERCASE_CHARACTERS[
        Math.floor(Math.random() * LOWERCASE_CHARACTERS.length)
      ];
    passwordCharactersFinal.push(String.fromCharCode(randomLower));
  }

  if (includeNumbers) {
    charCodesPool = charCodesPool.concat(NUMBER_CHARACTERS);
    const randomNumber =
      NUMBER_CHARACTERS[Math.floor(Math.random() * NUMBER_CHARACTERS.length)];
    passwordCharactersFinal.push(String.fromCharCode(randomNumber));
  }

  if (includeSymbols) {
    charCodesPool = charCodesPool.concat(SYMBOL_CHARACTERS);
    const randomSymbol =
      SYMBOL_CHARACTERS[Math.floor(Math.random() * SYMBOL_CHARACTERS.length)];
    passwordCharactersFinal.push(String.fromCharCode(randomSymbol));
  }

  // If user didn't select any boxes, return an empty string
  if (charCodesPool.length === 0) return "Select at least one option";

  const remainingLength = charLengthValue - passwordCharactersFinal.length;

  // Loop through charCodesPool and grab a random character code based on length selected
  for (let i = 0; i < remainingLength; i++) {
    const randomIdx = Math.floor(Math.random() * charCodesPool.length);
    const characterCode = charCodesPool[randomIdx];

    //converting the ASCII number code into an actual character string and push it
    passwordCharactersFinal.push(String.fromCharCode(characterCode));
  }

  // Shuffle the array
  const shufflePassword = passwordCharactersFinal.sort(
    () => Math.random() - 0.5,
  );

  // join the array of characters into one final password string and return it
  return shufflePassword.join("");
}

// Function to create array with characters
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

// Function to syncronize input and range to have the same value
function syncCharacterAmount(e) {
  const characterValue = e.target.value;
  charLengthEl.value = characterValue;
  rangeEl.value = characterValue;
}

// CLIPBOARD - copy passwordDisplay text content into clipboard
clipboardPassword.addEventListener("click", async () => {
  try {
    const passwordText = passwordDisplay.textContent;

    await navigator.clipboard.writeText(passwordText);

    copyMessageEl.textContent = "Copied!";

    setTimeout(() => (copyMessageEl.textContent = ""), 2000);
  } catch (err) {
    console.log("Failed to copy password: ", err);
  }
});

// CALCULATING Strenght of password generated based on length and active conditions (selected by the user)
// Scoring Strength Logic
function calculateStrengthScore(length, upper, lower, numbers, symbols) {
  let activeConditions = 0;
  if (upper) activeConditions++;
  if (lower) activeConditions++;
  if (numbers) activeConditions++;
  if (symbols) activeConditions++;

  if (length < 7 || activeConditions <= 1) return 1; // Too Weak
  if (length < 10 || activeConditions === 2) return 2; // Weak
  if (length < 12 || activeConditions === 3) return 3; // Medium
  return 4; //Strong
}

// Function TO UPDATE UI STRENGTH of the generated password
function updateStrenghtUI(score) {
  const strengthMap = {
    1: { text: "TOO WEAK!", className: "too-weak" },
    2: { text: "WEAK", className: "weak" },
    3: { text: "MEDIUM", className: "medium" },
    4: { text: "STRONG", className: "strong" },
  };

  const currentConfig = strengthMap[score];
  strengthTextEl.textContent = currentConfig.text;
  console.log(strengthTextEl);

  // Loop through all 4 bars and color them dynamically
  barElements.forEach((bar, index) => {
    //reset any previus strengh classes
    bar.className = "bar";

    // COLOR all the bar's index less than the score
    if (index < score) {
      bar.classList.add(currentConfig.className);
    }
  });
}
