
// =====================================
// WANDERWISE - SIGNUP SYSTEM
// =====================================

const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const formMessage = document.getElementById("formMessage");

const USERS_KEY = "wanderwiseUsers";
const CURRENT_USER_KEY = "wanderwiseCurrentUser";


// GET REGISTERED USERS

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

    formMessage.textContent = message;
    formMessage.className = "form-message " + type;

}


// CLEAR ERRORS

function clearErrors() {

    fullName.classList.remove("invalid");
    email.classList.remove("invalid");
    password.classList.remove("invalid");
    confirmPassword.classList.remove("invalid");

    showMessage("", "");

}


// SIGNUP FORM

signupForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    clearErrors();

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    let hasError = false;


    // NAME VALIDATION

    if (nameValue.length < 2) {
        fullName.classList.add("invalid");
        hasError = true;
    }


    // EMAIL VALIDATION

    if (!email.validity.valid || emailValue === "") {
        email.classList.add("invalid");
        hasError = true;
    }


    // PASSWORD VALIDATION

    if (passwordValue.length < 6) {
        password.classList.add("invalid");
        hasError = true;
    }


    // CONFIRM PASSWORD

    if (confirmValue !== passwordValue || confirmValue === "") {
        confirmPassword.classList.add("invalid");
        hasError = true;
    }


    if (hasError) {

        showMessage(
            "Please enter correct details.",
            "error"
        );

        return;
    }


    // CHECK SECURE CRYPTO SUPPORT

    if (!window.crypto || !crypto.subtle) {

        showMessage(
            "Please open the website using HTTPS or VS Code Live Server.",
            "error"
        );

        return;
    }


    try {

        const users = getUsers();


        // CHECK EXISTING EMAIL

        const existingUser = users.find(function(user) {
            return user.email === emailValue;
        });

        if (existingUser) {

            email.classList.add("invalid");

            showMessage(
                "This email is already registered. Please login.",
                "error"
            );

            return;
        }


        // CREATE PASSWORD SALT

        const saltArray = crypto.getRandomValues(
            new Uint8Array(16)
        );

        const salt = Array.from(saltArray)
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");


        // HASH PASSWORD

        const passwordHash = await hashPassword(
            passwordValue,
            salt
        );


        // CREATE USER ACCOUNT

        const newUser = {
            id: Date.now().toString(),
            name: nameValue,
            email: emailValue,
            salt: salt,
            passwordHash: passwordHash
        };


        // SAVE ACCOUNT

        users.push(newUser);

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );


        // SAVE LOGIN SESSION

        const currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(currentUser)
        );


        showMessage(
            "Account created successfully! Redirecting...",
            "success"
        );


        // GO TO HOME PAGE

        setTimeout(function() {
            window.location.href = "index.html";
        }, 700);


    } catch (error) {

        console.error("Signup Error:", error);

        showMessage(
            "Something went wrong. Please try again.",
            "error"
        );

    }

});
