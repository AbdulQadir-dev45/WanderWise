// =====================================
// WANDERWISE - PACKAGE DETAILS
// =====================================

import { destinations } from "./data.js";
import { hotels } from "./hotels-data.js";


// GET HTML ELEMENTS

const packageImage = document.getElementById("packageImage");
const packageCategory = document.getElementById("packageCategory");
const packageTitle = document.getElementById("packageTitle");
const packageShortDescription = document.getElementById("packageShortDescription");
const packageDescription = document.getElementById("packageDescription");

const packagePlaces = document.getElementById("packagePlaces");
const packageHotels = document.getElementById("packageHotels");
const packageIncludes = document.getElementById("packageIncludes");

const packageInfoTitle = document.getElementById("packageInfoTitle");
const packageDiscount = document.getElementById("packageDiscount");

const packageDestination = document.getElementById("packageDestination");
const packageHotel = document.getElementById("packageHotel");
const packageTravelers = document.getElementById("packageTravelers");
const packageNights = document.getElementById("packageNights");

const destinationCost = document.getElementById("destinationCost");
const hotelCost = document.getElementById("hotelCost");
const manualCost = document.getElementById("manualCost");
const discountLabel = document.getElementById("discountLabel");
const discountAmount = document.getElementById("discountAmount");
const finalPackagePrice = document.getElementById("finalPackagePrice");


// PACKAGE SETTINGS

const packages = {

    hajj: {
        title: "Hajj Packages",
        category: "SPIRITUAL JOURNEY",
        discount: 10,
        imageDestination: "Makkah",
        description: "Explore the available Makkah destination and hotel options in WanderWise. Select your travel details to calculate an estimated package price.",
        type: "Religious Tourism",
        destinations: ["Makkah"]
    },

    umrah: {
        title: "Umrah Packages",
        category: "SPIRITUAL JOURNEY",
        discount: 8,
        imageDestination: "Makkah",
        description: "Plan your Umrah travel estimate using the Makkah destination and hotel information currently available in WanderWise.",
        type: "Religious Tourism",
        destinations: ["Makkah"]
    },

    pakistan: {
        title: "Pakistan Tour Packages",
        category: "EXPLORE PAKISTAN",
        discount: 6,
        imageDestination: "Hunza Valley",
        description: "Explore the destinations available in Pakistan, including mountain valleys and other places listed in WanderWise. Choose a destination and hotel to calculate your estimated cost.",
        type: "Domestic Tourism",
        country: "Pakistan"
    },

    international: {
        title: "International Tour Packages",
        category: "DISCOVER THE WORLD",
        discount: 5,
        imageDestination: "Paris",
        description: "Explore international destinations listed in WanderWise. Select your preferred destination and an available hotel to view your estimated travel cost.",
        type: "International Tourism",
        international: true
    },

    family: {
        title: "Family Tour Packages",
        category: "TRAVEL TOGETHER",
        discount: 7,
        imageDestination: "Murree",
        description: "Explore the destinations available in WanderWise and calculate an estimated family travel cost by selecting a destination, hotel, and number of travelers.",
        type: "Family Tourism",
        allDestinations: true
    },

    adventure: {
        title: "Adventure Tour Packages",
        category: "FEEL THE ADVENTURE",
        discount: 5,
        imageDestination: "Skardu",
        description: "Explore mountain destinations listed in WanderWise and check their available hotel options. Select your travel details to calculate an estimated adventure package price.",
        type: "Adventure Tourism",
        mountains: true
    }

};


// GET PACKAGE ID FROM URL

const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get("package");

const selectedPackage = packages[packageId];

let selectedDestination = null;
let selectedHotel = null;
let availableDestinations = [];


// FORMAT PRICE

function formatPrice(price) {

    return "PKR " + Number(price).toLocaleString("en-PK");

}


// GET PACKAGE DESTINATIONS

function getPackageDestinations() {

    let result = [];

    destinations.forEach(function(destination) {

        if (selectedPackage.destinations) {

            if (selectedPackage.destinations.includes(destination.name)) {
                result.push(destination);
            }

        } else if (selectedPackage.country) {

            if (destination.country === selectedPackage.country) {
                result.push(destination);
            }

        } else if (selectedPackage.international) {

            if (destination.country !== "Pakistan" &&
                destination.name !== "Makkah") {

                result.push(destination);
            }

        } else if (selectedPackage.mountains) {

            if (destination.category === "Mountains") {
                result.push(destination);
            }

        } else if (selectedPackage.allDestinations) {

            result.push(destination);

        }

    });

    return result;

}

// =====================================
// SAVE PACKAGE TO MY TRIPS
// =====================================

