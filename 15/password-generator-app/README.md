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

![](./screenshot.jpg)

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
function syncCharacterAmount(e) {
  const characterValue = e.target.value;
  charLengthEl.value = characterValue;
  rangeEl.value = characterValue;
}
```

### Continued development

I will continue improving form elements and styling of the elements inside a form. Also, I need to add more ARIA attributes on my input and labels.

### Useful resources

- [Clamp on JavaScript](https://dev.to/timothee/quick-and-easy-value-clamping-13jc) - This helped me understand clamping on javascript. I applied this on the range input min and max.

### AI Collaboration

Describe how you used AI tools (if any) during this project. This helps demonstrate your ability to work effectively with AI assistants.

- What tools did you use (e.g., ChatGPT, Claude, GitHub Copilot)?
- How did you use them (e.g., debugging, generating boilerplate, brainstorming solutions)?
- What worked well? What didn't?

## Author

- Frontend Mentor - [@pattcaroline](https://www.frontendmentor.io/profile/pattcaroline)
- Twitter - [@pattcaroline22](https://x.com/pattcaroline22)
