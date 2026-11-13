import { hotels } from "./hotels-data.js";

// HTML ELEMENTS
const hotelGrid = document.getElementById("allhotels");
const hotelTemplate = document.getElementById("hotelTemplate");
const searchInput = document.getElementById("searchhotel");
const categoryButtons = document.querySelectorAll(".category-filter");
const sortSelect = document.getElementById("sorthotels");
const hotelCount = document.getElementById("hotelCount");
const nohotels = document.getElementById("nohotels");
const resetButton = document.getElementById("resethotelFilters");

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

// FILTER hotels
function getFilteredhotels() {
    const searchText = searchInput.value.trim().toLowerCase();

    let filtered = hotels.filter(hotel => {
        const matchesSearch =
            hotel.name.toLowerCase().includes(searchText) ||
            hotel.location.toLowerCase().includes(searchText) ||
            hotel.category.toLowerCase().includes(searchText) ||
            hotel.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            hotel.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // SORT hotels
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

// CREATE hotel CARD FROM HTML TEMPLATE
function createhotelCard(hotel) {
    const card = hotelTemplate.content.cloneNode(true);

    const article = card.querySelector(".hotel-card");
    const image = card.querySelector(".hotel-image");
    const category = card.querySelector(".hotel-category");
    const favoriteButton = card.querySelector(".favorite-btn");
    const country = card.querySelector(".country-name");
    const rating = card.querySelector(".rating-value");
    const name = card.querySelector(".hotel-name");
    const description = card.querySelector(".hotel-description");
    const price = card.querySelector(".hotel-price");
    const link = card.querySelector(".hotel-link");

    const favorites = getFavorites();
    const isFavorite = favorites.includes(hotel.id);

    article.dataset.id = hotel.id;

    image.src = hotel.image;
    image.alt = hotel.name;

    category.textContent = hotel.category;
    country.textContent = hotel.country;
    rating.textContent = Number(hotel.rating || 4.8).toFixed(1);

    name.textContent = hotel.name;
    description.textContent = hotel.description;
    price.textContent = formatPrice(hotel.price);

    link.href = `hotel-details.html?id=${hotel.id}`;

    favoriteButton.dataset.id = hotel.id;
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

// DISPLAY hotels
function displayhotels() {
    const filtered = getFilteredhotels();

    hotelGrid.replaceChildren();

    filtered.forEach(hotel => {
        hotelGrid.appendChild(createhotelCard(hotel));
    });

    hotelCount.textContent =
        `Showing ${filtered.length} ${filtered.length === 1 ? "hotel" : "hotels"}`;

    nohotels.hidden = filtered.length !== 0;
    hotelGrid.hidden = filtered.length === 0;

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

        displayhotels();
    });
});

// SEARCH
searchInput.addEventListener("input", displayhotels);

// SORT
sortSelect.addEventListener("change", displayhotels);

// FAVORITES
hotelGrid.addEventListener("click", event => {
    const button = event.target.closest(".favorite-btn");

    if (!button) return;

    const hotelId = Number(button.dataset.id);
    const favorites = getFavorites();

    const updatedFavorites = favorites.includes(hotelId)
        ? favorites.filter(id => id !== hotelId)
        : [...favorites, hotelId];

    saveFavorites(updatedFavorites);
    displayhotels();
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

    displayhotels();
});

// INITIAL DISPLAY
displayhotels();