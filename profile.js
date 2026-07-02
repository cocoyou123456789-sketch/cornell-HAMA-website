const profileId = new URLSearchParams(window.location.search).get("id");
const profile = (window.HAMA_PEOPLE || []).find((person) => person.id === profileId);
const page = document.querySelector("[data-profile-page]");

function createDetail(label, value) {
  const row = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  term.textContent = `${label}:`;
  description.textContent = value;
  row.append(term, description);
  return row;
}

if (!profile) {
  page.innerHTML = `
    <div class="section-inner profile-missing">
      <a class="back-link" href="people.html#people" aria-label="Back to executive board">‹</a>
      <h1>Profile not found</h1>
      <p>Please return to the executive board page and choose a member.</p>
    </div>
  `;
} else {
  document.title = `${profile.name} | Cornell HAMA`;

  const image = document.querySelector("[data-profile-image]");
  const name = document.querySelector("[data-profile-name]");
  const details = document.querySelector("[data-profile-details]");
  const linkedin = document.querySelector("[data-profile-linkedin]");
  const email = document.querySelector("[data-profile-email]");

  image.src = profile.image;
  image.alt = profile.name;
  name.textContent = profile.name;
  profile.details.forEach(([label, value]) => details.append(createDetail(label, value)));

  linkedin.href = profile.linkedin;
  linkedin.setAttribute("aria-label", `${profile.name} LinkedIn`);

  if (profile.email) {
    email.href = `mailto:${profile.email}`;
    email.textContent = profile.email;
  } else {
    email.remove();
  }
}
