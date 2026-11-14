import { destinations } from "./data.js";
import { hotels } from "./hotels-data.js";

// HTML ELEMENTS
const destinationGrid = document.getElementById("destinationGrid");
const hotelGrid = document.getElementById("hotelGrid");

const favoriteTemplate = document.getElementById("favoriteTemplate");

const emptyDestinations = document.getElementById("emptyDestinations");
const emptyHotels = document.getElementById("emptyHotels");

const destinationCount = document.getElementById("destinationCount");
const hotelCount = document.getElementById("hotelCount");

const FAVORITES_KEY = "wanderwiseFavorites";

// GET FAVORITES
function getFavorites() {
    try {
        const favorites = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        );

        return Array.isArray(favorites) ? favorites : [];
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

// UPDATE COUNTS
function updateCounts(destinationTotal, hotelTotal) {
    destinationCount.textContent = destinationTotal;
    hotelCount.textContent = hotelTotal;

    const total = getFavorites().length;

    document.querySelectorAll(".count").forEach(element => {
        element.textContent = total;
    });
}

// CREATE FAVORITE CARD
function createFavoriteCard(item, type) {
    const card = favoriteTemplate.content.cloneNode(true);

    const image = card.querySelector(".destination-image");
    const name = card.querySelector(".destination-name");
    const country = card.querySelector(".country-name");
    const category = card.querySelector(".destination-category");
    const rating = card.querySelector(".rating-value");
    const description = card.querySelector(".destination-description");
    const price = card.querySelector(".destination-price");
    const priceLabel = card.querySelector(".price-label");
    const link = card.querySelector(".destination-link");
    const favoriteButton = card.querySelector(".favorite-btn");

    image.src = item.image;
    image.alt = item.name;

    name.textContent = item.name;
    country.textContent = item.country || item.location;

    category.textContent = type === "hotel"
        ? item.category || "Hotel"
        : item.category || "Destination";

    rating.textContent = Number(item.rating || 4.8).toFixed(1);

    description.textContent = item.description;
    price.textContent = formatPrice(item.price);

    if (type === "hotel") {
        link.href = `hotel-details.html?id=${item.id}`;
        favoriteButton.dataset.favoriteId = `hotel-${item.id}`;
        priceLabel.textContent = "Price Per Night";
    } else {
        link.href = `destination-details.html?id=${item.id}`;
        favoriteButton.dataset.favoriteId = String(item.id);
        priceLabel.textContent = "Estimated Budget";
    }

    favoriteButton.classList.add("active");
    favoriteButton.setAttribute("aria-pressed", "true");
    favoriteButton.setAttribute("aria-label", "Remove from favorites");

    return card;
}

// DISPLAY DESTINATIONS
function displayDestinations(favorites) {
    const savedDestinations = destinations.filter(destination =>
        favorites.includes(String(destination.id))
    );

    destinationGrid.replaceChildren();

    savedDestinations.forEach(destination => {
        destinationGrid.appendChild(
            createFavoriteCard(destination, "destination")
        );
    });

    destinationGrid.hidden = savedDestinations.length === 0;
    emptyDestinations.hidden = savedDestinations.length !== 0;

    destinationCount.textContent = savedDestinations.length;

    return savedDestinations.length;
}

// DISPLAY HOTELS
function displayHotels(favorites) {
    const savedHotels = hotels.filter(hotel =>
        favorites.includes(`hotel-${hotel.id}`)
    );

    hotelGrid.replaceChildren();

    savedHotels.forEach(hotel => {
        hotelGrid.appendChild(
            createFavoriteCard(hotel, "hotel")
        );
    });

    hotelGrid.hidden = savedHotels.length === 0;
    emptyHotels.hidden = savedHotels.length !== 0;

    hotelCount.textContent = savedHotels.length;

    return savedHotels.length;
}

// DISPLAY ALL FAVORITES
function displayFavorites() {
    if (!favoriteTemplate) return;

    const favorites = getFavorites().map(String);

    const destinationTotal = displayDestinations(favorites);
    const hotelTotal = displayHotels(favorites);

    updateCounts(destinationTotal, hotelTotal);
}

// REMOVE FAVORITE
function removeFavorite(event) {
    const button = event.target.closest(".favorite-btn");

    if (!button) return;

    const favoriteId = button.dataset.favoriteId;

    if (!favoriteId) return;

    const updatedFavorites = getFavorites().filter(
        id => String(id) !== favoriteId
    );

    saveFavorites(updatedFavorites);

    displayFavorites();
}

// DESTINATION FAVORITE EVENTS
destinationGrid.addEventListener("click", removeFavorite);

// HOTEL FAVORITE EVENTS
hotelGrid.addEventListener("click", removeFavorite);

// INITIAL DISPLAY
displayFavorites();
