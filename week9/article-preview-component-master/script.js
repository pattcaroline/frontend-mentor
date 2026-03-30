const btn = document.getElementById("shareBtn");
const tooltip = document.getElementById("tooltip");
const footer = document.getElementById("footer");
let open = false;

function toggle() {
  open = !open;
  btn.classList.toggle("active", open);
  btn.setAttribute("aria-expanded", open);
  tooltip.classList.toggle("visible", open);
  tooltip.setAttribute("aria-hidden", !open);
  footer.classList.toggle("sharing", open);
}

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggle();
});

document.addEventListener("click", (e) => {
  if (open && !tooltip.contains(e.target) && e.target !== btn) {
    toggle();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && open) toggle();
});
