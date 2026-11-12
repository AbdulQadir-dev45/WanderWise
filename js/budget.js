import { destinations } from "./data.js";

// ================= GET HTML ELEMENTS =================

const budgetInput = document.getElementById("totalBudget");
const travelersInput = document.getElementById("travelers");
const updateButton = document.getElementById("updateMatchesBtn");

const totalSummary = document.getElementById("totalSummary");
const personSummary = document.getElementById("personSummary");
const destinationContainer = document.getElementById("destinationContainer");

// HTML Templates

const destinationCardTemplate = document.getElementById(
  "destinationCardTemplate",
);
const noMatchTemplate = document.getElementById("noMatchTemplate");
const destinationDetailsTemplate = document.getElementById(
  "destinationDetailsTemplate",
);

// ================= DESTINATION DETAILS =================

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
  const template = noMatchTemplate.content.cloneNode(true);

  template.querySelector("h3").textContent = title;
  template.querySelector("p").textContent = message;

  destinationContainer.replaceChildren(template);
}

// ================= UPDATE BUDGET SUMMARY =================

function updateMatches() {
  const budget = Number(budgetInput.value);
  const travelers = Number(travelersInput.value);

  if (budgetInput.value.trim() === "" || travelersInput.value.trim() === "") {
    totalSummary.textContent =
      "Enter your budget and number of travelers to get started.";

    personSummary.textContent = "Your budget per person will appear here.";

    destinationContainer.replaceChildren();
    return;
  }

  if (
    !Number.isFinite(budget) ||
    budget <= 0 ||
    !Number.isInteger(travelers) ||
    travelers <= 0
  ) {
    totalSummary.textContent = "Please enter a valid total budget.";

    personSummary.textContent =
      "Travelers must be a whole number greater than zero.";

    destinationContainer.replaceChildren();
    return;
  }

  const perPerson = budget / travelers;

  // Total Budget Summary

  totalSummary.replaceChildren(document.createTextNode("Total budget: "));

  const budgetStrong = document.createElement("strong");
  budgetStrong.textContent = `PKR ${formatPrice(budget)}`;

  const travelersStrong = document.createElement("strong");
  travelersStrong.textContent = travelers;

  totalSummary.append(
    budgetStrong,
    document.createTextNode(" for "),
    travelersStrong,
    document.createTextNode(" travelers"),
  );

  // Budget Per Person Summary

  personSummary.replaceChildren(document.createTextNode("Budget per person: "));

  const personStrong = document.createElement("strong");
  personStrong.textContent = `PKR ${formatPrice(perPerson)}`;

  personSummary.appendChild(personStrong);

  // Show matching destinations

  showDestinations(budget, travelers);
}

// ================= SHOW MATCHING DESTINATIONS =================

function showDestinations(budget, travelers) {
  let found = 0;

  const destinationCards = document.createDocumentFragment();

  for (let i = 0; i < destinations.length; i++) {
    const place = destinations[i];

    const totalPrice = Number(place.price) * travelers;
    const leftover = budget - totalPrice;

    if (totalPrice <= budget) {
      found++;

      const card = destinationCardTemplate.content.cloneNode(true);

      const article = card.querySelector(".destination-card");
      const image = card.querySelector(".destination-image img");

      image.src = place.image;
      image.alt = place.name;

      card.querySelector(".category").textContent = place.category;
      card.querySelector(".destination-content h2").textContent = place.name;

      card.querySelector(".destination-description").textContent =
        `${place.country} · ${place.description}`;

      card.querySelector(".person-price").textContent =
        `PKR ${formatPrice(place.price)}`;

      card.querySelector(".traveler-label").textContent =
        `For ${travelers} Travelers:`;

      card.querySelector(".total-price").textContent =
        `PKR ${formatPrice(totalPrice)}`;

      card.querySelector(".budget-left").textContent =
        `PKR ${formatPrice(leftover)}`;

      const detailsButton = card.querySelector(".details-btn");
      const planButton = card.querySelector(".plan-btn");

      detailsButton.dataset.id = place.id;
      planButton.dataset.id = place.id;

      article.dataset.id = place.id;

      destinationCards.appendChild(card);
    }
  }

  if (found > 0) {
    const heading = document.createElement("div");
    heading.className = "match-heading";

    const title = document.createElement("h2");
    title.textContent = `${found} Destinations Found`;

    const description = document.createElement("p");
    description.textContent =
      "These destinations match your total travel budget.";

    const note = document.createElement("small");
    note.textContent =
      "Prices are estimates based on the destination data available on this demo website.";

    heading.append(title, description, note);

    const grid = document.createElement("div");
    grid.className = "destination-grid";

    grid.appendChild(destinationCards);

    destinationContainer.replaceChildren(heading, grid);
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

  const modalTemplate = destinationDetailsTemplate.content.cloneNode(true);
  const modal = modalTemplate.querySelector(".details-modal");

  const image = modal.querySelector(".details-image img");

  image.src = place.image;
  image.alt = place.name;

  modal.querySelector(".category").textContent = place.category;
  modal.querySelector(".country").textContent = place.country;

  modal.querySelector(".rating").textContent = Number(
    place.rating || 4.8,
  ).toFixed(1);

  modal.querySelector("#detailsTitle").textContent = place.name;
  modal.querySelector(".description").textContent = place.description;
  modal.querySelector(".season").textContent = info.season;

  const highlightsList = modal.querySelector(".popup-highlights-list");

  info.highlights.forEach(function (item) {
    const listItem = document.createElement("li");
    const icon = document.createElement("i");

    icon.className = "fa-solid fa-check";

    listItem.append(icon, document.createTextNode(item));
    highlightsList.appendChild(listItem);
  });

  modal.querySelector(".person-cost").textContent =
    `PKR ${formatPrice(place.price)}`;

  modal.querySelector(".travelers-cost-label").textContent =
    `${travelers} Travelers`;

  modal.querySelector(".total-cost").textContent =
    `PKR ${formatPrice(totalPrice)}`;

  modal.querySelector(".remaining-cost").textContent =
    `PKR ${formatPrice(leftover)}`;

  document.body.appendChild(modal);
  document.body.classList.add("modal-open");

  modal.addEventListener("click", function (event) {
    if (
      event.target === modal ||
      event.target.closest(".close-details") ||
      event.target.closest(".close-details-btn")
    ) {
      closeDestinationDetails();
    }
  });

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

  if (button.dataset.action === "details") {
    showDestinationDetails(place, travelers, budget);
  }

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

    localStorage.setItem("selectedTrip", JSON.stringify(selectedTrip));

    window.location.href = `trip-planner.html?destination=${encodeURIComponent(place.id)}`;
  }
});

// ================= BUTTON AND INPUT EVENTS =================

updateButton.addEventListener("click", updateMatches);

budgetInput.addEventListener("input", updateMatches);
travelersInput.addEventListener("input", updateMatches);

// ================= INITIAL PAGE STATE =================

updateMatches();
