import { destinations } from "./data.js";

// HTML ELEMENTS
const favoriteGrid = document.getElementById("favoriteGrid");
const favoriteTemplate = document.getElementById("favoriteTemplate");
const emptyFavorites = document.getElementById("emptyFavorites");

const FAVORITES_KEY = "wanderwiseFavorites";

// GET SAVED FAVORITES
function getFavorites() {
    try {
        const favorites = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        );

        return Array.isArray(favorites)
            ? favorites.map(Number).filter(Number.isFinite)
            : [];
    } catch {
        return [];
    }
}

// SAVE FAVORITES
function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

// FORMAT PRICE
function formatPrice(price) {
    return `PKR ${Number(price).toLocaleString("en-PK")}`;
}

// UPDATE FAVORITE COUNT
function updateFavoriteCount() {
    const total = getFavorites().length;

    document.querySelectorAll(".count").forEach(element => {
        element.textContent = total;
    });
}

// CREATE FAVORITE CARD
function createFavoriteCard(destination) {
    const card = favoriteTemplate.content.cloneNode(true);

    const image = card.querySelector(".destination-image");
    const name = card.querySelector(".destination-name");
    const country = card.querySelector(".country-name");
    const category = card.querySelector(".destination-category");
    const rating = card.querySelector(".rating-value");
    const description = card.querySelector(".destination-description");
    const price = card.querySelector(".destination-price");
    const link = card.querySelector(".destination-link");
    const favoriteButton = card.querySelector(".favorite-btn");

    image.src = destination.image;
    image.alt = destination.name;

    name.textContent = destination.name;
    country.textContent = destination.country;

    if (category) {
        category.textContent = destination.category;
    }

    rating.textContent = Number(destination.rating || 4.8).toFixed(1);

    description.textContent = destination.description;
    price.textContent = formatPrice(destination.price);

    link.href = `destination-details.html?id=${destination.id}`;

    favoriteButton.dataset.id = destination.id;

    return card;
}

// DISPLAY FAVORITES
function displayFavorites() {
    if (!favoriteGrid || !favoriteTemplate || !emptyFavorites) return;

    const favoriteIds = getFavorites();

    const savedDestinations = destinations.filter(destination =>
        favoriteIds.includes(Number(destination.id))
    );

    favoriteGrid.replaceChildren();

    savedDestinations.forEach(destination => {
        favoriteGrid.appendChild(
            createFavoriteCard(destination)
        );
    });

    emptyFavorites.hidden = savedDestinations.length !== 0;
    favoriteGrid.hidden = savedDestinations.length === 0;

    updateFavoriteCount();
}

// REMOVE FAVORITE
favoriteGrid.addEventListener("click", event => {
    const button = event.target.closest(".favorite-btn");

    if (!button) return;

    const destinationId = Number(button.dataset.id);

    const updatedFavorites = getFavorites().filter(
        id => id !== destinationId
    );

    saveFavorites(updatedFavorites);

    displayFavorites();
});

// INITIAL DISPLAY
displayFavorites();