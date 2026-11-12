
// ========================================
// STORAGE KEYS
// ========================================

const TRIPS_KEY = "wanderwiseTrips";
const HOTELS_KEY = "wanderwiseHotels";


// ========================================
// GET SAVED DATA
// ========================================

function getTrips() {
    try {
        const data = JSON.parse(localStorage.getItem(TRIPS_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

function getHotels() {
    try {
        const data = JSON.parse(localStorage.getItem(HOTELS_KEY));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


// ========================================
// SAVE NEW TRIP
// ========================================

function saveTrip(trip) {

    if (!trip || typeof trip !== "object") {
        console.error("Invalid trip data!");
        return false;
    }

    const trips = getTrips();

    const newTrip = {
        id: Date.now().toString(),
        title: trip.title || trip.tripName || trip.destination || "My Trip",
        destination: trip.destination || trip.location || "",
        startDate: trip.startDate || "",
        endDate: trip.endDate || "",
        travelers: Number(trip.travelers || trip.travellers || 1),
        budget: Number(trip.budget || trip.totalBudget || 0),
        description: trip.description || "",
        itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : [],
        savedAt: new Date().toISOString()
    };

    trips.push(newTrip);

    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));

    console.log("Trip saved successfully!");

    return true;
}


// ========================================
// SAVE HOTEL BOOKING
// ========================================

function saveHotel(hotel) {

    if (!hotel || typeof hotel !== "object") {
        console.error("Invalid hotel data!");
        return false;
    }

    const hotels = getHotels();

    const newHotel = {
        id: Date.now().toString(),
        hotelName: hotel.hotelName || hotel.name || "Hotel",
        checkIn: hotel.checkIn || "",
        checkOut: hotel.checkOut || "",
        total: Number(hotel.total || hotel.price || 0),
        savedAt: new Date().toISOString()
    };

    hotels.push(newHotel);

    localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));

    console.log("Hotel booking saved!");

    return true;
}


// ========================================
// HELPER FUNCTIONS
// ========================================

function money(amount) {
    return "PKR " + Number(amount || 0).toLocaleString("en-PK");
}

function getVal(object, keys, fallback = "") {

    for (const key of keys) {

        if (
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {
            return object[key];
        }
    }

    return fallback;
}


// Create HTML elements using JavaScript DOM

function createElement(tag, className, text = "") {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== "") {
        element.textContent = text;
    }

    return element;
}


// Add icon

function addIcon(parent, iconClass) {

    const icon = document.createElement("i");

    icon.className = iconClass;

    parent.appendChild(icon);
}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    const trips = getTrips();
    const hotels = getHotels();

    let travelers = 0;
    let budget = 0;

    trips.forEach(trip => {

        travelers += Number(
            getVal(trip, ["travelers", "travellers"], 1)
        ) || 1;

        budget += Number(
            getVal(trip, ["budget", "totalBudget", "estimatedBudget"], 0)
        ) || 0;

    });

    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }

    setText("totalTrips", trips.length);
    setText("totalTravelers", travelers);
    setText("totalBudget", money(budget));
    setText("totalHotels", hotels.length);
    setText("tripCount", trips.length);
    setText("hotelCount", hotels.length);
}


// ========================================
// DISPLAY TRIPS
// ========================================

