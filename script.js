/* =========================================================
   Hema Priya R - Portfolio scripts (plain vanilla JS)
   ========================================================= */

/* ---------- 1. Projects data ----------
   To add a project, add one object to this array. */
var projects = [
  {
    name: "[PROJECT 1 NAME]",
    description: "[ONE LINE DESCRIPTION]",
    tech: ["C", "DSA"],
    githubUrl: "https://github.com/hema78924"
  },
  {
    name: "[PROJECT 2 NAME]",
    description: "[ONE LINE DESCRIPTION]",
    tech: ["HTML", "JavaScript"],
    githubUrl: "https://github.com/hema78924"
  }
];

/* ---------- 2. Reusable ProjectCard ----------
   Returns the HTML for one project card as a template string. */
function createProjectCard(project) {
  var techTags = project.tech
    .map(function (item, index) {
      var colour = index % 2 === 0 ? "chip-pink" : "chip-lavender";
      return `<li class="chip ${colour}">${item}</li>`;
    })
    .join("");

  return `
    <article class="project-card panel">
      <h3 class="project-name">${project.name}</h3>
      <p class="project-description">${project.description}</p>
      <ul class="project-tech" aria-label="Tech stack">${techTags}</ul>
      <a class="btn btn-small" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
         aria-label="View ${project.name} on GitHub (opens in a new tab)">View on GitHub</a>
    </article>
  `;
}

/* Loop over the array and insert every card into the grid */
function renderProjects() {
  var grid = document.querySelector("#projects-grid");
  var html = "";

  for (var i = 0; i < projects.length; i++) {
    html += createProjectCard(projects[i]);
  }

  grid.innerHTML = html;
}

/* ---------- 3. Mobile hamburger menu ---------- */
var navToggle = document.querySelector(".nav-toggle");
var navMenu = document.querySelector("#nav-menu");

function setMenu(isOpen) {
  navMenu.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", function () {
  var isOpen = navMenu.classList.contains("open");
  setMenu(!isOpen);
});

/* Close the menu after choosing a link */
navMenu.addEventListener("click", function (event) {
  if (event.target.classList.contains("nav-link")) {
    setMenu(false);
  }
});

/* ---------- 4. Highlight the active nav link while scrolling ---------- */
var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  var scrollPosition = window.scrollY + window.innerHeight * 0.35;
  var currentId = "";

  sections.forEach(function (section) {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  /* At the very bottom of the page, highlight the last section */
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
    currentId = sections[sections.length - 1].id;
  }

  navLinks.forEach(function (link) {
    var isActive = link.getAttribute("href") === "#" + currentId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

/* ---------- 5. Contact form (UI only for now) ---------- */
var form = document.querySelector("#contact-form");
var formStatus = document.querySelector("#form-status");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Show or clear an error message under one field */
function setFieldError(field, message) {
  var errorBox = document.querySelector("#" + field.id + "-error");
  errorBox.textContent = message;
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
}

function validateForm() {
  var nameField = form.querySelector("#name");
  var emailField = form.querySelector("#email");
  var messageField = form.querySelector("#message");
  var isValid = true;

  if (nameField.value.trim() === "") {
    setFieldError(nameField, "Please enter your name.");
    isValid = false;
  } else {
    setFieldError(nameField, "");
  }

  if (emailField.value.trim() === "") {
    setFieldError(emailField, "Please enter your email.");
    isValid = false;
  } else if (!isValidEmail(emailField.value.trim())) {
    setFieldError(emailField, "Please enter a valid email address.");
    isValid = false;
  } else {
    setFieldError(emailField, "");
  }

  if (messageField.value.trim() === "") {
    setFieldError(messageField, "Please write a message.");
    isValid = false;
  } else {
    setFieldError(messageField, "");
  }

  return isValid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  formStatus.textContent = "";

  if (!validateForm()) {
    var firstInvalid = form.querySelector("[aria-invalid='true']");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  /* BACKEND CALL GOES HERE LATER:
     send the name, email and message to a server or email service,
     then show the success message below only when it succeeds. */

  formStatus.textContent = "Thanks! This form is not connected yet.";
  form.reset();
});

/* ---------- Start ---------- */
renderProjects();
updateActiveLink();
