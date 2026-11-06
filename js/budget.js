// ================= IMPORT DESTINATIONS =================

import { destinations } from "./data.js";

// ================= GET HTML ELEMENTS =================

const budgetInput = document.getElementById("totalBudget");
const travelersInput = document.getElementById("travelers");
const updateButton = document.getElementById("updateMatchesBtn");

const totalSummary = document.getElementById("totalSummary");
const personSummary = document.getElementById("personSummary");
const destinationContainer = document.getElementById("destinationContainer");

// ================= DESTINATION DETAILS =================
// Same details used in destination-details.js.
// The original object is private, so its information is copied here.

const destinationInfo = {
  1: {
    season: "October to April",
    highlights: [
      "Masjid al-Haram",
      "Kaaba and Mataf",
      "Jabal al-Noor",
      "Makkah Clock Tower",
    ],
  },

  2: {
    season: "April to June and September to October",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Arc de Triomphe",
      "Seine River Cruise",
    ],
  },

  3: {
    season: "April to October",
    highlights: [
      "Altit and Baltit Forts",
      "Attabad Lake Boating",
      "Passu Cones View",
      "Hunza Local Food",
    ],
  },

  4: {
    season: "May to September",
    highlights: [
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Deosai National Park",
      "Katpana Cold Desert",
    ],
  },

  5: {
    season: "March to May and September to November",
    highlights: [
      "Hagia Sophia",
      "Blue Mosque",
      "Grand Bazaar",
      "Bosphorus Cruise",
    ],
  },

  6: {
    season: "April to October",
    highlights: [
      "Ubud Rice Terraces",
      "Uluwatu Temple",
      "Kuta Beach",
      "Bali Waterfalls",
    ],
  },

  7: {
    season: "November to March",
    highlights: [
      "Burj Khalifa",
      "Dubai Mall",
      "Palm Jumeirah",
      "Desert Safari",
    ],
  },

  8: {
    season: "November to April",
    highlights: [
      "Maafushi Island",
      "Underwater Snorkeling",
      "White Sand Beaches",
      "Coral Reef Exploration",
    ],
  },

  9: {
    season: "April to October",
    highlights: ["Malam Jabba", "Kalam Valley", "Mahodand Lake", "Swat River"],
  },

  10: {
    season: "May to September",
    highlights: [
      "Saif-ul-Malook Lake",
      "Lulusar Lake",
      "Babusar Top",
      "Kunhar River",
    ],
  },

  11: {
    season: "May to September",
    highlights: [
      "Mall Road",
      "Patriata Chairlift",
      "Pindi Point",
      "Kashmir Point",
    ],
  },

  12: {
    season: "June to September",
    highlights: [
      "Nanga Parbat View",
      "Beyal Camp",
      "Fairy Meadows",
      "Mountain Camping",
    ],
  },

  13: {
    season: "May to September",
    highlights: ["Big Ben", "Tower Bridge", "Buckingham Palace", "London Eye"],
  },

  14: {
    season: "April to June and September to November",
    highlights: [
      "Statue of Liberty",
      "Times Square",
      "Central Park",
      "Empire State Building",
    ],
  },

  15: {
    season: "March to May and September to November",
    highlights: [
      "Tokyo Skytree",
      "Shibuya Crossing",
      "Senso-ji Temple",
      "Mount Fuji Views",
    ],
  },

  16: {
    season: "April to October",
    highlights: [
      "Blue Dome Churches",
      "Oia Sunset Views",
      "Red Beach",
      "Fira Village",
    ],
  },

  17: {
    season: "November to April",
    highlights: [
      "Patong Beach",
      "Phi Phi Islands",
      "Big Buddha",
      "Phang Nga Bay",
    ],
  },

  18: {
    season: "June to September and December to March",
    highlights: ["Swiss Alps", "Lake Geneva", "Jungfraujoch", "Interlaken"],
  },

  19: {
    season: "April to June and September to October",
    highlights: [
      "Hot Air Balloon Rides",
      "Fairy Chimneys",
      "Goreme Open Air Museum",
      "Underground Cities",
    ],
  },

  20: {
    season: "November to March",
    highlights: [
      "Sheikh Zayed Grand Mosque",
      "Louvre Abu Dhabi",
      "Qasr Al Watan",
      "Corniche Beach",
    ],
  },

  21: {
    season: "April to June and September to October",
    highlights: [
      "Flame Towers",
      "Icherisheher Old City",
      "Baku Boulevard",
      "Maiden Tower",
    ],
  },

  22: {
    season: "April to June and September to October",
    highlights: ["Colosseum", "Trevi Fountain", "Roman Forum", "Vatican City"],
  },

  23: {
    season: "October to April",
    highlights: [
      "Great Pyramids of Giza",
      "Sphinx",
      "Egyptian Museum",
      "Khan el-Khalili Bazaar",
    ],
  },

  24: {
    season: "December to February and June to August",
    highlights: [
      "Lake Wakatipu",
      "Milford Sound",
      "Skyline Gondola",
      "Remarkables Mountains",
    ],
  },

  25: {
    season: "November to April",
    highlights: [
      "Langkawi Sky Bridge",
      "Eagle Square",
      "Pantai Cenang Beach",
      "Kilim Geoforest Park",
    ],
  },
};

