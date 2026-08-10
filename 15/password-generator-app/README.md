# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](/password-generator-screenshot.png)

### Links

- Solution URL: [Password Generator URL solution](https://github.com/pattcaroline/frontend-mentor/tree/main/15/password-generator-app/)
- Live Site URL: [Password Generator Live](https://pattcaroline.github.io/frontend-mentor/15/password-generator-app/src/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

This project was very challenging especially when I was creating the javascript logic to generate a random password. I used Claude to help me get throught the bugs and fix incorrect logic.

For this project, I decided to code using CSS only. The most challenging part was to style the input range.

```js
// Function to syncronize input and range to have the same value
// Also this function set a ceiling (max) and floor (min) for valid input number (4 - 14)
function syncCharacterAmount(e) {
  const characterValue = e.target.value;
  // grabbing min and max value from input
  const min = charLengthEl.min;
  const max = charLengthEl.max;
  // assigning valid number input to the clamped variable
  // if number 99 -> ceiling is set to 14 automatically;
  // number 2 -> floor is set to 4 automatically
  const clamped = Math.max(min, Math.min(max, characterValue));

  // passing correct validated input number to keep range and number input in sync
  charLengthEl.value = clamped;
  rangeEl.value = clamped;

  // update the progress range bar according to the length of the password choosen between 4 and 14
  updateSliderTrack();
}
```

### Continued development

I will continue improving form elements and styling of the elements inside a form. Also, I need to add more ARIA attributes on my input and labels.

### Useful resources

- [Clamp on JavaScript](https://dev.to/timothee/quick-and-easy-value-clamping-13jc) - This helped me understand clamping on javascript. I applied this on the range input min and max.

### AI Collaboration

I used Claude to help me build the function syncCharacterAmount. Claude was a mentor and guided me when I got stuck understanding the clamp concepts. I'm very satisfied how I was able to create that function.

## Author

- Frontend Mentor - [@pattcaroline](https://www.frontendmentor.io/profile/pattcaroline)
- Twitter - [@pattcaroline22](https://x.com/pattcaroline22)
