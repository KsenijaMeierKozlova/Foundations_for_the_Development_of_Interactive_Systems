import { logout } from './auth.js';
import { readEntries } from '.firestore.js';

const logoutBtn = document.querySelector("#logout");
const messageDiv = document.getElementById("message");

logoutBtn.addEventListener('click', async ()=> {
    try {
        await logout();
    }
    catch (error) {
        console.error("Log out failed", error);
        messageDiv.textContent = "Log out failed: " + error.message;
    }
})

const results = 