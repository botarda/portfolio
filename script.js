document.addEventListener("DOMContentLoaded", () => {

    const box = document.getElementById("contactChoice");
    const noBtn = document.getElementById("noBtn");
    const hint = document.getElementById("choiceHint");

    if (!box || !noBtn) {
        console.error("Elementos do botão não encontrados.");
        return;
    }

    const messages = [
        "Tudo começa com uma oportunidade. 🙂",
        "Se aceitam sugestões."
    ];

    let attempts = 0;

    function runAway() {

        const boxRect = box.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();

        // Primeira vez que foge
        if (!noBtn.classList.contains("running")) {

            noBtn.classList.add("running");

            noBtn.style.left =
                `${buttonRect.left - boxRect.left}px`;

            noBtn.style.top =
                `${buttonRect.top - boxRect.top}px`;
        }

        // Área disponível
        const maxX =
            box.clientWidth - noBtn.offsetWidth;

        const maxY =
            box.clientHeight - noBtn.offsetHeight;

        // Nova posição aleatória
        const x =
            Math.random() * Math.max(0, maxX);

        const y =
            Math.random() * Math.max(0, maxY);

        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;

        // Mensagem
        if (hint) {
            hint.textContent =
                messages[attempts % messages.length];
        }

        attempts++;
    }

    // Desktop / rato
    noBtn.addEventListener(
        "mouseenter",
        runAway
    );

    // Telemóvel / tablet
    noBtn.addEventListener(
        "touchstart",
        (event) => {
            event.preventDefault();
            runAway();
        },
        { passive: false }
    );

});


const themeToggle = document.querySelector("#theme-toggle");

if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    const label = themeToggle.querySelector("span");

    function setTheme(theme) {
        const isDark = theme === "dark";

        document.documentElement.dataset.theme = theme;

        icon.className = isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

        label.textContent = isDark ? "CLARO" : "ESCURO";

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Ativar tema claro" : "Ativar tema escuro"
        );

        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    const savedTheme = localStorage.getItem("theme");

    const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches ? "dark" : "light";

    setTheme(
        savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : systemTheme
    );

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.dataset.theme;

        const nextTheme =
            currentTheme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });
}