function displayTrips() {

    const content = document.getElementById("tripsContent");

    if (!content) return;

    content.replaceChildren();

    const trips = getTrips();

    // Empty State

    if (trips.length === 0) {

        const empty = createElement("div", "empty-state");

        addIcon(empty, "fa-solid fa-suitcase-rolling");

        empty.appendChild(
            createElement("h3", "", "No Trips Yet")
        );

        empty.appendChild(
            createElement("p", "", "Your planned trips will appear here.")
        );

        const link = createElement("a", "", "Plan Your Trip");

        link.href = "trip-planner.html";

        empty.appendChild(link);

        content.appendChild(empty);

        return;
    }

    const tripsList = createElement("div", "trips-list");

    trips.forEach((trip, index) => {

        const destination = getVal(
            trip,
            ["destination", "location", "city"],
            "Destination"
        );

        const title = getVal(
            trip,
            ["title", "tripName"],
            destination
        );

        const start = getVal(
            trip,
            ["startDate", "departureDate"]
        );

        const end = getVal(
            trip,
            ["endDate", "returnDate"]
        );

        const travelers = getVal(
            trip,
            ["travelers", "travellers"],
            1
        );

        const budget = getVal(
            trip,
            ["budget", "totalBudget", "estimatedBudget"],
            0
        );

        const itinerary = Array.isArray(trip.itinerary)
            ? trip.itinerary
            : [];

        // Trip Card

        const card = createElement("div", "trip-card");

        const info = createElement("div", "trip-info");

        const meta = createElement("div", "trip-meta");

        meta.appendChild(
            createElement("span", "trip-status", "Saved")
        );

        const location = createElement("span");

        addIcon(location, "fa-solid fa-location-dot");

        location.appendChild(
            document.createTextNode(" " + destination)
        );

        meta.appendChild(location);

        info.appendChild(meta);

        info.appendChild(
            createElement("h2", "", title)
        );

        // Trip Details

        const details = createElement("div", "trip-details");

        const date = createElement("span");

        addIcon(date, "fa-regular fa-calendar");

        date.appendChild(
            document.createTextNode(" " + start + " → " + end)
        );

        details.appendChild(date);

        details.appendChild(
            createElement("span", "", "·")
        );

        const travelerText = createElement("span");

        addIcon(travelerText, "fa-solid fa-user-group");

        travelerText.appendChild(
            document.createTextNode(" " + travelers + " Travelers")
        );

        details.appendChild(travelerText);

        details.appendChild(
            createElement("span", "", "·")
        );

        details.appendChild(
            createElement("span", "trip-budget", money(budget))
        );

        info.appendChild(details);

        // Itinerary Details

        const itineraryBox = createElement(
            "div",
            "itinerary-details"
        );

        itineraryBox.id = "details-" + index;
        itineraryBox.hidden = true;

        itineraryBox.appendChild(
            createElement("h3", "", "Trip Itinerary")
        );

        itineraryBox.appendChild(
            createElement("p", "", "Destination: " + destination)
        );

        itineraryBox.appendChild(
            createElement(
                "p",
                "",
                trip.description || "Your saved travel plan."
            )
        );

        if (itinerary.length > 0) {

            const ul = document.createElement("ul");

            itinerary.forEach(item => {

                const itemText = typeof item === "string"
                    ? item
                    : getVal(item, ["title", "name", "activity"]);

                ul.appendChild(
                    createElement("li", "", itemText)
                );

            });

            itineraryBox.appendChild(ul);

        } else {

            itineraryBox.appendChild(
                createElement("p", "", "No detailed itinerary added.")
            );

        }

        info.appendChild(itineraryBox);

        // Action Buttons

        const actions = createElement("div", "trip-actions");

        const viewButton = createElement(
            "button",
            "trip-btn",
            "View Itinerary"
        );

        viewButton.type = "button";
        viewButton.dataset.action = "view-trip";
        viewButton.dataset.index = index;

        const deleteButton = createElement(
            "button",
            "trip-btn delete-btn",
            "Delete"
        );

        deleteButton.type = "button";
        deleteButton.dataset.action = "delete-trip";
        deleteButton.dataset.index = index;

        actions.appendChild(viewButton);
        actions.appendChild(deleteButton);

        card.appendChild(info);
        card.appendChild(actions);

        tripsList.appendChild(card);

    });

    content.appendChild(tripsList);
}


// ========================================
// DISPLAY HOTEL BOOKINGS
// ========================================

