/* ==========================================
            PROFILE PAGE
========================================== */

let user = {};

/* ==========================================
            DOM ELEMENTS
========================================== */

const avatarLetter =
    document.getElementById("avatarLetter");

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profilePhone =
    document.getElementById("profilePhone");

const profileJoined =
    document.getElementById("profileJoined");

const profileAddress =
    document.getElementById("profileAddress");

const profileCity =
    document.getElementById("profileCity");

const profileState =
    document.getElementById("profileState");

const profilePincode =
    document.getElementById("profilePincode");

/* ==========================================
            INITIALIZE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

});

/* ==========================================
            LOAD PROFILE
========================================== */

async function loadProfile() {

    try {

        const response = await fetch(
            `${API_URL}/api/auth/profile`,
            {
                method: "GET",
                headers: authHeaders
            }
        );

        if (!response.ok) {

            throw new Error("Unable to load profile.");

        }

        const data = await response.json();

        console.log(data);

        user = data.user || data;

        renderProfile();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

/* ==========================================
            RENDER PROFILE
========================================== */

function renderProfile() {

    userName.textContent =
        user.name || "User";

    userEmail.textContent =
        user.email || "-";

    profileName.textContent =
        user.name || "-";

    profileEmail.textContent =
        user.email || "-";

    profilePhone.textContent =
        user.phone || "-";

    profileJoined.textContent =
        formatDate(user.createdAt);

    avatarLetter.textContent =
        getAvatarLetter(user.name);

    if(user.address){

        profileAddress.textContent =
            user.address.street || "-";

        profileCity.textContent =
            user.address.city || "-";

        profileState.textContent =
            user.address.state || "-";

        profilePincode.textContent =
            user.address.pincode || "-";

    }

}

/* ==========================================
            AVATAR LETTER
========================================== */

function getAvatarLetter(name){

    if(!name){

        return "U";

    }

    return name.charAt(0).toUpperCase();

}

/* ==========================================
            FORMAT DATE
========================================== */

function formatDate(date){

    if(!date){

        return "-";

    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );

}


/* ==========================================
            BUTTONS
========================================== */

document
.getElementById("editProfileBtn")
.addEventListener("click", () => {

    alert(
        "Edit Profile feature coming soon."
    );

});

document
.getElementById("changePasswordBtn")
.addEventListener("click", () => {

    alert(
        "Change Password feature coming soon."
    );

});

/* ==========================================
            REFRESH
========================================== */

function refreshProfile(){

    loadProfile();

}