const savePackageBtn = document.getElementById("savePackageBtn");
const packageSaveMessage = document.getElementById("packageSaveMessage");

savePackageBtn.addEventListener("click", function() {

    // Destination selection check

    if (!selectedDestination) {

        packageSaveMessage.textContent =
            "Please select a destination first.";

        packageSaveMessage.classList.add("error");

        return;

    }


    // Calculate final package price

    const travelers = Math.max(1, Number(packageTravelers.value) || 1);
    const nights = Math.max(1, Number(packageNights.value) || 1);

    const destinationTotal =
        Number(selectedDestination.price) * travelers;

    let hotelTotal = 0;

    if (selectedHotel) {
        hotelTotal = Number(selectedHotel.price) * nights;
    }

    const total = destinationTotal + hotelTotal;

    const discount = total * selectedPackage.discount / 100;

    const finalPrice = total - discount;


   
    // Get existing trips

    let savedTrips = [];

    try {

        const existingTrips = localStorage.getItem("wanderwiseTrips");

        if (existingTrips) {
            savedTrips = JSON.parse(existingTrips);
        }

        if (!Array.isArray(savedTrips)) {
            savedTrips = [];
        }

    } catch (error) {

        savedTrips = [];

    }


    // Create package details

    let hotelDescription = "No hotel selected";

    if (selectedHotel) {
        hotelDescription = selectedHotel.name;
    }

    const newPackage = {

        id: Date.now().toString(),

        title: selectedPackage.title,

        destination: selectedDestination.name,

        startDate: "",

        endDate: "",

        travelers: travelers,

        budget: Math.round(finalPrice),

        description:
            selectedPackage.title +
            " | Hotel: " + hotelDescription +
            " | Hotel Nights: " + nights +
            " | Discount: " + selectedPackage.discount + "%",

        itinerary: [],

        savedAt: new Date().toISOString()

    };


    // Save package

    savedTrips.push(newPackage);

    localStorage.setItem(
        "wanderwiseTrips",
        JSON.stringify(savedTrips)
    );


    // Success message

    packageSaveMessage.classList.remove("error");

    packageSaveMessage.textContent =
        "Package saved successfully! Visit My Trips to view it.";

    savePackageBtn.innerHTML =
        '<i class="fa-solid fa-check"></i> Package Saved';

    savePackageBtn.disabled = true;

});


// SHOW PACKAGE DESTINATIONS

function showDestinations() {

    availableDestinations = getPackageDestinations();

    packagePlaces.innerHTML = "";
    packageDestination.innerHTML = '<option value="">Select Destination</option>';

    availableDestinations.forEach(function(destination) {

        // DESTINATION LIST

        const place = document.createElement("div");
        place.className = "package-place-item";

        const placeName = document.createElement("strong");
        placeName.textContent = destination.name;

        const placeCountry = document.createElement("span");
        placeCountry.textContent = destination.country;

        const placePrice = document.createElement("small");
        placePrice.textContent = formatPrice(destination.price) + " per traveler";

        place.appendChild(placeName);
        place.appendChild(placeCountry);
        place.appendChild(placePrice);

        packagePlaces.appendChild(place);


        // DESTINATION DROPDOWN

        const option = document.createElement("option");

        option.value = destination.id;
        option.textContent = destination.name + " - " + destination.country;

        packageDestination.appendChild(option);

    });

}


// GET HOTELS FOR SELECTED DESTINATION

function getDestinationHotels(destination) {

    let result = [];

    hotels.forEach(function(hotel) {

        if (hotel.location.toLowerCase().includes(destination.name.toLowerCase())) {
            result.push(hotel);
        }

    });

    return result;

}


// SHOW AVAILABLE HOTELS

function showHotels() {

    packageHotel.innerHTML = '<option value="">Select Hotel</option>';
    packageHotels.innerHTML = "";

    selectedHotel = null;

    if (!selectedDestination) {

        packageHotels.textContent = "Select a destination to view its available hotels.";

        updatePackagePrice();
        return;

    }

    const availableHotels = getDestinationHotels(selectedDestination);

    if (availableHotels.length === 0) {

        packageHotels.textContent = "No hotel information is currently available for this destination.";

        updatePackagePrice();
        return;

    }

    availableHotels.forEach(function(hotel) {

        // HOTEL DROPDOWN

        const option = document.createElement("option");

        option.value = hotel.id;
        option.textContent = hotel.name + " - " + formatPrice(hotel.price) + " / night";

        packageHotel.appendChild(option);


        // HOTEL INFORMATION

        const hotelItem = document.createElement("div");
        hotelItem.className = "package-hotel-item";

        const hotelName = document.createElement("strong");
        hotelName.textContent = hotel.name;

        const hotelLocation = document.createElement("span");
        hotelLocation.textContent = hotel.location;

        const hotelRate = document.createElement("small");
        hotelRate.textContent = formatPrice(hotel.price) + " per night";

        hotelItem.appendChild(hotelName);
        hotelItem.appendChild(hotelLocation);
        hotelItem.appendChild(hotelRate);

        packageHotels.appendChild(hotelItem);

    });

    updatePackagePrice();

}


