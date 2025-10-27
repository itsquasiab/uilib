document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  const lightBtn = document.getElementById("light-btn");
  const darkBtn = document.getElementById("dark-btn");
  //const systemBtn = document.getElementById("system-btn");

  function setTheme(theme) {
    if (theme === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }

  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  // Safe to attach now
  lightBtn.onclick = () => setTheme("light");
  darkBtn.onclick = () => setTheme("dark");
  systemBtn.onclick = () => setTheme("system");
});
