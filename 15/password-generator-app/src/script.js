const DICE_SIDES = 6;
const ROLL_DURATION = 500;
const ROLL_INTERVAL = 100;
const MESSAGES = [
  "Lucky roll!",
  "Nice one!",
  "Great roll!",
  "Awesome!",
  "Perfect!",
  "Amazing!",
];

let isRolling = false;

document.addEventListener("DOMContentLoaded", () => {
  const dice = document.getElementById("dice");
  const rollBtn = document.getElementById("rollBtn");
  const result = document.getElementById("result");

  const rollDice = () => {
    if (isRolling) return;

    isRolling = true;

    rollBtn.disabled = true;
    dice.classList.add("rolling");
    result.textContent = "";

    const rollInterval = setInterval(() => {
      dice.textContent = Math.floor(Math.random() * DICE_SIDES) + 1;
    }, ROLL_INTERVAL);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalNumber = Math.floor(Math.random() * DICE_SIDES) + 1;
      dice.textContent = finalNumber;
      dice.classList.remove("rolling");

      result.textContent = MESSAGES[finalNumber - 1];
      rollBtn.disabled = false;
      isRolling = false;
    }, ROLL_DURATION);
  };

  rollBtn.addEventListener("click", rollDice);
  dice.addEventListener("click", rollDice);
});
