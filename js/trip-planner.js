// ================= IMPORT DATA =================

import { destinations } from "./data.js";
import { hotels } from "./hotels-data.js";

// ================= GET ELEMENTS =================

const tripForm = document.getElementById("tripForm");

const tripName = document.getElementById("tripName");
const destination = document.getElementById("destination");
const travelers = document.getElementById("travelers");

const hotelSection = document.getElementById("hotelSection");
const hotel = document.getElementById("hotel");
const hotelText = document.getElementById("hotelText");
const hotelDetails = document.getElementById("hotelDetails");

const departureDate = document.getElementById("departureDate");
const returnDate = document.getElementById("returnDate");

const tripNotes = document.getElementById("tripNotes");

const estimatedBudget = document.getElementById("estimatedBudget");
const budgetDescription = document.getElementById("budgetDescription");

const budgetDetails = document.getElementById("budgetDetails");
const destinationPrice = document.getElementById("destinationPrice");
const hotelPrice = document.getElementById("hotelPrice");
const totalDays = document.getElementById("totalDays");

const message = document.getElementById("message");

// ================= FEATURE ELEMENTS =================

const itinerarySection = document.getElementById("itinerarySection");
const itineraryList = document.getElementById("itineraryList");
const itineraryToggle = document.getElementById("itineraryToggle");

const placesSection = document.getElementById("placesSection");
const placesList = document.getElementById("placesList");

let itineraryExpanded = false;

let selectedDestination = null;
let selectedHotel = null;

// ================= PRICE FORMAT =================

function formatPrice(price) {
  return "PKR " + Number(price).toLocaleString("en-PK");
}

// ================= LOAD DESTINATIONS =================

function loadDestinations() {
  destinations.forEach(function (place) {
    const option = document.createElement("option");

    option.value = place.id;

    option.textContent = place.name + ", " + place.country;

    destination.appendChild(option);
  });
}

// ================= FIND DESTINATION HOTELS =================

function getHotels(place) {
  return hotels.filter(function (item) {
    return item.location.toLowerCase().includes(place.name.toLowerCase());
  });
}

// ================= LOAD HOTELS =================

function loadHotels(place) {
  hotel.innerHTML = '<option value="">Select Hotel</option>';

  hotelDetails.innerHTML = "";

  hotelDetails.classList.remove("show");

  selectedHotel = null;

  hotel.disabled = false;

  if (!place) {
    hotelSection.hidden = true;

    updateBudget();

    return;
  }

  hotelSection.hidden = false;

  const availableHotels = getHotels(place);

  if (availableHotels.length === 0) {
    hotel.disabled = true;

    hotelText.textContent = "No hotels available for this destination.";

    updateBudget();

    return;
  }

  hotelText.textContent = "Select a hotel for your stay.";

  availableHotels.forEach(function (item) {
    const option = document.createElement("option");

    option.value = item.id;

    option.textContent =
      item.name + " - " + formatPrice(item.price) + " / night";

    hotel.appendChild(option);
  });

  updateBudget();
}

// ================= SHOW HOTEL DETAILS =================

function showHotel(item) {
  if (!item) {
    hotelDetails.innerHTML = "";

    hotelDetails.classList.remove("show");

    return;
  }

  hotelDetails.innerHTML = `

        <img src="${item.image}" alt="${item.name}">

        <div>

            <h4>${item.name}</h4>

            <p>${item.location}</p>

            <strong>${formatPrice(item.price)} / night</strong>

        </div>

    `;

  hotelDetails.classList.add("show");
}

// ================= GET TRIP NIGHTS =================

function getNights() {
  if (!departureDate.value || !returnDate.value) {
    return 0;
  }

  const start = new Date(departureDate.value);

  const end = new Date(returnDate.value);

  const difference = end - start;

  return Math.round(difference / (1000 * 60 * 60 * 24));
}

// ================= UPDATE BUDGET =================

