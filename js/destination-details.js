import { destinations } from "./data.js";
import { hotels } from "./hotels-data.js";

const detailsHero = document.getElementById("detailsHero");
const destinationName = document.getElementById("destinationName");
const heroCategory = document.getElementById("heroCategory");
const heroCountry = document.getElementById("heroCountry");
const heroRating = document.getElementById("heroRating");

const destinationDescription = document.getElementById("destinationDescription");
const destinationPrice = document.getElementById("destinationPrice");

const highlightsList = document.getElementById("highlightsList");
const recommendedSeason = document.getElementById("recommendedSeason");

const infoCategory = document.getElementById("infoCategory");
const infoCountry = document.getElementById("infoCountry");
const infoSeason = document.getElementById("infoSeason");

const hotelSectionDestination = document.getElementById("hotelSectionDestination");
const recommendedHotels = document.getElementById("recommendedHotels");
const hotelTemplate = document.getElementById("recommendedHotelTemplate");
const noHotelsMessage = document.getElementById("noHotelsMessage");

const favoriteButton = document.getElementById("favoriteButton");
const planTripButton = document.getElementById("planTripButton");
const budgetButton = document.getElementById("budgetButton");

// =====================================
// STORAGE
// =====================================

const FAVORITES_KEY = "wanderwiseFavorites";

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

function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

// =====================================
// GET DESTINATION ID FROM URL
// =====================================

const params = new URLSearchParams(window.location.search);
const destinationId = Number(params.get("id"));

const destination = destinations.find(
    item => Number(item.id) === destinationId
);

// =====================================
// DESTINATION EXTRA INFORMATION
// =====================================


