const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");

        const isOpen = mobileMenu.classList.contains("open");

        menuBtn.setAttribute("aria-expanded", isOpen);
    });
}





