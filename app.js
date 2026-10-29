const menu = document.querySelector(".menu");
menu.addEventListener("click", () => {
  const open = document.querySelector("header").classList.toggle("menu-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
  menu.textContent = open ? "✕" : "☰";
});
document.querySelectorAll("nav a").forEach((a) =>
  a.addEventListener("click", () => {
    document.querySelector("header").classList.remove("menu-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Otevřít menu");
    menu.textContent = "☰";
  }),
);
const dialog = document.getElementById("lightbox"),
  photos = [...document.querySelectorAll(".gallery-item")];
let selected = 0;
function showPhoto(index) {
  selected = (index + photos.length) % photos.length;
  const item = photos[selected];
  dialog.querySelector("img").src = item.dataset.image;
  dialog.querySelector("img").alt = item.querySelector("img").alt;
  dialog.querySelector("p").textContent =
    item.dataset.caption + " · " + (selected + 1) + " / " + photos.length;
}
photos.forEach((b, i) =>
  b.addEventListener("click", () => {
    showPhoto(i);
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }),
);
function closeGallery() {
  dialog.close();
}
dialog.querySelector(".close-dialog").addEventListener("click", closeGallery);
dialog.addEventListener("close", () => (document.body.style.overflow = ""));
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      closeGallery();
  }
});
document
  .getElementById("prev-image")
  .addEventListener("click", () => showPhoto(selected - 1));
document
  .getElementById("next-image")
  .addEventListener("click", () => showPhoto(selected + 1));
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showPhoto(selected - 1);
  if (e.key === "ArrowRight") showPhoto(selected + 1);
});
