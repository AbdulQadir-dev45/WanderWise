// =====================================
// WANDERWISE - PACKAGE IMAGES
// =====================================

const packageImages = {

    hajj: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=85",

    umrah: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=85",

    pakistan: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",

    international: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",

    family: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85",

    adventure: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"

};


// =====================================
// GET PACKAGE CARDS
// =====================================

const packageCards = document.querySelectorAll(".package-card");


// =====================================
// SET PACKAGE IMAGES
// =====================================

packageCards.forEach(function(card) {

    const packageLink = card.getAttribute("href");

    const packageId = packageLink.split("package=")[1];

    const image = card.querySelector("img");

    if (packageImages[packageId] && image) {

        image.src = packageImages[packageId];

    }

});