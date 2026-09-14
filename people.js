const peopleGrid = document.querySelector("[data-people-grid]");
const personPreview = document.querySelector("[data-person-preview]");

function cardMajor(person) {
  return person.major.replace(/^Nolan School of /, "");
}

function createPersonCard(person) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "person-card";
  card.setAttribute("aria-haspopup", "dialog");
  card.setAttribute("aria-label", `Preview ${person.name} profile`);

  if (person.role.toLowerCase() === "president") {
    card.classList.add("is-president");
  }

  const image = document.createElement("img");
  image.loading = "lazy";
  image.decoding = "async";
  image.src = person.image;
  image.alt = person.name;
  if (person.imagePosition) {
    image.style.objectPosition = person.imagePosition;
  }

  const content = document.createElement("div");
  const name = document.createElement("h3");
  const role = document.createElement("p");
  const major = document.createElement("p");
  const contact = document.createElement("p");

  name.textContent = person.name;
  role.className = "person-role";
  role.textContent = person.role;
  major.className = "person-major";
  major.textContent = cardMajor(person);
  contact.className = "person-contact";
  contact.textContent = person.email || "Email TBD";

  content.append(name, role, major, contact);

  card.append(image, content);
  card.addEventListener("click", () => openPersonPreview(person));
  return card;
}

function createPreviewFact(label, value) {
  const row = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  term.textContent = label;
  description.textContent = value;
  row.append(term, description);
  return row;
}

function openPersonPreview(person) {
  if (!personPreview) {
    window.location.href = `person.html?id=${person.id}`;
    return;
  }

  const role = personPreview.querySelector("[data-person-preview-role]");
  const name = personPreview.querySelector("[data-person-preview-name]");
  const intro = personPreview.querySelector("[data-person-preview-intro]");
  const facts = personPreview.querySelector("[data-person-preview-facts]");
  const image = personPreview.querySelector("[data-person-preview-image]");
  const caption = personPreview.querySelector("[data-person-preview-caption]");
  const learnMore = personPreview.querySelector("[data-person-preview-link]");
  const email = personPreview.querySelector("[data-person-preview-email]");

  role.textContent = person.role;
  name.textContent = person.name;
  intro.textContent = `${person.name} serves as ${person.role} and studies ${cardMajor(person)} at Cornell.`;
  image.src = person.image;
  image.alt = person.name;
  image.style.objectPosition = person.imagePosition || "center 25%";
  caption.textContent = `${person.name} · ${person.role}`;
  learnMore.href = `person.html?id=${person.id}`;
  learnMore.setAttribute("aria-label", `Learn more about ${person.name}`);

  if (person.email) {
    email.href = `mailto:${person.email}`;
    email.textContent = person.email;
  } else {
    email.removeAttribute("href");
    email.textContent = "Email TBD";
  }

  facts.replaceChildren();
  const priorityLabels = ["Year", "Hometown", "Major", "Internship", "Internships", "Working"];
  person.details
    .filter(([label]) => priorityLabels.includes(label))
    .slice(0, 4)
    .forEach(([label, value]) => facts.append(createPreviewFact(label, value)));

  personPreview.showModal();
}

if (peopleGrid) {
  (window.HAMA_PEOPLE || []).forEach((person) => {
    peopleGrid.append(createPersonCard(person));
  });
}

if (personPreview) {
  personPreview.querySelector("[data-person-preview-close]").addEventListener("click", () => {
    personPreview.close();
  });

  personPreview.addEventListener("click", (event) => {
    if (event.target === personPreview) {
      personPreview.close();
    }
  });
}