const defaultInfo = {
  season: "March to October",
  highlights: [
    "Explore famous attractions",
    "Discover local culture",
    "Enjoy beautiful views",
    "Taste local food",
  ],
};

// ================= COMMON FUNCTIONS =================

function formatPrice(amount) {
  return Number(amount).toLocaleString("en-PK");
}

function getDestinationById(id) {
  return destinations.find(function (place) {
    return String(place.id) === String(id);
  });
}

function showMessage(title, message) {
  destinationContainer.innerHTML = `

        <div class="no-match">

            <h3>${title}</h3>

            <p>${message}</p>

        </div>

    `;
}

// ================= UPDATE BUDGET SUMMARY =================

function updateMatches() {
  const budget = Number(budgetInput.value);
  const travelers = Number(travelersInput.value);

  // Check empty inputs

  if (budgetInput.value.trim() === "" || travelersInput.value.trim() === "") {
    totalSummary.textContent =
      "Enter your budget and number of travelers to get started.";

    personSummary.textContent = "Your budget per person will appear here.";

    destinationContainer.innerHTML = "";

    return;
  }

  // Check valid inputs

  if (
    !Number.isFinite(budget) ||
    budget <= 0 ||
    !Number.isInteger(travelers) ||
    travelers <= 0
  ) {
    totalSummary.textContent = "Please enter a valid total budget.";

    personSummary.textContent =
      "Travelers must be a whole number greater than zero.";

    destinationContainer.innerHTML = "";

    return;
  }

  // Calculate per person budget

  const perPerson = budget / travelers;

  // Show budget summary

  totalSummary.innerHTML = `

        Total budget:

        <strong>PKR ${formatPrice(budget)}</strong>

        for <strong>${travelers}</strong> travelers

    `;

  personSummary.innerHTML = `

        Budget per person:

        <strong>PKR ${formatPrice(perPerson)}</strong>

    `;

  // Show matching destinations

  showDestinations(budget, travelers);
}

// ================= SHOW MATCHING DESTINATIONS =================

function showDestinations(budget, travelers) {
  let cards = "";

  let found = 0;

  for (let i = 0; i < destinations.length; i++) {
    const place = destinations[i];

    const totalPrice = Number(place.price) * travelers;

    const leftover = budget - totalPrice;

    // Check destination according to budget

    if (totalPrice <= budget) {
      found++;

      cards += `

                <article class="destination-card">

                    <div class="destination-image">

                        <img
                            src="${place.image}"
                            alt="${place.name}"
                            loading="lazy"
                        >

                        <span class="category">
                            ${place.category}
                        </span>

                    </div>


                    <div class="destination-content">

                        <h2>${place.name}</h2>

                        <p>
                            ${place.country} · ${place.description}
                        </p>


                        <div class="price-box">

                            <div class="price-row">

                                <span>Per Person:</span>

                                <strong>
                                    PKR ${formatPrice(place.price)}
                                </strong>

                            </div>


                            <div class="price-row">

                                <span>For ${travelers} Travelers:</span>

                                <strong>
                                    PKR ${formatPrice(totalPrice)}
                                </strong>

                            </div>


                            <div class="price-row">

                                <span>Budget Left:</span>

                                <strong>
                                    PKR ${formatPrice(leftover)}
                                </strong>

                            </div>

                        </div>


                        <div class="card-buttons">

                            <button
                                type="button"
                                class="details-btn"
                                data-action="details"
                                data-id="${place.id}"
                            >

                                <i class="fa-regular fa-eye"></i>

                                View Details

                            </button>


                            <button
                                type="button"
                                class="plan-btn"
                                data-action="plan"
                                data-id="${place.id}"
                            >

                                <i class="fa-solid fa-route"></i>

                                Plan Trip

                            </button>

                        </div>

                    </div>

                </article>

            `;
    }
  }

  // Display matching destinations

  if (found > 0) {
    destinationContainer.innerHTML = `

            <div class="match-heading">

                <h2>${found} Destinations Found</h2>

                <p>
                    These destinations match your total travel budget.
                </p>

                <small>
                    Prices are estimates based on the destination data available on this demo website.
                </small>

            </div>


            <div class="destination-grid">

                ${cards}

            </div>

        `;
  } else {
    showMessage(
      "No Matching Destinations Found",
      "Your current budget does not match the estimated cost of the listed destinations. Try entering a higher budget.",
    );
  }
}

// ================= VIEW DESTINATION DETAILS POPUP =================

