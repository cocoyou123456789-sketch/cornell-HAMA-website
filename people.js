const peopleGrid = document.querySelector("[data-people-grid]");

function detailValue(person, label) {
  const detail = person.details.find(([detailLabel]) => detailLabel === label);
  return detail ? detail[1] : "";
}

function classSuffix(person) {
  const year = detailValue(person, "Year");
  const match = year.match(/20(\d{2})/);
  return match ? ` '${match[1]}` : "";
}

function cardMajor(person) {
  return person.major.replace(/^Nolan School of /, "");
}

function createPersonCard(person) {
  const card = document.createElement("a");
  card.className = "person-card";
  card.href = `person.html?id=${person.id}`;
  card.setAttribute("aria-label", `View ${person.name} profile`);

  if (person.role.toLowerCase() === "president") {
    card.classList.add("is-president");
  }

  const image = document.createElement("img");
  image.loading = "lazy";
  image.decoding = "async";
  image.src = person.image;
  image.alt = person.name;

  const content = document.createElement("div");
  const name = document.createElement("h3");
  const role = document.createElement("p");
  const major = document.createElement("p");
  const contact = document.createElement("p");

  name.textContent = `${person.name}${classSuffix(person)}`;
  role.className = "person-role";
  role.textContent = person.role;
  major.className = "person-major";
  major.textContent = cardMajor(person);
  contact.className = "person-contact";
  contact.textContent = person.email || "Email TBD";

  content.append(name, role, major, contact);

  if (person.role.toLowerCase() === "president") {
    const badge = document.createElement("span");
    badge.className = "person-badge";
    badge.textContent = "President";
    content.append(badge);
  }

  card.append(image, content);
  return card;
}

if (peopleGrid) {
  (window.HAMA_PEOPLE || []).forEach((person) => {
    peopleGrid.append(createPersonCard(person));
  });
}
