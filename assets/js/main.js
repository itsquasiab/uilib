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

// Toggle mobile nav
function toggleNav() {
    const nav = document.getElementById("nav-content");
    const dropdowns = nav.querySelectorAll(".nav-dropdown.open");
    nav.classList.toggle("responsive");

    // When closing nav, also close any open dropdowns
    if (!nav.classList.contains("responsive")) {
        dropdowns.forEach(d => d.classList.remove("open"));
    }
}

// Dropdown open on click
document.querySelectorAll(".nav-dropdown > button").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = e.currentTarget.closest(".nav-dropdown");
        dropdown.classList.toggle("open");
    });
});

// Close dropdowns and nav when clicking elsewhere
document.addEventListener("click", e => {
    const nav = document.getElementById("nav-content");
    const menuIcon = document.querySelector(".menu-icon");

    // Close open dropdowns if clicking outside them
    document.querySelectorAll(".nav-dropdown.open").forEach(d => {
        if (!d.contains(e.target)) d.classList.remove("open");
    });

    // Close nav-content if clicking outside nav and menu icon
    if (
        nav.classList.contains("responsive") &&
        !nav.contains(e.target) &&
        !menuIcon.contains(e.target)
    ) {
        nav.classList.remove("responsive");

        // Close all dropdowns as well
        document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
    }
});