const destinationInfo = {
    1: {
        season: "All time",
        highlights: [
            "Masjid al-Haram",
            "Kaaba and Mataf",
            "Jabal al-Noor",
            "Makkah Clock Tower"
        ]
    },

    2: {
        season: "April to June and September to October",
        highlights: [
            "Eiffel Tower",
            "Louvre Museum",
            "Arc de Triomphe",
            "Seine River Cruise"
        ]
    },

    3: {
        season: "April to October",
        highlights: [
            "Altit and Baltit Forts",
            "Attabad Lake Boating",
            "Passu Cones View",
            "Hunza Local Food"
        ]
    },

    4: {
        season: "May to September",
        highlights: [
            "Shangrila Resort",
            "Upper Kachura Lake",
            "Deosai National Park",
            "Katpana Cold Desert"
        ]
    },

    5: {
        season: "March to May and September to November",
        highlights: [
            "Hagia Sophia",
            "Blue Mosque",
            "Grand Bazaar",
            "Bosphorus Cruise"
        ]
    },

    6: {
        season: "April to October",
        highlights: [
            "Ubud Rice Terraces",
            "Uluwatu Temple",
            "Kuta Beach",
            "Bali Waterfalls"
        ]
    },

    7: {
        season: "November to March",
        highlights: [
            "Burj Khalifa",
            "Dubai Mall",
            "Palm Jumeirah",
            "Desert Safari"
        ]
    },

    8: {
        season: "November to April",
        highlights: [
            "Maafushi Island",
            "Underwater Snorkeling",
            "White Sand Beaches",
            "Coral Reef Exploration"
        ]
    },

    9: {
        season: "April to October",
        highlights: [
            "Malam Jabba",
            "Kalam Valley",
            "Mahodand Lake",
            "Swat River"
        ]
    },

    10: {
        season: "May to September",
        highlights: [
            "Saif-ul-Malook Lake",
            "Lulusar Lake",
            "Babusar Top",
            "Kunhar River"
        ]
    },

    11: {
        season: "May to September",
        highlights: [
            "Mall Road",
            "Patriata Chairlift",
            "Pindi Point",
            "Kashmir Point"
        ]
    },

    12: {
        season: "June to September",
        highlights: [
            "Nanga Parbat View",
            "Beyal Camp",
            "Fairy Meadows",
            "Mountain Camping"
        ]
    },

    13: {
        season: "May to September",
        highlights: [
            "Big Ben",
            "Tower Bridge",
            "Buckingham Palace",
            "London Eye"
        ]
    },

    14: {
        season: "April to June and September to November",
        highlights: [
            "Statue of Liberty",
            "Times Square",
            "Central Park",
            "Empire State Building"
        ]
    },

    15: {
        season: "March to May and September to November",
        highlights: [
            "Tokyo Skytree",
            "Shibuya Crossing",
            "Senso-ji Temple",
            "Mount Fuji Views"
        ]
    },

    16: {
        season: "April to October",
        highlights: [
            "Blue Dome Churches",
            "Oia Sunset Views",
            "Red Beach",
            "Fira Village"
        ]
    },

    17: {
        season: "November to April",
        highlights: [
            "Patong Beach",
            "Phi Phi Islands",
            "Big Buddha",
            "Phang Nga Bay"
        ]
    },

    18: {
        season: "June to September and December to March",
        highlights: [
            "Swiss Alps",
            "Lake Geneva",
            "Jungfraujoch",
            "Interlaken"
        ]
    },

    19: {
        season: "April to June and September to October",
        highlights: [
            "Hot Air Balloon Rides",
            "Fairy Chimneys",
            "Goreme Open Air Museum",
            "Underground Cities"
        ]
    },

    20: {
        season: "November to March",
        highlights: [
            "Sheikh Zayed Grand Mosque",
            "Louvre Abu Dhabi",
            "Qasr Al Watan",
            "Corniche Beach"
        ]
    },

    21: {
        season: "April to June and September to October",
        highlights: [
            "Flame Towers",
            "Icherisheher Old City",
            "Baku Boulevard",
            "Maiden Tower"
        ]
    },

    22: {
        season: "April to June and September to October",
        highlights: [
            "Colosseum",
            "Trevi Fountain",
            "Roman Forum",
            "Vatican City"
        ]
    },

    23: {
        season: "October to April",
        highlights: [
            "Great Pyramids of Giza",
            "Sphinx",
            "Egyptian Museum",
            "Khan el-Khalili Bazaar"
        ]
    },

    24: {
        season: "December to February and June to August",
        highlights: [
            "Lake Wakatipu",
            "Milford Sound",
            "Skyline Gondola",
            "Remarkables Mountains"
        ]
    },

    25: {
        season: "November to April",
        highlights: [
            "Langkawi Sky Bridge",
            "Eagle Square",
            "Pantai Cenang Beach",
            "Kilim Geoforest Park"
        ]
    },

    // --- 26. Amsterdam, Netherlands ---
    26: {
        season: "April to May and September to November",
        highlights: [
            "Canal Cruise",
            "Rijksmuseum",
            "Anne Frank House",
            "Vondelpark"
        ]
    },

    // --- 27. Kuala Lumpur, Malaysia ---
    27: {
        season: "May to July and December to February",
        highlights: [
            "Petronas Twin Towers",
            "Batu Caves",
            "KL Tower",
            "Bukit Bintang"
        ]
    },

    // --- 28. Venice, Italy ---
    28: {
        season: "April to June and September to October",
        highlights: [
            "Grand Canal",
            "St. Mark's Basilica",
            "Rialto Bridge",
            "Doge's Palace"
        ]
    },

    // --- 29. Antalya, Turkey ---
    29: {
        season: "April to June and September to October",
        highlights: [
            "Konyaalti Beach",
            "Kaleici Old Town",
            "Duden Waterfalls",
            "Hadrian's Gate"
        ]
    },

    // --- 30. Yerevan, Armenia ---
    30: {
        season: "May to June and September to October",
        highlights: [
            "Republic Square",
            "Cascade Complex",
            "Garni Temple",
            "Lake Sevan"
        ]
    }
};


// Default information for destinations without custom highlights
const defaultInfo = {
    season: "March to October",
    highlights: [
        "Explore famous attractions",
        "Discover local culture",
        "Enjoy beautiful views",
        "Taste local food"
    ]
};

// =====================================
// FORMAT PRICE
// =====================================

function formatPrice(price) {
    return `PKR ${Number(price).toLocaleString("en-PK")}`;
}

// =====================================
// SHOW ERROR IF DESTINATION NOT FOUND
// =====================================

