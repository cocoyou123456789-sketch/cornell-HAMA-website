const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const subscribeForm = document.querySelector("[data-subscribe-form]");
const formMessage = document.querySelector("[data-form-message]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = new FormData(subscribeForm).get("firstName").trim();
  formMessage.textContent = `Thanks, ${firstName}. You're on the Cornell HAMA interest list.`;
  subscribeForm.reset();
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
