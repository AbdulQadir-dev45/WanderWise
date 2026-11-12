


    // ----------------------------------------
    // GET SAVED DATA
    // ----------------------------------------

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

    // ----------------------------------------
    // SAVE NEW TRIP
    // Future Trip Planner will use this function
    // ----------------------------------------

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

    // ----------------------------------------
    // SAVE HOTEL BOOKING
    // ----------------------------------------

    function saveHotel(hotel) {

        if (!hotel || typeof hotel !== "object") {
            console.error("Invalid hotel data!");
            return false;
        }

        const hotels = getHotels();

        hotels.push({
            id: Date.now().toString(),
            hotelName: hotel.hotelName || hotel.name || "Hotel",
            checkIn: hotel.checkIn || "",
            checkOut: hotel.checkOut || "",
            total: Number(hotel.total || hotel.price || 0),
            savedAt: new Date().toISOString()
        });

        localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));

        console.log("Hotel booking saved!");

        return true;
    }

    // ----------------------------------------
    // HELPER FUNCTIONS
    // ----------------------------------------

    function money(amount) {
        return "PKR " + Number(amount || 0).toLocaleString("en-PK");
    }

    function safe(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function getVal(object, keys, fallback = "") {
        for (const key of keys) {
            if (object[key] !== undefined && object[key] !== null && object[key] !== "") {
                return object[key];
            }
        }
        return fallback;
    }

    // ----------------------------------------
    // UPDATE STATISTICS
    // ----------------------------------------

    function updateStatistics() {

        const trips = getTrips();
        const hotels = getHotels();

        let travelers = 0;
        let budget = 0;

        trips.forEach(trip => {
            travelers += Number(getVal(
                trip, ["travelers", "travellers"], 1
            )) || 1;

            budget += Number(getVal(
                trip, ["budget", "totalBudget", "estimatedBudget"], 0
            )) || 0;
        });

        const setText = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        };

        setText("totalTrips", trips.length);
        setText("totalTravelers", travelers);
        setText("totalBudget", money(budget));
        setText("totalHotels", hotels.length);
        setText("tripCount", trips.length);
        setText("hotelCount", hotels.length);
    }

    // ----------------------------------------
    // DISPLAY TRIPS
    // ----------------------------------------

    function displayTrips() {

        const content = document.getElementById("tripsContent");
        if (!content) return;

        const trips = getTrips();

        if (trips.length === 0) {

            content.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-suitcase-rolling"></i>
                    <h3>No Trips Yet</h3>
                    <p>Your planned trips will appear here.</p>
                    <a href="trip-planner.html">Plan Your Trip</a>
                </div>
            `;

            return;
        }

        content.innerHTML = `
            <div class="trips-list">

                ${trips.map((trip, index) => {

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

                    return `
                        <div class="trip-card">

                            <div class="trip-info">

                                <div class="trip-meta">
                                    <span class="trip-status">Saved</span>
                                    <span>
                                        <i class="fa-solid fa-location-dot"></i>
                                        ${safe(destination)}
                                    </span>
                                </div>

                                <h2>${safe(title)}</h2>

                                <div class="trip-details">

                                    <span>
                                        <i class="fa-regular fa-calendar"></i>
                                        ${safe(start)} → ${safe(end)}
                                    </span>

                                    <span>·</span>

                                    <span>
                                        <i class="fa-solid fa-user-group"></i>
                                        ${safe(travelers)} Travelers
                                    </span>

                                    <span>·</span>

                                    <span class="trip-budget">
                                        ${money(budget)}
                                    </span>

                                </div>

                                <div class="itinerary-details"
                                     id="details-${index}" hidden>

                                    <h3>Trip Itinerary</h3>

                                    <p>Destination: ${safe(destination)}</p>

                                    <p>${safe(trip.description || "Your saved travel plan.")}</p>

                                    ${itinerary.length ? `
                                        <ul>
                                            ${itinerary.map(item => `
                                                <li>${safe(
                                                    typeof item === "string"
                                                    ? item
                                                    : getVal(item, ["title", "name", "activity"])
                                                )}</li>
                                            `).join("")}
                                        </ul>
                                    ` : "<p>No detailed itinerary added.</p>"}

                                </div>

                            </div>

                            <div class="trip-actions">

                                <button class="trip-btn"
                                    onclick="WanderWiseTrips.viewTrip(${index})">
                                    View Itinerary
                                </button>

                                <button class="trip-btn delete-btn"
                                    onclick="WanderWiseTrips.deleteTrip(${index})">
                                    Delete
                                </button>

                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;
    }

    // ----------------------------------------
    // DISPLAY HOTEL BOOKINGS
    // ----------------------------------------

    function displayHotels() {

        const content = document.getElementById("tripsContent");
        if (!content) return;

        const hotels = getHotels();

        if (hotels.length === 0) {

            content.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-hotel"></i>
                    <h3>No Hotel Reservations</h3>
                    <p>Your hotel reservations will appear here.</p>
                    <a href="hotels.html">Explore Hotels</a>
                </div>
            `;

            return;
        }

        content.innerHTML = `
            <div class="trips-list">

                ${hotels.map((hotel, index) => `

                    <div class="trip-card">

                        <div class="trip-info">

                            <div class="trip-meta">
                                <span class="trip-status">Reserved</span>
                            </div>

                            <h2>${safe(getVal(
                                hotel, ["hotelName", "hotel", "name"], "Hotel"
                            ))}</h2>

                            <div class="trip-details">

                                <span>
                                    Check-in: ${safe(hotel.checkIn || "")}
                                </span>

                                <span>·</span>

                                <span>
                                    Check-out: ${safe(hotel.checkOut || "")}
                                </span>

                                <span>·</span>

                                <span class="trip-budget">
                                    ${money(hotel.total || hotel.price || 0)}
                                </span>

                            </div>

                        </div>

                        <div class="trip-actions">

                            <button class="trip-btn delete-btn"
                                onclick="WanderWiseTrips.deleteHotel(${index})">
                                Delete
                            </button>

                        </div>

                    </div>

                `).join("")}

            </div>
        `;
    }

    // ----------------------------------------
    // VIEW TRIP
    // ----------------------------------------

    function viewTrip(index) {
        const details = document.getElementById("details-" + index);

        if (details) {
            details.hidden = !details.hidden;
        }
    }

    // ----------------------------------------
    // DELETE TRIP
    // ----------------------------------------

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

    // ----------------------------------------
    // DELETE HOTEL
    // ----------------------------------------

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

    // ----------------------------------------
    // TAB BUTTONS
    // ----------------------------------------

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

    // ----------------------------------------
    // PUBLIC FUNCTIONS FOR FUTURE PAGES
    // ----------------------------------------

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

    // ----------------------------------------
    // PAGE INITIALIZATION
    // ----------------------------------------

    function initializePage() {

        if (!document.getElementById("tripsContent")) return;

        initializeTabs();
        updateStatistics();
        displayTrips();

        console.log("WanderWise My Trips is ready!");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializePage);
    } else {
        initializePage();
    }

    // Update if another page/tab saves a trip
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

})();
