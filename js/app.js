
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
        const isOpen = mobileMenu.classList.toggle("open");

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });
}
