const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const subscribeForm = document.querySelector("[data-subscribe-form]");
const formMessage = document.querySelector("[data-form-message]");

const mailingListForm = {
  endpoint: "https://docs.google.com/forms/d/e/1FAIpQLSfF9NTTcYg5MhzcKQixk3WIO3nETxZjdgjF7ADmUxI4aQkr-A/formResponse",
  fields: {
    firstName: "entry.1120538583",
    lastName: "entry.32576047",
    graduationYear: "entry.761571093",
    email: "entry.703268069",
  },
};

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

if (header && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (header && menuToggle && nav) {
  nav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      header.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (subscribeForm && formMessage) {
  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(subscribeForm);
    const firstName = String(formData.get("firstName") || "").trim();
    const submitButton = subscribeForm.querySelector('button[type="submit"]');
    const payload = new URLSearchParams();

    Object.entries(mailingListForm.fields).forEach(([fieldName, entryId]) => {
      payload.set(entryId, String(formData.get(fieldName) || "").trim());
    });

    submitButton.disabled = true;
    submitButton.textContent = "Subscribing…";
    subscribeForm.setAttribute("aria-busy", "true");
    formMessage.textContent = "";

    try {
      await fetch(mailingListForm.endpoint, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      formMessage.textContent = `Thanks, ${firstName}. You're on the Cornell HAMA mailing list.`;
      subscribeForm.reset();
    } catch (error) {
      formMessage.textContent = "We couldn't add you right now. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Subscribe";
      subscribeForm.removeAttribute("aria-busy");
    }
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
