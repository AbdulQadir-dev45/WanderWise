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

const placesSection = document.getElementById("placesSection");
const placesList = document.getElementById("placesList");

// ================= HTML TEMPLATES =================

const destinationOptionTemplate = document.getElementById(
  "destinationOptionTemplate",
);

const hotelOptionTemplate = document.getElementById("hotelOptionTemplate");

const hotelDetailsTemplate = document.getElementById("hotelDetailsTemplate");

const placeItemTemplate = document.getElementById("placeItemTemplate");

let selectedDestination = null;
let selectedHotel = null;

// ================= PRICE FORMAT =================

function formatPrice(price) {
  return "PKR " + Number(price).toLocaleString("en-PK");
}

// ================= LOAD DESTINATIONS =================

function loadDestinations() {
  destinations.forEach(function (place) {
    const option =
      destinationOptionTemplate.content.firstElementChild.cloneNode(true);

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
  const defaultOption =
    hotelOptionTemplate.content.firstElementChild.cloneNode(true);

  defaultOption.value = "";
  defaultOption.textContent = "Select Hotel";

  hotel.replaceChildren(defaultOption);

  hotelDetails.replaceChildren();
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
    const option =
      hotelOptionTemplate.content.firstElementChild.cloneNode(true);

    option.value = item.id;

    option.textContent =
      item.name + " - " + formatPrice(item.price) + " / night";

    hotel.appendChild(option);
  });

  updateBudget();
}

// ================= SHOW HOTEL DETAILS =================

function showHotel(item) {
  hotelDetails.replaceChildren();

  if (!item) {
    hotelDetails.classList.remove("show");

    return;
  }

  const hotelContent = hotelDetailsTemplate.content.cloneNode(true);

  const image = hotelContent.querySelector("img");
  const name = hotelContent.querySelector("h4");
  const location = hotelContent.querySelector("p");
  const price = hotelContent.querySelector("strong");

  image.src = item.image;
  image.alt = item.name;

  name.textContent = item.name;
  location.textContent = item.location;

  price.textContent = formatPrice(item.price) + " / night";

  hotelDetails.appendChild(hotelContent);

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

  updatePlaces();
}

// ================= DESTINATION PLACES DATA =================

const destinationPlaces = {
  Makkah: [
    "Masjid al-Haram",
    "Kaaba and Mataf",
    "Jabal al-Noor",
    "Makkah Clock Tower",
    "Jabal Thawr",
  ],

  Paris: [
    "Eiffel Tower",
    "Louvre Museum",
    "Arc de Triomphe",
    "Seine River Cruise",
    "Notre-Dame Cathedral",
  ],

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

  "Swat Valley": [
    "Malam Jabba",
    "Kalam Valley",
    "Mahodand Lake",
    "Swat River",
    "Fizagat Park",
  ],

  Naran: [
    "Saif-ul-Malook Lake",
    "Lulusar Lake",
    "Babusar Top",
    "Kunhar River",
    "Lalazar Meadows",
  ],

  Murree: [
    "Mall Road",
    "Patriata Chairlift",
    "Pindi Point",
    "Kashmir Point",
    "Bhurban",
  ],

  "Fairy Meadows": [
    "Fairy Meadows",
    "Nanga Parbat Viewpoint",
    "Beyal Camp",
    "Raikot Bridge",
    "Mountain Viewpoints",
  ],

  London: [
    "Big Ben",
    "Tower Bridge",
    "Buckingham Palace",
    "London Eye",
    "British Museum",
  ],

  "New York": [
    "Statue of Liberty",
    "Times Square",
    "Central Park",
    "Empire State Building",
    "Brooklyn Bridge",
  ],

  Tokyo: [
    "Tokyo Skytree",
    "Shibuya Crossing",
    "Senso-ji Temple",
    "Mount Fuji Views",
    "Tokyo Disneyland",
  ],

  Santorini: [
    "Blue Dome Churches",
    "Oia Sunset Views",
    "Red Beach",
    "Fira Village",
    "Akrotiri Archaeological Site",
  ],

  Phuket: [
    "Patong Beach",
    "Phi Phi Islands",
    "Big Buddha",
    "Phang Nga Bay",
    "Kata Beach",
  ],

  Switzerland: [
    "Swiss Alps",
    "Lake Geneva",
    "Jungfraujoch",
    "Interlaken",
    "Lucerne",
  ],

  Cappadocia: [
    "Hot Air Balloon Rides",
    "Fairy Chimneys",
    "Goreme Open Air Museum",
    "Underground Cities",
    "Love Valley",
  ],

  "Abu Dhabi": [
    "Sheikh Zayed Grand Mosque",
    "Louvre Abu Dhabi",
    "Qasr Al Watan",
    "Corniche Beach",
    "Ferrari World",
  ],

  Baku: [
    "Flame Towers",
    "Icherisheher Old City",
    "Baku Boulevard",
    "Maiden Tower",
    "Heydar Aliyev Center",
  ],

  Rome: [
    "Colosseum",
    "Trevi Fountain",
    "Roman Forum",
    "Vatican City",
    "Pantheon",
  ],

  Cairo: [
    "Great Pyramids of Giza",
    "Sphinx",
    "Egyptian Museum",
    "Khan el-Khalili Bazaar",
    "Citadel of Saladin",
  ],

  Queenstown: [
    "Lake Wakatipu",
    "Milford Sound",
    "Skyline Gondola",
    "Remarkables Mountains",
    "Queenstown Gardens",
  ],

  Langkawi: [
    "Langkawi Sky Bridge",
    "Eagle Square",
    "Pantai Cenang Beach",
    "Kilim Geoforest Park",
    "Seven Wells Waterfall",
  ],
};