function displayHotels() {

    const content = document.getElementById("tripsContent");

    if (!content) return;

    content.replaceChildren();

    const hotels = getHotels();

    // Empty State

    if (hotels.length === 0) {

        const empty = createElement("div", "empty-state");

        addIcon(empty, "fa-solid fa-hotel");

        empty.appendChild(
            createElement("h3", "", "No Hotel Reservations")
        );

        empty.appendChild(
            createElement("p", "", "Your hotel reservations will appear here.")
        );

        const link = createElement("a", "", "Explore Hotels");

        link.href = "hotels.html";

        empty.appendChild(link);

        content.appendChild(empty);

        return;
    }

    const hotelsList = createElement("div", "trips-list");

    hotels.forEach((hotel, index) => {

        const card = createElement("div", "trip-card");

        const info = createElement("div", "trip-info");

        const meta = createElement("div", "trip-meta");

        meta.appendChild(
            createElement("span", "trip-status", "Reserved")
        );

        info.appendChild(meta);

        info.appendChild(
            createElement(
                "h2",
                "",
                getVal(hotel, ["hotelName", "hotel", "name"], "Hotel")
            )
        );

        const details = createElement("div", "trip-details");

        details.appendChild(
            createElement("span", "", "Check-in: " + (hotel.checkIn || ""))
        );

        details.appendChild(
            createElement("span", "", "·")
        );

        details.appendChild(
            createElement("span", "", "Check-out: " + (hotel.checkOut || ""))
        );

        details.appendChild(
            createElement("span", "", "·")
        );

        details.appendChild(
            createElement(
                "span",
                "trip-budget",
                money(hotel.total || hotel.price || 0)
            )
        );

        info.appendChild(details);

        const actions = createElement("div", "trip-actions");

        const deleteButton = createElement(
            "button",
            "trip-btn delete-btn",
            "Delete"
        );

        deleteButton.type = "button";
        deleteButton.dataset.action = "delete-hotel";
        deleteButton.dataset.index = index;

        actions.appendChild(deleteButton);

        card.appendChild(info);
        card.appendChild(actions);

        hotelsList.appendChild(card);

    });

    content.appendChild(hotelsList);
}


// ========================================
// VIEW TRIP
// ========================================

function viewTrip(index) {

    const details = document.getElementById("details-" + index);

    if (details) {
        details.hidden = !details.hidden;
    }
}


// ========================================
// DELETE TRIP
// ========================================

function deleteTrip(index) {

    if (!confirm("Are you sure you want to delete this trip?")) {
        return;
    }

    const trips = getTrips();

    if (index < 0 || index >= trips.length) return;

    trips.splice(index, 1);

    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));

    updateStatistics();
    displayTrips();
}


// ========================================
// DELETE HOTEL
// ========================================

function deleteHotel(index) {

    if (!confirm("Delete this hotel reservation?")) {
        return;
    }

    const hotels = getHotels();

    if (index < 0 || index >= hotels.length) return;

    hotels.splice(index, 1);

    localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));

    updateStatistics();
    displayHotels();
}


// ========================================
// TAB BUTTONS
// ========================================

function initializeTabs() {

    const itineraryTab = document.getElementById("itineraryTab");
    const hotelTab = document.getElementById("hotelTab");

    if (!itineraryTab || !hotelTab) return;

    itineraryTab.addEventListener("click", function () {

        itineraryTab.classList.add("active");
        hotelTab.classList.remove("active");

        displayTrips();

    });

    hotelTab.addEventListener("click", function () {

        hotelTab.classList.add("active");
        itineraryTab.classList.remove("active");

        displayHotels();

    });
}


// ========================================
// TRIP BUTTON EVENTS
// ========================================

function initializeTripButtons() {

    const content = document.getElementById("tripsContent");

    if (!content) return;

    content.addEventListener("click", function (event) {

        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const index = Number(button.dataset.index);

        const action = button.dataset.action;

        if (action === "view-trip") {
            viewTrip(index);
        }

        if (action === "delete-trip") {
            deleteTrip(index);
        }

        if (action === "delete-hotel") {
            deleteHotel(index);
        }

    });
}


// ========================================
// PUBLIC FUNCTIONS
// ========================================

window.WanderWiseTrips = {

    saveTrip: saveTrip,
    saveHotel: saveHotel,

    getTrips: getTrips,
    getHotels: getHotels,

    displayTrips: displayTrips,
    displayHotels: displayHotels,

    updateStatistics: updateStatistics,

    viewTrip: viewTrip,
    deleteTrip: deleteTrip,
    deleteHotel: deleteHotel

};


// ========================================
// PAGE INITIALIZATION
// ========================================

function initializePage() {

    if (!document.getElementById("tripsContent")) return;

    initializeTabs();
    initializeTripButtons();

    updateStatistics();
    displayTrips();

    console.log("WanderWise My Trips is ready!");

}


if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initializePage);

} else {

    initializePage();

}


// ========================================
// UPDATE WHEN ANOTHER PAGE SAVES A TRIP
// ========================================

window.addEventListener("storage", function (event) {

    if (event.key === TRIPS_KEY || event.key === HOTELS_KEY) {

        updateStatistics();

        const hotelTab = document.getElementById("hotelTab");

        if (hotelTab && hotelTab.classList.contains("active")) {
            displayHotels();
        } else {
            displayTrips();
        }

    }

});
