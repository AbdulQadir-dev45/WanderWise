export const hotels = [
    {
        id: 1,
        name: "Hunza Serena Inn",
        location: "Hunza Valley, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 4500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        description: "A peaceful stay surrounded by beautiful mountains."
    },
    {
        id: 2,
        name: "Skardu Mountain Resort",
        location: "Skardu, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 6500,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
        description: "Enjoy beautiful mountain views and a relaxing stay."
    },
    {
        id: 3,
        name: "Istanbul Grand Hotel",
        location: "Istanbul, Turkey",
        country: "Turkey",
        category: "City",
        price: 9000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        description: "A comfortable hotel close to famous city attractions."
    },
    {
        id: 4,
        name: "Bali Paradise Resort",
        location: "Bali, Indonesia",
        country: "Indonesia",
        category: "Beach",
        price: 15000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        description: "A relaxing resort surrounded by tropical beauty."
    },
    {
        id: 5,
        name: "Dubai Luxury Suites",
        location: "Dubai, UAE",
        country: "UAE",
        category: "City",
        price: 18000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        description: "Modern accommodation for a comfortable city visit."
    },
    {
        id: 6,
        name: "Maldives Ocean Stay",
        location: "Maldives",
        country: "Maldives",
        category: "Beach",
        price: 25000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
        description: "Enjoy a beautiful ocean-side holiday experience."
    },

    // --- 1. Makkah, Saudi Arabia (City) ---
    {
        id: 7,
        name: "Makkah Clock Royal Tower",
        location: "Makkah, Saudi Arabia",
        country: "Saudi Arabia",
        category: "City",
        price: 45000,
        rating: 5.0,
        image: "data:image/jpeg;base64,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",
        description: "Luxury hotel offering direct views of the Masjid al-Haram."
    },
    {
        id: 8,
        name: "Pullman Zamzam Makkah",
        location: "Makkah, Saudi Arabia",
        country: "Saudi Arabia",
        category: "City",
        price: 35000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        description: "Comfortable suites just steps away from the sacred mosque."
    },
    {
        id: 9,
        name: "Swissotel Al Maqam Makkah",
        location: "Makkah, Saudi Arabia",
        country: "Saudi Arabia",
        category: "City",
        price: 38000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        description: "Modern hospitality with direct access to the Haram courtyard."
    },

    // --- 2. Paris, France (City) ---
    {
        id: 10,
        name: "Hotel Le Meurice Paris",
        location: "Paris, France",
        country: "France",
        category: "City",
        price: 65000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        description: "Classic Parisian luxury near the Louvre and Tuileries Garden."
    },
    {
        id: 11,
        name: "Pullman Paris Tour Eiffel",
        location: "Paris, France",
        country: "France",
        category: "City",
        price: 55000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        description: "Modern hotel featuring private balconies with Eiffel Tower views."
    },
    {
        id: 12,
        name: "Citadines Saint-Germain Paris",
        location: "Paris, France",
        country: "France",
        category: "City",
        price: 32000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        description: "Cozy stay in the historic heart of Paris along the River Seine."
    },

    // --- 3. Hunza Valley, Pakistan (Mountains) ---
    {
        id: 13,
        name: "Luxus Hunza Attabad Resort",
        location: "Hunza Valley, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 18000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800",
        description: "Lakeside luxury resort with breathtaking views of Attabad Lake."
    },
    {
        id: 14,
        name: "Eagle's Nest Hotel Duikar",
        location: "Hunza Valley, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 12000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
        description: "Hilltop stay famous for sunrise and sunset views over Rakaposhi."
    },

    // --- 4. Skardu, Pakistan (Mountains) ---
    {
        id: 15,
        name: "Shangrila Resort Skardu",
        location: "Skardu, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 22000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
        description: "Iconic resort situated on the tranquil Lower Kachura Lake."
    },
    {
        id: 16,
        name: "Serena Shigar Fort",
        location: "Skardu, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 20000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
        description: "Restored 17th-century heritage palace surrounded by Karakoram peaks."
    },

    // --- 5. Istanbul, Turkey (City) ---
    {
        id: 17,
        name: "Four Seasons Sultanahmet",
        location: "Istanbul, Turkey",
        country: "Turkey",
        category: "City",
        price: 42000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
        description: "Historic luxury stay steps away from Hagia Sophia and Blue Mosque."
    },
    {
        id: 18,
        name: "Swissotel The Bosphorus",
        location: "Istanbul, Turkey",
        country: "Turkey",
        category: "City",
        price: 34000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800",
        description: "Five-star hotel featuring rooftop pools overlooking the Bosphorus strait."
    },

    // --- 6. Bali, Indonesia (Beach) ---
    {
        id: 19,
        name: "Ayana Resort and Spa Bali",
        location: "Bali, Indonesia",
        country: "Indonesia",
        category: "Beach",
        price: 32000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        description: "Cliff-top beachfront resort with private beaches and ocean pools."
    },
    {
        id: 20,
        name: "The Seminyak Beach Resort",
        location: "Bali, Indonesia",
        country: "Indonesia",
        category: "Beach",
        price: 24000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        description: "Modern tropical sanctuary right on the golden sands of Seminyak."
    },

    // --- 7. Dubai, UAE (City) ---
    {
        id: 21,
        name: "Atlantis The Palm Dubai",
        location: "Dubai, UAE",
        country: "UAE",
        category: "City",
        price: 55000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        description: "World-famous resort featuring waterparks and Arabian Gulf views."
    },
    {
        id: 22,
        name: "Address Downtown Dubai",
        location: "Dubai, UAE",
        country: "UAE",
        category: "City",
        price: 48000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        description: "Luxury high-rise hotel facing Burj Khalifa and Dubai Fountain."
    },

    // --- 8. Maldives (Beach) ---
    {
        id: 23,
        name: "Soneva Fushi Island Resort",
        location: "Maldives",
        country: "Maldives",
        category: "Beach",
        price: 75000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        description: "Exclusive overwater villas with private slides into crystal lagoons."
    },
    {
        id: 24,
        name: "Kurumba Maldives Resort",
        location: "Maldives",
        country: "Maldives",
        category: "Beach",
        price: 42000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
        description: "Tropical island getaway surrounded by vibrant coral reefs and white sand."
    },

    // --- 9. Swat Valley, Pakistan (Mountains) ---
    {
        id: 25,
        name: "Swat Serena Hotel",
        location: "Swat Valley, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 14000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        description: "Historic garden hotel offering views of the Hindu Kush mountains."
    },
    {
        id: 26,
        name: "Malam Jabba Ski Resort",
        location: "Swat Valley, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 16000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800",
        description: "Premier hilltop resort featuring chairlifts and snow-covered slopes."
    },
    {
        id: 27,
        name: "Hotel One Kalam Swat",
        location: "Swat Valley, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 9500,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        description: "Cozy stay nestled near the lush pine forests and rivers of Kalam."
    },

    // --- 10. Naran Kaghan, Pakistan (Mountains) ---
    {
        id: 28,
        name: "Pine Park Hotel Shogran",
        location: "Naran Kaghan, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 11000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
        description: "Wooden cottages surrounded by alpine meadows in Shogran valley."
    },
    {
        id: 29,
        name: "Northern Retreat Naran",
        location: "Naran Kaghan, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 8500,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        description: "Riverside lodge close to Kunhar River and Lake Saiful Muluk."
    },
    {
        id: 30,
        name: "Arcadian Sprucewoods Kaghan",
        location: "Naran Kaghan, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 15000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        description: "Boutique luxury resort tucked inside quiet mountain pine woods."
    },

    // --- 11. Murree, Pakistan (Mountains) ---
    {
        id: 31,
        name: "Pearl Continental Bhurban",
        location: "Murree, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 19000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
        description: "Five-star hilltop resort overlooking Kashmir valley and pine forests."
    },
    {
        id: 32,
        name: "Lockwood Hotel Murree",
        location: "Murree, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 8000,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        description: "Classic heritage hotel offering peaceful gardens near Mall Road."
    },
    {
        id: 33,
        name: "Shangrila Resort Hotels Murree",
        location: "Murree, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 10500,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
        description: "Scenic mountain lodge with private balconies facing misty hills."
    },

    // --- 12. Fairy Meadows, Pakistan (Mountains) ---
    {
        id: 34,
        name: "Raikot Sarai Fairy Meadows",
        location: "Fairy Meadows, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 12000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
        description: "Traditional wooden cabins facing the majestic Nanga Parbat peak."
    },
    {
        id: 35,
        name: "Fairy Meadows Broad View Cabins",
        location: "Fairy Meadows, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 9000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
        description: "Cozy alpine huts set directly on lush green meadows under starry skies."
    },
    {
        id: 36,
        name: "Greenland Resort Fairy Meadows",
        location: "Fairy Meadows, Pakistan",
        country: "Pakistan",
        category: "Mountains",
        price: 8500,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
        description: "Rustic mountain stay offering bonfire nights and glacier treks."
    },

    // --- 13. London, United Kingdom (City) ---
    {
        id: 37,
        name: "The Ritz London",
        location: "London, United Kingdom",
        country: "United Kingdom",
        category: "City",
        price: 70000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        description: "Iconic Piccadilly luxury hotel overlooking Green Park."
    },
    {
        id: 38,
        name: "The Savoy London",
        location: "London, United Kingdom",
        country: "United Kingdom",
        category: "City",
        price: 62000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        description: "Historic River Thames hotel close to Covent Garden theaters."
    },
    {
        id: 39,
        name: "CitizenM Tower of London",
        location: "London, United Kingdom",
        country: "United Kingdom",
        category: "City",
        price: 28000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        description: "Modern smart hotel featuring rooftop views of Tower Bridge."
    },

    // --- 14. New York, USA (City) ---
    {
        id: 40,
        name: "The Plaza New York",
        location: "New York, USA",
        country: "USA",
        category: "City",
        price: 75000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
        description: "Landmark Fifth Avenue luxury hotel beside Central Park."
    },
    {
        id: 41,
        name: "Marriott Marquis Times Square",
        location: "New York, USA",
        country: "USA",
        category: "City",
        price: 45000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        description: "Vibrant high-rise stay right in the heart of Broadway."
    },
    {
        id: 42,
        name: "Arlo Midtown Manhattan",
        location: "New York, USA",
        country: "USA",
        category: "City",
        price: 32000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800",
        description: "Sleek contemporary hotel with rooftop terrace and skyline views."
    },

    // --- 15. Tokyo, Japan (City) ---
    {
        id: 43,
        name: "Park Hyatt Tokyo",
        location: "Tokyo, Japan",
        country: "Japan",
        category: "City",
        price: 58000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        description: "Skyscraper luxury in Shinjuku with panoramic Mount Fuji views."
    },
    {
        id: 44,
        name: "Shibuya Excel Hotel Tokyu",
        location: "Tokyo, Japan",
        country: "Japan",
        category: "City",
        price: 30000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        description: "Modern hotel looking directly down over the famous Shibuya Crossing."
    },
    {
        id: 45,
        name: "Hotel Gracery Shinjuku",
        location: "Tokyo, Japan",
        country: "Japan",
        category: "City",
        price: 24000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
        description: "Comfortable city stay surrounded by neon lights and Tokyo dining."
    },

    // --- 16. Santorini, Greece (Beach) ---
    {
        id: 46,
        name: "Canaves Oia Suites Santorini",
        location: "Santorini, Greece",
        country: "Greece",
        category: "Beach",
        price: 68000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
        description: "Whitewashed cliffside suites with private infinity pools over the Aegean Sea."
    },
    {
        id: 47,
        name: "Katikies Hotel Santorini",
        location: "Santorini, Greece",
        country: "Greece",
        category: "Beach",
        price: 60000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800",
        description: "Iconic boutique stay perched high above the blue caldera waters."
    },
    {
        id: 48,
        name: "Aqua Blue Beach Hotel",
        location: "Santorini, Greece",
        country: "Greece",
        category: "Beach",
        price: 28000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        description: "Relaxing beachfront hotel located right along Perissa Black Sand Beach."
    },

    // --- 17. Phuket, Thailand (Beach) ---
    {
        id: 49,
        name: "Amanpuri Beach Resort Phuket",
        location: "Phuket, Thailand",
        country: "Thailand",
        category: "Beach",
        price: 54000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800",
        description: "Secluded tropical pavilions set along private white sand beaches."
    },
    {
        id: 50,
        name: "Katathani Phuket Beach Resort",
        location: "Phuket, Thailand",
        country: "Thailand",
        category: "Beach",
        price: 22000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        description: "Oceanfront family resort nestled in a quiet cove at Kata Noi Beach."
    },
    {
        id: 51,
        name: "The Shore at Katathani",
        location: "Phuket, Thailand",
        country: "Thailand",
        category: "Beach",
        price: 38000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        description: "Luxury pool villas offering uninterrupted Andaman Sea sunset views."
    },

    // --- 18. Switzerland (Mountains) ---
    {
        id: 52,
        name: "Badrutt's Palace St. Moritz",
        location: "St. Moritz, Switzerland",
        country: "Switzerland",
        category: "Mountains",
        price: 85000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
        description: "Legendary alpine castle resort overlooking Lake St. Moritz."
    },
    {
        id: 53,
        name: "Victoria-Jungfrau Grand Hotel",
        location: "Interlaken, Switzerland",
        country: "Switzerland",
        category: "Mountains",
        price: 68000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=800",
        description: "Historic spa resort framed by snow-capped Jungfrau mountain peaks."
    },
    {
        id: 54,
        name: "Hotel Schweizerhof Zermatt",
        location: "Zermatt, Switzerland",
        country: "Switzerland",
        category: "Mountains",
        price: 55000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        description: "Cozy chalet-style luxury hotel with direct views of the Matterhorn."
    },

    // --- 19. Cappadocia, Turkey (Mountains) ---
    {
        id: 55,
        name: "Museum Hotel Cappadocia",
        location: "Cappadocia, Turkey",
        country: "Turkey",
        category: "Mountains",
        price: 44000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800",
        description: "Luxury cave suites with terraces overlooking hot air balloons at sunrise."
    },
    {
        id: 56,
        name: "Sultan Cave Suites Goreme",
        location: "Cappadocia, Turkey",
        country: "Turkey",
        category: "Mountains",
        price: 26000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
        description: "Authentic stone-carved rooms featuring panoramic valley rooftops."
    },

    // --- 20. Abu Dhabi, UAE (City) ---
    {
        id: 57,
        name: "Emirates Palace Mandarin Oriental",
        location: "Abu Dhabi, UAE",
        country: "UAE",
        category: "City",
        price: 62000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800",
        description: "Palatial Arabian luxury resort with private marina and golden domes."
    },
    {
        id: 58,
        name: "Conrad Abu Dhabi Etihad Towers",
        location: "Abu Dhabi, UAE",
        country: "UAE",
        category: "City",
        price: 32000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        description: "Sleek skyscraper hotel featuring an observation deck over the Corniche."
    },

    // --- 21. Baku, Azerbaijan (City) ---
    {
        id: 59,
        name: "Fairmont Baku Flame Towers",
        location: "Baku, Azerbaijan",
        country: "Azerbaijan",
        category: "City",
        price: 28000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800",
        description: "Iconic modern tower hotel overlooking the Caspian Sea and Old City."
    },
    {
        id: 60,
        name: "Four Seasons Hotel Baku",
        location: "Baku, Azerbaijan",
        country: "Azerbaijan",
        category: "City",
        price: 36000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        description: "Beaux-Arts style waterfront hotel along the scenic Baku Boulevard."
    },

    // --- 22. Rome, Italy (City) ---
    {
        id: 61,
        name: "Hotel Hassler Roma",
        location: "Rome, Italy",
        country: "Italy",
        category: "City",
        price: 64000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
        description: "Historic luxury hotel perched right at the top of the Spanish Steps."
    },
    {
        id: 62,
        name: "Palazzo Manfredi Rome",
        location: "Rome, Italy",
        country: "Italy",
        category: "City",
        price: 52000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        description: "Boutique stay featuring rooftop dining directly facing the Colosseum."
    },

    // --- 23. Cairo, Egypt (City) ---
    {
        id: 63,
        name: "Marriott Mena House Cairo",
        location: "Cairo, Egypt",
        country: "Egypt",
        category: "City",
        price: 34000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800",
        description: "Historic palace hotel with lush gardens facing the Great Pyramids of Giza."
    },
    {
        id: 64,
        name: "The Nile Ritz-Carlton Cairo",
        location: "Cairo, Egypt",
        country: "Egypt",
        category: "City",
        price: 30000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        description: "Riverside luxury located next to the Egyptian Museum and Tahrir Square."
    },

    // --- 24. Queenstown, New Zealand (Mountains) ---
    {
        id: 65,
        name: "Eichardt's Private Hotel",
        location: "Queenstown, New Zealand",
        country: "New Zealand",
        category: "Mountains",
        price: 68000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800",
        description: "Lakefront luxury suites framed by the Remarkables mountain range."
    },
    {
        id: 66,
        name: "Hilton Queenstown Resort",
        location: "Queenstown, New Zealand",
        country: "New Zealand",
        category: "Mountains",
        price: 36000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
        description: "Peaceful lakeside retreat on the shores of Lake Wakatipu."
    },

    // --- 25. Langkawi, Malaysia (Beach) ---
    {
        id: 67,
        name: "The Datai Langkawi",
        location: "Langkawi, Malaysia",
        country: "Malaysia",
        category: "Beach",
        price: 52000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
        description: "Rainforest sanctuary opening onto a private white sand Andaman bay."
    },
    {
        id: 68,
        name: "Pelangi Beach Resort Langkawi",
        location: "Langkawi, Malaysia",
        country: "Malaysia",
        category: "Beach",
        price: 24000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
        description: "Traditional wooden chalets set along the lively Cenang beachfront."
    }
];