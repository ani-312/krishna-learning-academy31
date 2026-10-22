
"use strict";

// Krishna Learning Academy website interactions

const NCERT_URL = "https://ncert.nic.in/textbook.php";

const subjectsByClass = {
  1: ["English", "Hindi", "Mathematics", "EVS"],
  2: ["English", "Hindi", "Mathematics", "EVS"],
  3: ["English", "Hindi", "Mathematics", "EVS"],
  4: ["English", "Hindi", "Mathematics", "EVS"],
  5: ["English", "Hindi", "Mathematics", "EVS"],
  6: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
  7: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
  8: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
  9: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
  10: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
  11: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Accountancy", "Economics", "Business Studies"],
  12: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Accountancy", "Economics", "Business Studies"]
};

const sampleChapters = {
  "6|Science": [
    "Components of Food",
    "Sorting Materials into Groups",
    "Separation of Substances",
    "The Living Organisms and Their Surroundings"
  ],
  "7|Science": [
    "Nutrition in Plants",
    "Nutrition in Animals",
    "Heat",
    "Motion and Time"
  ],
  "8|Science": [
    "Crop Production and Management",
    "Microorganisms: Friend and Foe",
    "Force and Pressure",
    "Light"
  ],
  "9|Science": [
    "Matter in Our Surroundings",
    "Is Matter Around Us Pure?",
    "Atoms and Molecules",
    "Motion",
    "Force and Laws of Motion"
  ],
  "10|Science": [
    "Chemical Reactions and Equations",
    "Acids, Bases and Salts",
    "Life Processes",
    "Light — Reflection and Refraction",
    "The Human Eye and the Colourful World",
    "Electricity"
  ],
  "9|Mathematics": [
    "Number Systems",
    "Polynomials",
    "Coordinate Geometry",
    "Linear Equations in Two Variables",
    "Triangles"
  ],
  "10|Mathematics": [
    "Real Numbers",
    "Polynomials",
    "Pair of Linear Equations in Two Variables",
    "Quadratic Equations",
    "Triangles",
    "Introduction to Trigonometry"
  ],
  "11|Physics": [
    "Units and Measurements",
    "Motion in a Straight Line",
    "Motion in a Plane",
    "Laws of Motion",
    "Work, Energy and Power",
    "Thermal Properties of Matter"
  ],
  "11|Chemistry": [
    "Some Basic Concepts of Chemistry",
    "Structure of Atom",
    "Classification of Elements and Periodicity",
    "Chemical Bonding and Molecular Structure",
    "Thermodynamics",
    "Equilibrium"
  ],
  "12|Physics": [
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Ray Optics and Optical Instruments",
    "Wave Optics"
  ],
  "12|Chemistry": [
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "The d- and f-Block Elements",
    "Coordination Compounds"
  ],
  "11|Mathematics": [
    "Sets",
    "Relations and Functions",
    "Trigonometric Functions",
    "Complex Numbers and Quadratic Equations",
    "Sequences and Series"
  ],
  "12|Mathematics": [
    "Relations and Functions",
    "Inverse Trigonometric Functions",
    "Matrices",
    "Determinants",
    "Continuity and Differentiability",
    "Integrals"
  ]
};

const classGrid = document.getElementById("classGrid");
const classSelect = document.getElementById("classSelect");
const subjectSelect = document.getElementById("subjectSelect");
const chapterSearch = document.getElementById("chapterSearch");
const resourceGrid = document.getElementById("resourceGrid");
const resourceHeading = document.getElementById("resourceHeading");

