import { signup, login, auth } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");

const showMessage = (msg, isError = false) => {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? "red" : "green";
};

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "app.html";
  }
});

signupBtn.addEventListener("click", async e => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const user = await signup(email, password);
    showMessage("Signup successful. Welcome " + user.email);
    setTimeout(() => {
      window.location.href = "app.html";
    }, 1000);
  } catch (error) {
    showMessage(error.message, true);
  }
});

signinBtn.addEventListener("click", async e => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const user = await login(email, password);
    showMessage("Login successful. Welcome " + user.email);
    setTimeout(() => {
      window.location.href = "app.html";
    }, 1000);
  } catch (error) {
    showMessage(error.message, true);
  }
});