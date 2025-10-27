const root = document.documentElement;
const themeBtns = document.querySelectorAll(".mode-btn");

function setTheme(theme) {
  if (theme === "system") {
    root.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  } else {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
  updateActive(theme);
}

function updateActive(theme) {
  themeBtns.forEach(btn => btn.classList.remove("active"));
  document.getElementById(`${theme}-btn`)?.classList.add("active");
}

// Load saved theme
const saved = localStorage.getItem("theme");
if (saved) {
  root.setAttribute("data-theme", saved);
  updateActive(saved);
} else {
  updateActive("system");
}

// Button handlers
document.getElementById("light-btn").onclick = () => setTheme("light");
document.getElementById("dark-btn").onclick = () => setTheme("dark");
document.getElementById("system-btn").onclick = () => setTheme("system");