// Create the class cards and dropdown options.
function initializeClasses() {
  for (let grade = 1; grade <= 12; grade++) {
    const option = document.createElement("option");
    option.value = String(grade);
    option.textContent = `Class ${grade}`;
    classSelect.appendChild(option);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "class-card";
    card.innerHTML = `
      <span class="class-arrow" aria-hidden="true">↗</span>
      <span class="class-number">${String(grade).padStart(2, "0")}</span>
      <span class="class-name">Class ${grade}</span>
      <span class="class-desc">${grade <= 5 ? "Primary" : grade <= 8 ? "Middle School" : grade <= 10 ? "Secondary" : "Senior Secondary"}</span>
    `;

    card.addEventListener("click", () => {
      classSelect.value = String(grade);
      updateSubjects();
      document.getElementById("library").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    classGrid.appendChild(card);
  }
}

function updateSubjects() {
  const grade = Number(classSelect.value);

  subjectSelect.innerHTML = '<option value="">Choose a subject</option>';
  subjectSelect.disabled = !grade;

  if (!grade || !subjectsByClass[grade]) {
    renderEmpty("Explore your resources", "Select a class and subject to get started.");
    return;
  }

  subjectsByClass[grade].forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  if (grade <= 5) {
    renderEmpty("Primary class resources", "Choose a subject, then open the official NCERT portal for the appropriate book.");
  } else {
    renderEmpty("Choose a subject", `Now select a subject for Class ${grade}.`);
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderEmpty(heading, message) {
  resourceHeading.textContent = heading;
  resourceGrid.replaceChildren();

  const state = createElement("div", "empty-state");
  state.append(
    createElement("div", "empty-icon", "📚"),
    createElement("h3", "", heading),
    createElement("p", "", message)
  );

  resourceGrid.appendChild(state);
}

function createResourceCard(chapter, grade, subject, isSample) {
  const card = createElement("article", "resource-card");

  card.appendChild(createElement("div", "resource-icon", "📘"));
  card.appendChild(createElement("h4", "", chapter));

  const description = isSample
    ? `Class ${grade} · ${subject} · Suggested chapter`
    : `Class ${grade} · ${subject} · Find the current textbook on NCERT`;

  card.appendChild(createElement("p", "", description));

  const actions = createElement("div", "resource-actions");
  const ncertLink = createElement("a", "", "Open NCERT ↗");
  ncertLink.href = NCERT_URL;
  ncertLink.target = "_blank";
  ncertLink.rel = "noopener noreferrer";
  ncertLink.setAttribute("aria-label", `Open official NCERT portal for ${chapter}`);

  actions.appendChild(ncertLink);
  card.appendChild(actions);

  return card;
}

function renderResources() {
  const grade = Number(classSelect.value);
  const subject = subjectSelect.value;
  const query = chapterSearch.value.trim().toLowerCase();

  if (!grade || !subject) {
    renderEmpty("Explore your resources", "Select both class and subject to see study resources.");
    return;
  }

  const key = `${grade}|${subject}`;
  const chapters = sampleChapters[key] || [];
  const filtered = chapters.filter((chapter) =>
    chapter.toLowerCase().includes(query)
  );

  resourceHeading.textContent = `Class ${grade} · ${subject}`;

  resourceGrid.replaceChildren();

  if (filtered.length > 0) {
    filtered.forEach((chapter) => {
      resourceGrid.appendChild(
        createResourceCard(chapter, grade, subject, true)
      );
    });
    return;
  }

  if (chapters.length === 0) {
    const card = createResourceCard(
      `${subject} — textbook and chapters`,
      grade,
      subject,
      false
    );
    resourceGrid.appendChild(card);

    const note = createElement(
      "p",
      "disclaimer",
      "A chapter-wise list has not been added for this subject yet. Use the official NCERT portal to locate the correct textbook."
    );
    resourceGrid.appendChild(note);
    return;
  }

  renderEmpty(
    "No matching chapters",
    "Try another search term or clear the search box."
  );
  resourceHeading.textContent = `Class ${grade} · ${subject}`;
}

classSelect.addEventListener("change", () => {
  chapterSearch.value = "";
  updateSubjects();
});

subjectSelect.addEventListener("change", () => {
  chapterSearch.value = "";
  renderResources();
});

chapterSearch.addEventListener("input", renderResources);

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Demo AI Study Buddy. This uses fixed sample answers, not a live AI API.
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text, sender) {
  const message = createElement(
    "div",
    `message ${sender === "user" ? "user-message" : "bot-message"}`,
    text
  );

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getTutorResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("mirror") || q.includes("optics") || q.includes("lens")) {
    return "Let's revise optics! For mirrors, the mirror formula is 1/f = 1/v + 1/u, using the Cartesian sign convention. Here f is focal length, v is image distance, and u is object distance. Always apply the sign convention consistently.";
  }

  if (q.includes("newton") || q.includes("force") || q.includes("motion")) {
    return "Newton's three laws, in simple terms:\n1. An object stays at rest or moves uniformly unless a net external force acts on it.\n2. Net force equals mass × acceleration: F = ma.\n3. Every action has an equal and opposite reaction.\nTry explaining one everyday example of each law.";
  }

  if (q.includes("study") || q.includes("timetable") || q.includes("revision")) {
    return "Try this study routine:\n1. Revise one concept for 25 minutes.\n2. Solve questions for 20 minutes.\n3. Take a 5-minute break.\n4. Write down what you learned without looking at your notes.\nConsistency is more useful than cramming.";
  }

  if (q.includes("photosynthesis") || q.includes("plant")) {
    return "Photosynthesis is the process by which green plants use sunlight, carbon dioxide and water to make glucose, releasing oxygen. Chlorophyll helps capture light energy. Remember the main inputs: sunlight, water and carbon dioxide.";
  }

  if (q.includes("hello") || q.includes("hi")) {
    return "Hello! 👋 Welcome to Krishna Learning Academy. Ask me about science, maths or study planning. I can give sample explanations in this demo.";
  }

  return "Good question! I'm currently a demo tutor and don't have a live AI connection. Try asking about Newton's laws, mirror formula, photosynthesis or study tips. For exact syllabus details, check your current textbook.";
}

function sendTutorMessage(text) {
  const question = text.trim();
  if (!question) return;

  addMessage(question, "user");
  chatInput.value = "";

  // The short delay makes the demo feel like a chat response.
  window.setTimeout(() => {
    addMessage(getTutorResponse(question), "bot");
  }, 250);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendTutorMessage(chatInput.value);
});

document.querySelectorAll(".prompt-chip").forEach((button) => {
  button.addEventListener("click", () => {
    sendTutorMessage(button.dataset.prompt || button.textContent);
  });
});

// Sample science quiz.
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");
const correctAnswers = {
  q1: "b",
  q2: "c",
  q3: "a"
};

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;
  let answered = 0;

  Object.entries(correctAnswers).forEach(([question, answer]) => {
    const selected = quizForm.querySelector(`input[name="${question}"]:checked`);

    if (selected) {
      answered++;
      if (selected.value === answer) score++;
    }
  });

  quizResult.className = "quiz-result";

  if (answered < Object.keys(correctAnswers).length) {
    quizResult.classList.add("retry");
    quizResult.textContent = `You've answered ${answered} of 3 questions. Please answer all questions before checking your score.`;
    return;
  }

  if (score === 3) {
    quizResult.classList.add("success");
    quizResult.textContent = `Excellent! You scored ${score}/3. Great work! 🎉`;
  } else {
    quizResult.classList.add("retry");
    quizResult.textContent = `You scored ${score}/3. Review the concepts and try again!`;
  }
});

// Dynamic copyright year.
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Start the page.
initializeClasses();
renderEmpty(
  "Explore your resources",
  "Select your class and subject to explore available study resources."
);
