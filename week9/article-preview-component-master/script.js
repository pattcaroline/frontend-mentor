const cardFooter = document.querySelector(".card-footer");
const shareOverlay = document.querySelector(".share-overlay");
const shareBtn = document.querySelector(".share-btn");
const shareBtnActive = document.querySelector(".share-btn-active");

function toggleShareBtn() {
  shareOverlay.classList.toggle("visible");
}

shareBtn.addEventListener("click", toggleShareBtn);
shareBtnActive.addEventListener("click", toggleShareBtn);