function updateBudget() {
  const totalTravelers = Number(travelers.value) || 1;

  const nights = getNights();

  if (!selectedDestination) {
    estimatedBudget.textContent = formatPrice(0);

    budgetDescription.textContent = "Select your destination and dates.";

    budgetDetails.hidden = true;

    itinerarySection.hidden = true;

    itineraryToggle.hidden = true;

    placesSection.hidden = true;

    return;
  }

  const destinationTotal = Number(selectedDestination.price) * totalTravelers;

  let hotelTotal = 0;

  if (selectedHotel && nights > 0) {
    hotelTotal = Number(selectedHotel.price) * nights;
  }

  const total = destinationTotal + hotelTotal;

  estimatedBudget.textContent = formatPrice(total);

  destinationPrice.textContent = formatPrice(destinationTotal);

  hotelPrice.textContent = formatPrice(hotelTotal);

  totalDays.textContent = nights + " nights";

  budgetDetails.hidden = false;

  if (nights > 0) {
    budgetDescription.textContent =
      "Based on " +
      nights +
      " nights for " +
      totalTravelers +
      " travelers in " +
      selectedDestination.name +
      ".";
  } else {
    budgetDescription.textContent =
      "Destination estimate for " +
      totalTravelers +
      " travelers in " +
      selectedDestination.name +
      ".";
  }

  updateItinerary();

  updatePlaces();
}

// ================= DESTINATION PLACES DATA =================

const destinationPlaces = {
  "Hunza Valley": [
    "Attabad Lake",
    "Baltit Fort",
    "Altit Fort",
    "Passu Cones",
    "Eagle's Nest",
  ],

  Skardu: [
    "Shangrila Resort",
    "Upper Kachura Lake",
    "Satpara Lake",
    "Deosai National Park",
    "Shigar Fort",
  ],

  Istanbul: [
    "Hagia Sophia",
    "Blue Mosque",
    "Topkapi Palace",
    "Grand Bazaar",
    "Bosphorus",
  ],

  Bali: [
    "Uluwatu Temple",
    "Ubud",
    "Nusa Penida",
    "Tegallalang Rice Terrace",
    "Kuta Beach",
  ],

  Dubai: [
    "Burj Khalifa",
    "Dubai Mall",
    "Palm Jumeirah",
    "Dubai Marina",
    "Museum of the Future",
  ],

  Maldives: [
    "Male City",
    "Maafushi Island",
    "Banana Reef",
    "Hulhumale Beach",
    "National Museum",
  ],
};

// ================= SHOW PLACES =================

function updatePlaces() {
  placesList.innerHTML = "";

  if (!selectedDestination) {
    placesSection.hidden = true;

    return;
  }

  placesSection.hidden = false;

  let placeNames = destinationPlaces[selectedDestination.name];

  if (!placeNames) {
    placeNames = [
      selectedDestination.name + " City Centre",
      "Local Markets",
      "Famous Historical Places",
      "Popular Viewpoints",
      "Local Food Streets",
    ];
  }

  placeNames.forEach(function (place) {
    const item = document.createElement("div");

    item.className = "place-item";

    const icon = document.createElement("i");

    icon.className = "fa-solid fa-location-dot";

    const name = document.createElement("span");

    name.textContent = place;

    item.appendChild(icon);

    item.appendChild(name);

    placesList.appendChild(item);
  });
}

// ================= GET ACTIVITIES =================

function getActivities() {
  const checked = document.querySelectorAll('input[name="activities"]:checked');

  const activities = [];

  checked.forEach(function (item) {
    activities.push(item.value);
  });

  return activities;
}

// ================= DAY WISE ITINERARY =================

