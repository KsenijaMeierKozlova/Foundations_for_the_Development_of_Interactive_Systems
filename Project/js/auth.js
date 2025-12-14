import { auth, db } from "./firebase-init.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

function $(id) {
  return document.getElementById(id);
}

function show(el, visible) {
  if (!el) return;
  el.style.display = visible ? "" : "none";
}

function setText(el, text) {
  if (!el) return;
  el.textContent = text || "";
}

function setupLogin() {
  const form = $("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = $("loginEmail")?.value?.trim();
    const password = $("loginPassword")?.value;
    const err = $("loginError");

    show(err, false);
    setText(err, "");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "moods.html";
    } catch (error) {
      setText(err, error?.message || "Login failed.");
      show(err, true);
    }
  });
}

function setupSignup() {
  const form = $("signupForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = $("signupEmail")?.value?.trim();
    const password = $("signupPassword")?.value;
    const password2 = $("signupPassword2")?.value;
    const err = $("signupError");

    show(err, false);
    setText(err, "");

    if (password !== password2) {
      setText(err, "Passwords do not match.");
      show(err, true);
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        role: "user",
        createdAt: serverTimestamp()
      });

      window.location.href = "moods.html";
    } catch (error) {
      setText(err, error?.message || "Signup failed.");
      show(err, true);
    }
  });
}

function setupNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const favoritesLink = nav.querySelector('a[href="favorites.html"]');
  const loginLink = nav.querySelector('a[href="login.html"]');

  onAuthStateChanged(auth, (user) => {
    if (favoritesLink) favoritesLink.hidden = !user;

    if (user) {
      if (loginLink) {
        loginLink.textContent = "Logout";
        loginLink.href = "#";
        loginLink.onclick = async (e) => {
          e.preventDefault();
          await signOut(auth);
          window.location.href = "index.html";
        };
      }
    } else {
      if (loginLink) {
        loginLink.textContent = "Login / Sign Up";
        loginLink.href = "login.html";
        loginLink.onclick = null;
      }
    }
  });
}

setupLogin();
setupSignup();
setupNav();