// ================= SHOW PLACES =================

function updatePlaces() {
  placesList.replaceChildren();

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
    const item = placeItemTemplate.content.firstElementChild.cloneNode(true);

    const name = item.querySelector("span");

    name.textContent = place;

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

  // ========================================
  // SAVE TRIP IN PLANNED TRIPS
  // ========================================

  let savedTrips = [];

  try {
    savedTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];
  } catch (error) {
    savedTrips = [];
  }

  savedTrips.push(trip);

  localStorage.setItem("plannedTrips", JSON.stringify(savedTrips));

  // ========================================
  // SAVE TRIP FOR MY TRIPS PAGE
  // ========================================

  let myTrips = [];

  try {
    myTrips = JSON.parse(localStorage.getItem("wanderwiseTrips")) || [];
  } catch (error) {
    myTrips = [];
  }

  const myTrip = {
    id: trip.id.toString(),

    title: trip.tripName,

    destination: trip.destination + ", " + trip.country,

    startDate: trip.departureDate,

    endDate: trip.returnDate,

    travelers: trip.travelers,

    budget: trip.totalBudget,

    description:
      "Country: " +
      trip.country +
      " | Hotel: " +
      (trip.hotel ? trip.hotel.name : "Not selected") +
      " | Nights: " +
      trip.nights +
      " | Activities: " +
      (trip.activities.length > 0
        ? trip.activities.join(", ")
        : "No activities selected") +
      " | Notes: " +
      (trip.notes || "No additional notes"),

    itinerary: trip.activities,

    destinationId: trip.destinationId,

    country: trip.country,

    image: trip.image,

    nights: trip.nights,

    hotel: trip.hotel,

    activities: trip.activities,

    notes: trip.notes,

    destinationCost: trip.destinationCost,

    hotelCost: trip.hotelCost,

    totalBudget: trip.totalBudget,

    createdAt: trip.createdAt,

    savedAt: new Date().toISOString(),
  };

  myTrips.push(myTrip);

  localStorage.setItem("wanderwiseTrips", JSON.stringify(myTrips));

  // ========================================
  // SAVE HOTEL IN MY TRIPS HOTEL RESERVATIONS
  // ========================================

  if (trip.hotel) {
    let savedHotels = [];

    try {
      savedHotels = JSON.parse(localStorage.getItem("wanderwiseHotels")) || [];
    } catch (error) {
      savedHotels = [];
    }

    const hotelBooking = {
      id: trip.id.toString(),

      hotelName: trip.hotel.name,

      checkIn: trip.departureDate,

      checkOut: trip.returnDate,

      total: trip.hotelCost,

      destination: trip.destination,

      travelers: trip.travelers,

      nights: trip.nights,

      image: trip.hotel.image,

      savedAt: new Date().toISOString(),
    };

    savedHotels.push(hotelBooking);

    localStorage.setItem("wanderwiseHotels", JSON.stringify(savedHotels));
  }

  // Clear temporary selected trip

  localStorage.removeItem("selectedTrip");

  // Remove old destination from URL

  window.history.replaceState({}, document.title, window.location.pathname);

  // Reset complete form

  tripForm.reset();

  // Reset selected data

  selectedDestination = null;

  selectedHotel = null;

  // Reset travelers to 1

  travelers.value = 1;

  // Reset hotel section

  const defaultOption =
    hotelOptionTemplate.content.firstElementChild.cloneNode(true);

  defaultOption.value = "";
  defaultOption.textContent = "Select Hotel";

  hotel.replaceChildren(defaultOption);

  hotel.disabled = false;

  hotelDetails.replaceChildren();

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

  // Reset places

  placesList.replaceChildren();

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