function updateItinerary() {
  itineraryList.innerHTML = "";

  itineraryExpanded = false;

  if (!selectedDestination) {
    itinerarySection.hidden = true;

    itineraryToggle.hidden = true;

    return;
  }

  const nights = getNights();

  if (nights <= 0) {
    itinerarySection.hidden = true;

    itineraryToggle.hidden = true;

    return;
  }

  itinerarySection.hidden = false;

  const activities = getActivities();

  const selectedActivities =
    activities.length > 0
      ? activities.join(", ")
      : "Explore the destination and enjoy free time";

  const totalTripDays = nights + 1;

  const daysToShow = Math.min(totalTripDays, 14);

  for (let i = 1; i <= daysToShow; i++) {
    const day = document.createElement("div");

    day.className = "itinerary-day";

    const heading = document.createElement("h4");

    heading.textContent = "Day " + i;

    const description = document.createElement("p");

    if (i === 1) {
      description.textContent =
        "Arrival at " +
        selectedDestination.name +
        ". Check in to your hotel, relax and explore nearby areas.";
    } else if (i === totalTripDays) {
      description.textContent =
        "Enjoy your final morning, complete checkout " +
        "and prepare for your return journey.";
    } else {
      description.textContent =
        "Explore " +
        selectedDestination.name +
        ". Suggested activities: " +
        selectedActivities +
        ".";
    }

    day.appendChild(heading);

    day.appendChild(description);

    if (i > 3) {
      day.classList.add("itinerary-extra-day");

      day.hidden = true;
    }

    itineraryList.appendChild(day);
  }

  itineraryToggle.hidden = daysToShow <= 3;

  itineraryToggle.textContent = "Show all days";

  if (totalTripDays > 14) {
    const note = document.createElement("p");

    note.className = "itinerary-note";

    note.textContent = "Showing the first 14 days of your suggested itinerary.";

    itineraryList.appendChild(note);
  }
}

// ================= ITINERARY TOGGLE =================

itineraryToggle.addEventListener("click", function () {
  itineraryExpanded = !itineraryExpanded;

  const extraDays = itineraryList.querySelectorAll(".itinerary-extra-day");

  extraDays.forEach(function (day) {
    day.hidden = !itineraryExpanded;
  });

  itineraryToggle.textContent = itineraryExpanded
    ? "Show less"
    : "Show all days";
});

// ================= DESTINATION CHANGE =================

destination.addEventListener("change", function () {
  const id = Number(this.value);

  selectedDestination = destinations.find(function (place) {
    return Number(place.id) === id;
  });

  loadHotels(selectedDestination);

  updateBudget();

  message.textContent = "";
});

// ================= HOTEL CHANGE =================

hotel.addEventListener("change", function () {
  const id = Number(this.value);

  selectedHotel = hotels.find(function (item) {
    return Number(item.id) === id;
  });

  showHotel(selectedHotel);

  updateBudget();
});

// ================= INPUT EVENTS =================

travelers.addEventListener("input", updateBudget);

departureDate.addEventListener("change", function () {
  returnDate.min = departureDate.value;

  if (returnDate.value && returnDate.value <= departureDate.value) {
    returnDate.value = "";
  }

  updateBudget();
});

returnDate.addEventListener("change", updateBudget);

// ================= ACTIVITY CHANGE =================

document.querySelectorAll('input[name="activities"]').forEach(function (item) {
  item.addEventListener("change", updateItinerary);
});

// ================= MINIMUM DATE =================

function setDates() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  const currentDate = year + "-" + month + "-" + day;

  departureDate.min = currentDate;

  returnDate.min = currentDate;
}

// ================= SHOW MESSAGE =================

function showMessage(text, type) {
  message.textContent = text;

  message.className = type;
}

// ================= SAVE TRIP =================

