const shareButton = document.querySelector(".share-btn");
const shareButtonActive = document.querySelector(".share-active");

shareButton.addEventListener("click", () => {
  shareButton.parentElement.classList.toggle("hidden");
  shareButtonActive.classList.toggle("hidden");
});
