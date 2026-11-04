import { destinations } from "./data.js";

// HTML ELEMENTS
const destinationGrid = document.getElementById("allDestinations");
const destinationTemplate = document.getElementById("destinationTemplate");
const searchInput = document.getElementById("searchDestination");
const categoryButtons = document.querySelectorAll(".category-filter");
const sortSelect = document.getElementById("sortDestinations");
const destinationCount = document.getElementById("destinationCount");
const noDestinations = document.getElementById("noDestinations");
const resetButton = document.getElementById("resetDestinationFilters");

// STORAGE
const FAVORITES_KEY = "wanderwiseFavorites";

let selectedCategory = "All";

function getFavorites() {
    try {
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(favorites) ? favorites : [];
    } catch {
        return [];
    }
}

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

// FILTER DESTINATIONS
function getFilteredDestinations() {
    const searchText = searchInput.value.trim().toLowerCase();

    let filtered = destinations.filter(destination => {
        const matchesSearch =
            destination.name.toLowerCase().includes(searchText) ||
            destination.country.toLowerCase().includes(searchText) ||
            destination.category.toLowerCase().includes(searchText) ||
            destination.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            destination.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // SORT DESTINATIONS
    switch (sortSelect.value) {
        case "price-low":
            filtered.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            filtered.sort((a, b) => b.price - a.price);
            break;

        case "name":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "rating":
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;

        default:
            filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
}

// CREATE DESTINATION CARD FROM HTML TEMPLATE
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

// DISPLAY DESTINATIONS
function displayDestinations() {
    const filtered = getFilteredDestinations();

    destinationGrid.replaceChildren();

    filtered.forEach(destination => {
        destinationGrid.appendChild(createDestinationCard(destination));
    });

    destinationCount.textContent =
        `Showing ${filtered.length} ${filtered.length === 1 ? "destination" : "destinations"}`;

    noDestinations.hidden = filtered.length !== 0;
    destinationGrid.hidden = filtered.length === 0;

    updateFavoriteCounts();
}

// CATEGORY FILTER BUTTONS
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        categoryButtons.forEach(item => {
            const isActive = item === button;

            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        displayDestinations();
    });
});

// SEARCH
searchInput.addEventListener("input", displayDestinations);

// SORT
sortSelect.addEventListener("change", displayDestinations);

// FAVORITES
destinationGrid.addEventListener("click", event => {
    const button = event.target.closest(".favorite-btn");

    if (!button) return;

    const destinationId = Number(button.dataset.id);
    const favorites = getFavorites();

    const updatedFavorites = favorites.includes(destinationId)
        ? favorites.filter(id => id !== destinationId)
        : [...favorites, destinationId];

    saveFavorites(updatedFavorites);
    displayDestinations();
});

// RESET FILTERS
resetButton.addEventListener("click", () => {
    searchInput.value = "";
    selectedCategory = "All";
    sortSelect.value = "featured";

    categoryButtons.forEach(button => {
        const isActive = button.dataset.category === "All";

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    displayDestinations();
});

// INITIAL DISPLAY
displayDestinations();