// CALCULATE PACKAGE PRICE

function updatePackagePrice() {

    let travelers = Number(packageTravelers.value);
    let nights = Number(packageNights.value);

    if (travelers < 1 || isNaN(travelers)) {
        travelers = 1;
    }

    if (nights < 1 || isNaN(nights)) {
        nights = 1;
    }

    let destinationTotal = 0;
    let hotelTotal = 0;

    if (selectedDestination) {
        destinationTotal = Number(selectedDestination.price) * travelers;
    }

    if (selectedHotel) {
        hotelTotal = Number(selectedHotel.price) * nights;
    }

    const total = destinationTotal + hotelTotal;

    const discount = total * selectedPackage.discount / 100;

    const finalPrice = total - discount;

    destinationCost.textContent = formatPrice(destinationTotal);
    hotelCost.textContent = formatPrice(hotelTotal);
    manualCost.textContent = formatPrice(total);

    discountLabel.textContent =
        "Package Discount (" + selectedPackage.discount + "%)";

    discountAmount.textContent = "- " + formatPrice(discount);

    finalPackagePrice.textContent = formatPrice(finalPrice);

}


// DISPLAY PACKAGE INFORMATION

function showPackage() {

    document.title = selectedPackage.title + " - WanderWise";

    packageTitle.textContent = selectedPackage.title;
    packageCategory.textContent = selectedPackage.category;
    packageShortDescription.textContent = selectedPackage.description;
    packageDescription.textContent = selectedPackage.description;

    packageInfoTitle.textContent = selectedPackage.title;

    packageDiscount.textContent =
        selectedPackage.discount + "% WANDERWISE PACKAGE DISCOUNT";

    // USE IMAGE FROM EXISTING DESTINATION DATA

    let imageDestination = null;

    destinations.forEach(function(destination) {

        if (destination.name === selectedPackage.imageDestination) {
            imageDestination = destination;
        }

    });

    if (imageDestination) {
        packageImage.src = imageDestination.image;
        packageImage.alt = imageDestination.name;
    }

    // PACKAGE INFORMATION LIST

    const information = [
        "Destinations from WanderWise data",
        "Available hotel options and rates",
        "Estimated cost based on travelers",
        "Hotel cost based on selected nights",
        selectedPackage.discount + "% package discount"
    ];

    information.forEach(function(item) {

        const li = document.createElement("li");

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-check";

        const text = document.createElement("span");
        text.textContent = item;

        li.appendChild(icon);
        li.appendChild(text);

        packageIncludes.appendChild(li);

    });

    showDestinations();

    updatePackagePrice();

}


// PACKAGE NOT FOUND

function showNotFound() {

    packageTitle.textContent = "Package Not Found";

    packageCategory.textContent = "WANDERWISE";

    packageShortDescription.textContent =
        "The selected travel package could not be found.";

    packageDescription.textContent =
        "Please return to the Home Page and select a valid package.";

    packageImage.style.display = "none";

    packageDiscount.style.display = "none";

    packageInfoTitle.textContent = "No Package Selected";

    packagePlaces.textContent = "No destinations available.";

    packageHotels.textContent = "No hotels available.";

    packageDestination.disabled = true;
    packageHotel.disabled = true;
    packageTravelers.disabled = true;
    packageNights.disabled = true;

}


// DESTINATION CHANGE

packageDestination.addEventListener("change", function() {

    const destinationId = Number(packageDestination.value);

    selectedDestination = null;

    availableDestinations.forEach(function(destination) {

        if (destination.id === destinationId) {
            selectedDestination = destination;
        }

    });

    showHotels();

});


// HOTEL CHANGE

packageHotel.addEventListener("change", function() {

    const hotelId = Number(packageHotel.value);

    selectedHotel = null;

    if (selectedDestination) {

        const availableHotels = getDestinationHotels(selectedDestination);

        availableHotels.forEach(function(hotel) {

            if (hotel.id === hotelId) {
                selectedHotel = hotel;
            }

        });

    }

    updatePackagePrice();

});


// TRAVELERS AND NIGHTS CHANGE

packageTravelers.addEventListener("input", updatePackagePrice);
packageNights.addEventListener("input", updatePackagePrice);


// START

if (selectedPackage) {

    showPackage();

} else {

    showNotFound();

}