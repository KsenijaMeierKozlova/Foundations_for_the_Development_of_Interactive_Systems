import { auth, logout } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const logoutBtn = document.getElementById("logout");
const messageDiv = document.getElementById("message");
const moodInput = document.getElementById("moodInput");
const saveMoodBtn = document.getElementById("saveMood");
const moodList = document.getElementById("moodList");

const showMessage = (msg, isError = false) => {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? "red" : "green";
};

onAuthStateChanged(auth, user => {
  if (user) {
    showMessage("Logged in as " + user.email);
  } else {
    window.location.href = "index.html";
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await logout();
  } catch (error) {
    showMessage(error.message, true);
  }
});

saveMoodBtn.addEventListener("click", () => {
  const mood = moodInput.value.trim();
  if (!mood) return;

  const li = document.createElement("li");
  li.textContent = mood;
  moodList.appendChild(li);

  moodInput.value = "";
});