if (!destination) {
    document.title = "Destination Not Found | WanderWise";
    const container = document.querySelector(".details-container");
    const errorBox = document.createElement("div");
    errorBox.className = "destination-not-found";
    const heading = document.createElement("h2");
    heading.textContent = "Destination Not Found";
    const message = document.createElement("p");
    message.textContent = "The destination you are looking for does not exist.";
    const link = document.createElement("a");
    link.href = "destinations.html";
    link.textContent = "Explore Destinations";
    errorBox.append(heading, message, link);
    container.replaceChildren(errorBox);
} else {

    // =====================================
    // DISPLAY DESTINATION DETAILS
    // =====================================

    function displayDestination() {

        const info = destinationInfo[destination.id] || defaultInfo;

        document.title = `${destination.name} | WanderWise`;

        detailsHero.style.backgroundImage =
            `url("${destination.image}")`;

        destinationName.textContent = destination.name;

        heroCategory.textContent = destination.category;
        heroCountry.textContent = destination.country;
        heroRating.textContent = Number(destination.rating || 4.8).toFixed(1);

        destinationDescription.textContent =
            destination.description;

        destinationPrice.textContent =
            formatPrice(destination.price);

        recommendedSeason.textContent = info.season;

        infoCategory.textContent = destination.category;
        infoCountry.textContent = destination.country;
        infoSeason.textContent = info.season;

        hotelSectionDestination.textContent =
            destination.name;

        // HIGHLIGHTS
        highlightsList.replaceChildren();

        info.highlights.forEach(highlight => {

            const item = document.createElement("span");
            const icon = document.createElement("i");

            icon.className = "fas fa-check";

            item.append(icon, document.createTextNode(highlight));

            highlightsList.appendChild(item);

        });

        // UPDATE BUTTON LINKS
        planTripButton.href =
            `trip-planner.html?destination=${destination.id}`;

        budgetButton.href =
            `budget-calculator.html?destination=${destination.id}`;

        updateFavoriteButton();
    }

    // =====================================
    // FAVORITES
    // =====================================

    function updateFavoriteButton() {

        const favorites = getFavorites();

        const isFavorite = favorites.includes(
            Number(destination.id)
        );

        favoriteButton.classList.toggle("active", isFavorite);

        const icon = favoriteButton.querySelector("i");
        const text = favoriteButton.querySelector("span");

        icon.className = isFavorite
            ? "fas fa-heart"
            : "far fa-heart";

        text.textContent = isFavorite
            ? "Saved in Favorites"
            : "Save to Favorites";

        favoriteButton.setAttribute(
            "aria-pressed",
            String(isFavorite)
        );
    }

    favoriteButton.addEventListener("click", () => {

        const favorites = getFavorites();
        const id = Number(destination.id);

        const updatedFavorites = favorites.includes(id)
            ? favorites.filter(item => item !== id)
            : [...favorites, id];

        saveFavorites(updatedFavorites);

        updateFavoriteButton();
        updateFavoriteCounts();

    });

    // =====================================
    // FAVORITE NAVIGATION COUNT
    // =====================================

    function updateFavoriteCounts() {

        const total = getFavorites().length;

        document.querySelectorAll(".count").forEach(element => {
            element.textContent = total;
        });

    }

    // =====================================
    // GET RECOMMENDED HOTELS
    // =====================================

    function getRecommendedHotels() {

        if (!Array.isArray(hotels)) {
            return [];
        }

        return hotels.filter(hotel => {

            const hotelLocation = String(
                hotel.location || ""
            ).toLowerCase();

            const destinationName = destination.name.toLowerCase();

            return hotelLocation.includes(destinationName);

        });

    }

    // =====================================
    // CREATE HOTEL CARD
    // =====================================

    function createHotelCard(hotel) {

        const card = hotelTemplate.content.cloneNode(true);

        const image = card.querySelector(".recommended-hotel-image");
        const imageLink = card.querySelector(".hotel-image-link");
        const name = card.querySelector(".recommended-hotel-name");
        const location = card.querySelector(".recommended-hotel-location span");
        const price = card.querySelector(".recommended-hotel-price");
        const bookButton = card.querySelector(".book-hotel-btn");

        image.src = hotel.image;
        image.alt = hotel.name;

        image.onerror = () => {
            image.src = "https://placehold.co/600x400?text=Hotel";
        };

        name.textContent = hotel.name;
        location.textContent = hotel.location;

        price.textContent =
            `${formatPrice(hotel.price)} / night`;

        const bookingLink = `booking.html?hotel=${hotel.id}`;

        imageLink.href = bookingLink;
        bookButton.href = bookingLink;

        return card;

    }

    // =====================================
    // DISPLAY RECOMMENDED HOTELS
    // =====================================

    function displayRecommendedHotels() {

        recommendedHotels.replaceChildren();

        const matchingHotels = getRecommendedHotels();

        if (matchingHotels.length === 0) {

            noHotelsMessage.hidden = false;
            recommendedHotels.hidden = true;

            return;
        }

        noHotelsMessage.hidden = true;
        recommendedHotels.hidden = false;

        matchingHotels.forEach(hotel => {

            recommendedHotels.appendChild(
                createHotelCard(hotel)
            );

        });

    }

    // =====================================
    // INITIALIZE PAGE
    // =====================================

    displayDestination();
    displayRecommendedHotels();
    updateFavoriteCounts();

}