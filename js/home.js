import { destinations } from "./data.js";

const destinationGrid = document.getElementById("homeDestinations");
const destinationTemplate = document.getElementById("homeDestinationTemplate");

const FAVORITES_KEY = "wanderwiseFavorites";

// GET FAVORITES
function getFavorites() {
    try {
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(favorites) ? favorites : [];
    } catch {
        return [];
    }
}

// SAVE FAVORITES
function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// FORMAT PRICE
function formatPrice(price) {
    return `PKR ${Number(price).toLocaleString("en-PK")}`;
}

// UPDATE FAVORITE COUNTS
function updateFavoriteCounts() {
    const total = getFavorites().length;

    document.querySelectorAll(".count").forEach(element => {
        element.textContent = total;
    });
}

// CREATE DESTINATION CARD
function createDestinationCard(destination) {
    const card = destinationTemplate.content.cloneNode(true);

    const article = card.querySelector(".destination-card");
    const image = card.querySelector(".destination-image");
    const category = card.querySelector(".destination-category");
    const favoriteButton = card.querySelector(".favorite-btn");
    const country = card.querySelector(".country-name");
    const rating = card.querySelector(".rating-value");
    const name = card.querySelector(".destination-name");
    const description = card.querySelector(".destination-description");
    const price = card.querySelector(".destination-price");
    const link = card.querySelector(".destination-link");

    const favorites = getFavorites();
    const isFavorite = favorites.includes(destination.id);

    article.dataset.id = destination.id;

    image.src = destination.image;
    image.alt = destination.name;

    category.textContent = destination.category;
    country.textContent = destination.country;
    rating.textContent = Number(destination.rating || 4.8).toFixed(1);

    name.textContent = destination.name;
    description.textContent = destination.description;
    price.textContent = formatPrice(destination.price);

    link.href = `destination-details.html?id=${destination.id}`;

    favoriteButton.dataset.id = destination.id;
    favoriteButton.classList.toggle("active", isFavorite);
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.setAttribute(
        "aria-label",
        isFavorite ? "Remove from favorites" : "Add to favorites"
    );

    const heartIcon = favoriteButton.querySelector("i");

    heartIcon.className = isFavorite
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";

    return card;
}

// DISPLAY ONLY THREE DESTINATIONS
function displayHomeDestinations() {
    if (!destinationGrid || !destinationTemplate) return;

    destinationGrid.replaceChildren();

    const featuredDestinations = destinations.slice(0, 3);

    featuredDestinations.forEach(destination => {
        destinationGrid.appendChild(createDestinationCard(destination));
    });

    updateFavoriteCounts();
}

// FAVORITE BUTTON
if (destinationGrid) {
    destinationGrid.addEventListener("click", event => {
        const button = event.target.closest(".favorite-btn");

        if (!button) return;

        const destinationId = Number(button.dataset.id);
        const favorites = getFavorites();

        const updatedFavorites = favorites.includes(destinationId)
            ? favorites.filter(id => id !== destinationId)
            : [...favorites, destinationId];

        saveFavorites(updatedFavorites);
        displayHomeDestinations();
    });
}

// INITIAL DISPLAY
displayHomeDestinations();



// ==========================================
// WANDERWISE - HOME USER SYSTEM
// =====================================


// GET CURRENT USER

function getCurrentUser() {

    try {

        const user = JSON.parse(
            localStorage.getItem("wanderwiseCurrentUser")
        );

        return user;

    } catch (error) {

        return null;

    }

}


// SHOW USER NAME ON HOME PAGE

function updateHomeUser() {

    const user = getCurrentUser();

    if (!user || !user.name) {
        return;
    }

    // FIND GET STARTED BUTTONS

    const buttons = document.querySelectorAll(
        "a, button"
    );

    buttons.forEach(function(button) {

        const buttonText = button.textContent.trim().toLowerCase();

        if (buttonText === "get started") {

            button.textContent = user.name;

            // Prevent returning to signup
            button.addEventListener("click", function(event) {
                event.preventDefault();
            });

        }

    });

}


// RUN FUNCTION

updateHomeUser();




// =====================================
// WANDERWISE - HOME LOGIN / LOGOUT
// =====================================

function updateWanderWiseAuth() {

    // GET CURRENT USER

    let user = null;

    try {

        user = JSON.parse(
            localStorage.getItem("wanderwiseCurrentUser")
        );

    } catch (error) {

        user = null;

    }


    // HOME PAGE BUTTONS

    const desktopLogin = document.querySelector(
        ".nav-buttons .login-btn"
    );

    const desktopStart = document.querySelector(
        ".nav-buttons .start-btn"
    );

    const mobileLogin = document.querySelector(
        '#mobile-menu a[href="login.html"]'
    );

    const mobileSignup = document.querySelector(
        '#mobile-menu a[href="signup.html"]'
    );


    // IF USER IS NOT LOGGED IN

    if (!user || !user.name) {
        return;
    }


    // LOGOUT FUNCTION

    function logoutUser(event) {

        event.preventDefault();

        localStorage.removeItem(
            "wanderwiseCurrentUser"
        );

        window.location.href = "index.html";

    }


    // DESKTOP LOGIN TO LOGOUT

    if (desktopLogin) {

        desktopLogin.textContent = "Logout";
        desktopLogin.href = "#";

        desktopLogin.addEventListener(
            "click",
            logoutUser
        );

    }


    // DESKTOP GET STARTED TO USER NAME

    if (desktopStart) {

        desktopStart.textContent = user.name;
        desktopStart.href = "my-trips.html";

    }


    // MOBILE LOGIN TO LOGOUT

    if (mobileLogin) {

        mobileLogin.innerHTML =
            '<i class="fa-solid fa-right-from-bracket"></i> Logout';

        mobileLogin.href = "#";

        mobileLogin.addEventListener(
            "click",
            logoutUser
        );

    }


    // MOBILE CREATE ACCOUNT TO USER NAME

    if (mobileSignup) {

        mobileSignup.innerHTML =
            '<i class="fa-solid fa-user"></i> ' + user.name;

        mobileSignup.href = "my-trips.html";

    }

}


// RUN FUNCTION

updateWanderWiseAuth();
