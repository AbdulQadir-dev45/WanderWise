
// =====================================
// WANDERWISE - LOGIN SYSTEM
// =====================================

const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const loginMessage = document.getElementById("loginMessage");

const USERS_KEY = "wanderwiseUsers";
const CURRENT_USER_KEY = "wanderwiseCurrentUser";


// GET USERS

function getUsers() {

    try {

        const users = JSON.parse(
            localStorage.getItem(USERS_KEY) || "[]"
        );

        return Array.isArray(users) ? users : [];

    } catch {

        return [];

    }

}


// HASH PASSWORD

async function hashPassword(passwordValue, salt) {

    const data = new TextEncoder().encode(
        salt + passwordValue
    );

    const hash = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

}


// SHOW MESSAGE

function showMessage(message, type) {

    loginMessage.textContent = message;
    loginMessage.className = "form-message " + type;

}


// LOGIN FORM

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    loginEmail.classList.remove("invalid");
    loginPassword.classList.remove("invalid");

    showMessage("", "");

    const emailValue = loginEmail.value.trim().toLowerCase();
    const passwordValue = loginPassword.value;

    let hasError = false;


    // VALIDATE EMAIL

    if (!loginEmail.validity.valid || emailValue === "") {

        loginEmail.classList.add("invalid");
        hasError = true;

    }


    // VALIDATE PASSWORD

    if (passwordValue.length < 6) {

        loginPassword.classList.add("invalid");
        hasError = true;

    }


    if (hasError) {

        showMessage(
            "Please enter a valid email and password.",
            "error"
        );

        return;
    }


    if (!window.crypto || !crypto.subtle) {

        showMessage(
            "Please open the website using HTTPS or VS Code Live Server.",
            "error"
        );

        return;
    }


    try {

        // FIND REGISTERED USER

        const users = getUsers();

        const user = users.find(function(item) {
            return item.email === emailValue;
        });


        if (!user) {

            showMessage(
                "Account not found. Please create an account first.",
                "error"
            );

            return;
        }


        // VERIFY PASSWORD

        const enteredHash = await hashPassword(
            passwordValue,
            user.salt
        );


        if (enteredHash !== user.passwordHash) {

            loginPassword.classList.add("invalid");

            showMessage(
                "Incorrect password. Please try again.",
                "error"
            );

            return;
        }


        // SAVE CURRENT LOGIN SESSION

        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(currentUser)
        );


        showMessage(
            "Login successful! Redirecting...",
            "success"
        );


        // GO TO HOME PAGE

        setTimeout(function() {
            window.location.href = "index.html";
        }, 700);


    } catch (error) {

        console.error("Login Error:", error);

        showMessage(
            "Something went wrong. Please try again.",
            "error"
        );

    }

});
