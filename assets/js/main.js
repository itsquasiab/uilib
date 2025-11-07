// main.js
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
    if (theme === "system") {
        const systemTheme = prefersDark.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", systemTheme);
    } else {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

// Load theme on every page
(function initTheme() {
    const saved = localStorage.getItem("theme") || "system";
    applyTheme(saved);
})();

// Listen for system changes if using system theme
prefersDark.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system") {
        applyTheme("system");
    }
});

// Optional: attach to buttons if they exist on this page
document.addEventListener("DOMContentLoaded", () => {
    const lightBtn = document.getElementById("light-btn");
    const darkBtn = document.getElementById("dark-btn");
    const systemBtn = document.getElementById("system-btn");

    if (lightBtn) lightBtn.addEventListener("click", () => {
        localStorage.setItem("theme", "light");
        applyTheme("light");
    });

    if (darkBtn) darkBtn.addEventListener("click", () => {
        localStorage.setItem("theme", "dark");
        applyTheme("dark");
    });

    if (systemBtn) systemBtn.addEventListener("click", () => {
        localStorage.setItem("theme", "system");
        applyTheme("system");
    });
});
