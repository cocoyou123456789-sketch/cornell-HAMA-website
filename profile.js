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
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const profileDescription = `${profile.name}, ${profile.role} at Cornell HAMA.`;

  if (description) {
    description.setAttribute("content", profileDescription);
  }

  if (ogTitle) {
    ogTitle.setAttribute("content", `${profile.name} | Cornell HAMA`);
  }

  if (ogDescription) {
    ogDescription.setAttribute("content", profileDescription);
  }

  const image = document.querySelector("[data-profile-image]");
  const name = document.querySelector("[data-profile-name]");
  const details = document.querySelector("[data-profile-details]");
  const linkedin = document.querySelector("[data-profile-linkedin]");
  const email = document.querySelector("[data-profile-email]");

  image.src = profile.image;
  image.alt = profile.name;
  name.textContent = profile.name;
  profile.details
    .filter(([label]) => label !== "Previous Role(s)")
    .forEach(([label, value]) => details.append(createDetail(label, value)));

  linkedin.href = profile.linkedin;
  linkedin.textContent = `${profile.name} LinkedIn`;
  linkedin.setAttribute("aria-label", `${profile.name} LinkedIn`);

  if (profile.email) {
    email.href = `mailto:${profile.email}`;
    email.textContent = profile.email;
  } else {
    email.removeAttribute("href");
    email.textContent = "Email TBD";
  }
}