function showDestinationDetails(place, travelers, budget) {
  closeDestinationDetails();

  const info = destinationInfo[place.id] || defaultInfo;

  const totalPrice = Number(place.price) * travelers;

  const leftover = budget - totalPrice;

  // Create highlights

  const highlights = info.highlights
    .map(function (item) {
      return `

            <li>

                <i class="fa-solid fa-check"></i>

                ${item}

            </li>

        `;
    })
    .join("");

  // Create modal

  const modal = document.createElement("div");

  modal.className = "details-modal";

  modal.setAttribute("role", "presentation");

  modal.innerHTML = `

        <div
            class="details-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detailsTitle"
        >

            <button
                type="button"
                class="close-details"
                aria-label="Close destination details"
            >

                <i class="fa-solid fa-xmark"></i>

            </button>


            <!-- Destination Image -->

            <div class="details-image">

                <img
                    src="${place.image}"
                    alt="${place.name}"
                >


                <div class="details-image-overlay">

                    <div class="details-badges">

                        <span class="hero-badge">
                            ${place.category}
                        </span>


                        <span class="hero-badge">

                            <i class="fa-solid fa-location-dot"></i>

                            <span>${place.country}</span>

                        </span>


                        <span class="hero-badge">

                            <i class="fa-solid fa-star"></i>

                            <span>
                                ${Number(place.rating || 4.8).toFixed(1)}
                            </span>

                            <span>Guest rating</span>

                        </span>

                    </div>


                    <h2 id="detailsTitle">
                        ${place.name}
                    </h2>

                </div>

            </div>


            <div class="details-info">


                <!-- About Destination -->

                <section class="popup-detail-section">

                    <h3>About The Destination</h3>

                    <p>
                        ${place.description}
                    </p>

                </section>


                <!-- Highlights -->

                <section class="popup-detail-section">

                    <h3>Key Highlights &amp; Experiences</h3>

                    <ul class="popup-highlights-list">

                        ${highlights}

                    </ul>

                </section>


                <!-- Recommended Season -->

                <section class="popup-season">

                    <i class="fa-regular fa-calendar-days"></i>

                    <div>

                        <strong>Recommended Season</strong>

                        <span>${info.season}</span>

                    </div>

                </section>


                <!-- Estimated Trip Cost -->

                <section class="popup-cost">

                    <h3>Estimated Trip Cost</h3>


                    <div class="popup-cost-row">

                        <span>Per Person</span>

                        <strong>
                            PKR ${formatPrice(place.price)}
                        </strong>

                    </div>


                    <div class="popup-cost-row">

                        <span>${travelers} Travelers</span>

                        <strong>
                            PKR ${formatPrice(totalPrice)}
                        </strong>

                    </div>


                    <div class="popup-cost-row">

                        <span>Budget Remaining</span>

                        <strong>
                            PKR ${formatPrice(leftover)}
                        </strong>

                    </div>


                    <p>
                        Estimated prices are for planning purposes and may vary.
                    </p>

                </section>


                <!-- Back Button -->

                <button
                    type="button"
                    class="close-details-btn"
                >

                    Back to Budget Calculator

                </button>


            </div>

        </div>

    `;

  document.body.appendChild(modal);

  document.body.classList.add("modal-open");

  // Close modal on button click or outside click

  modal.addEventListener("click", function (event) {
    if (
      event.target === modal ||
      event.target.closest(".close-details") ||
      event.target.closest(".close-details-btn")
    ) {
      closeDestinationDetails();
    }
  });

  // Close modal with Escape key

  document.addEventListener("keydown", handleModalEscape);

  modal.querySelector(".close-details").focus();
}

// ================= CLOSE DESTINATION DETAILS =================

function closeDestinationDetails() {
  const existingModal = document.querySelector(".details-modal");

  if (existingModal) {
    existingModal.remove();
  }

  document.body.classList.remove("modal-open");

  document.removeEventListener("keydown", handleModalEscape);
}

// ================= ESCAPE KEY FUNCTION =================

function handleModalEscape(event) {
  if (event.key === "Escape") {
    closeDestinationDetails();
  }
}

// ================= DESTINATION CARD BUTTONS =================

destinationContainer.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const place = getDestinationById(button.dataset.id);

  if (!place) {
    return;
  }

  const budget = Number(budgetInput.value);

  const travelers = Number(travelersInput.value);

  const totalPrice = Number(place.price) * travelers;

  // View Details Button

  if (button.dataset.action === "details") {
    showDestinationDetails(place, travelers, budget);
  }

  // Plan Trip Button

  if (button.dataset.action === "plan") {
    const selectedTrip = {
      id: place.id,

      name: place.name,

      country: place.country,

      category: place.category,

      image: place.image,

      travelers: travelers,

      pricePerPerson: Number(place.price),

      totalPrice: totalPrice,

      budget: budget,

      budgetRemaining: budget - totalPrice,
    };

    // Save selected destination

    localStorage.setItem("selectedTrip", JSON.stringify(selectedTrip));

    // Open Trip Planner

    window.location.href = `trip-planner.html?destination=${encodeURIComponent(place.id)}`;
  }
});

// ================= BUTTON AND INPUT EVENTS =================

// Update button

updateButton.addEventListener("click", updateMatches);

// Automatically update while typing

budgetInput.addEventListener("input", updateMatches);

travelersInput.addEventListener("input", updateMatches);

// ================= INITIAL PAGE STATE =================

updateMatches();