tripForm.addEventListener("submit", function (event) {
  event.preventDefault();

  message.textContent = "";

  // Check destination

  if (!selectedDestination) {
    showMessage("Please select a destination.", "error");

    return;
  }

  // Check travelers

  const totalTravelers = Number(travelers.value);

  if (!totalTravelers || totalTravelers < 1) {
    showMessage("Please enter a valid number of travelers.", "error");

    return;
  }

  // Check dates

  if (!departureDate.value || !returnDate.value) {
    showMessage("Please select your travel dates.", "error");

    return;
  }

  if (returnDate.value <= departureDate.value) {
    showMessage("Return date must be after departure date.", "error");

    return;
  }

  const nights = getNights();

  const destinationTotal = Number(selectedDestination.price) * totalTravelers;

  const hotelTotal = selectedHotel ? Number(selectedHotel.price) * nights : 0;

  const total = destinationTotal + hotelTotal;

  // Trip information

  const trip = {
    id: Date.now(),

    tripName: tripName.value.trim() || selectedDestination.name + " Trip",

    destinationId: selectedDestination.id,

    destination: selectedDestination.name,

    country: selectedDestination.country,

    image: selectedDestination.image,

    travelers: totalTravelers,

    departureDate: departureDate.value,

    returnDate: returnDate.value,

    nights: nights,

    hotel: selectedHotel ? selectedHotel : null,

    activities: getActivities(),

    notes: tripNotes.value,

    destinationCost: destinationTotal,

    hotelCost: hotelTotal,

    totalBudget: total,

    createdAt: new Date().toISOString(),
  };

  // Save trip permanently in plannedTrips

  let savedTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];

  savedTrips.push(trip);

  localStorage.setItem("plannedTrips", JSON.stringify(savedTrips));

  // Clear temporary selected trip

  localStorage.removeItem("selectedTrip");

  // Remove old destination from URL

  window.history.replaceState({}, document.title, window.location.pathname);

  // Reset complete form

  tripForm.reset();

  // Reset selected data

  selectedDestination = null;

  selectedHotel = null;

  itineraryExpanded = false;

  // Reset travelers to 1

  travelers.value = 1;

  // Reset hotel section

  hotel.innerHTML = '<option value="">Select Hotel</option>';

  hotel.disabled = false;

  hotelDetails.innerHTML = "";

  hotelDetails.classList.remove("show");

  hotelSection.hidden = true;

  hotelText.textContent = "Select a hotel for your stay.";

  // Reset dates

  returnDate.min = departureDate.min;

  // Reset budget

  estimatedBudget.textContent = formatPrice(0);

  budgetDescription.textContent = "Select your destination and dates.";

  destinationPrice.textContent = formatPrice(0);

  hotelPrice.textContent = formatPrice(0);

  totalDays.textContent = "0 nights";

  budgetDetails.hidden = true;

  // Reset itinerary

  itineraryList.innerHTML = "";

  itinerarySection.hidden = true;

  itineraryToggle.hidden = true;

  itineraryToggle.textContent = "Show all days";

  // Reset places

  placesList.innerHTML = "";

  placesSection.hidden = true;

  // Show success message

  showMessage("Your trip has been saved successfully!", "success");
});

// ================= LOAD BUDGET SELECTED DESTINATION =================

function loadSelectedTrip() {
  const urlParams = new URLSearchParams(window.location.search);

  const urlId = Number(urlParams.get("destination"));

  let savedTrip = JSON.parse(localStorage.getItem("selectedTrip"));

  let place = null;

  // Destination from URL
  if (urlId) {
    place = destinations.find(function (item) {
      return Number(item.id) === urlId;
    });
  }

  // Destination from Budget Calculator
  if (!place && savedTrip) {
    const savedDestinationId = savedTrip.destinationId || savedTrip.id;

    place = destinations.find(function (item) {
      return Number(item.id) === Number(savedDestinationId);
    });
  }

  // Load travelers
  if (savedTrip && savedTrip.travelers) {
    travelers.value = savedTrip.travelers;
  }

  // Select destination
  if (place) {
    destination.value = place.id;

    selectedDestination = place;

    loadHotels(place);

    updateBudget();
  }

  // Remove temporary data after loading it once
  localStorage.removeItem("selectedTrip");

  // Remove destination from URL after loading it once
  if (urlId) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// ================= START =================

loadDestinations();

setDates();

loadSelectedTrip();

updateBudget();
