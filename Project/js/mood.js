import { NINJAS_KEY, UNSPLASH_KEY } from "./config.js";
import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// console.log("mood.js is running", window.location.search);

function $(id) {
  return document.getElementById(id);
}

const mood = (new URLSearchParams(window.location.search).get("mood") || "calm").toLowerCase();

const moodNames = {
  calm: "Calm Mood",
  energetic: "Energetic Mood",
  focused: "Focused Mood",
  romantic: "Romantic Mood",
  creative: "Creative Mood",
  melancholy: "Melancholy Mood"
};

const moodMap = {
  calm: { unsplashQuery: "calm nature", quoteCategory: "inspirational", quotableTag: "inspirational" },
  energetic: { unsplashQuery: "energy workout", quoteCategory: "success", quotableTag: "motivational" },
  focused: { unsplashQuery: "minimal desk focus", quoteCategory: "learning", quotableTag: "wisdom" },
  romantic: { unsplashQuery: "romantic sunset", quoteCategory: "love", quotableTag: "love" },
  creative: { unsplashQuery: "creative art colors", quoteCategory: "inspirational", quotableTag: "inspirational" },
  melancholy: { unsplashQuery: "rain moody", quoteCategory: "life", quotableTag: "life" }
};

let currentUser = null;
let quoteData = null;
let imageData = null;

function setBackground(url) {
  if (!url) return;
  document.body.style.background = `url("${url}") center/cover no-repeat fixed`;
}

async function fetchUnsplash(moodKey) {
  const query = moodMap[moodKey]?.unsplashQuery || "calm nature";
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`;

  const r = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  });

  if (!r.ok) throw new Error("Unsplash API error");

  const data = await r.json();
  const results = Array.isArray(data?.results) ? data.results : [];

  if (!results.length) return { imageUrl: null };

  const photo = results[Math.floor(Math.random() * results.length)];

  return {
    imageUrl: photo.urls?.regular || photo.urls?.small || null,
    unsplashId: photo.id || null,
    authorName: photo.user?.name || null,
    authorUrl: photo.user?.links?.html || null
  };
}

async function fetchQuoteNinjas(moodKey) {
  const categories = moodMap[moodKey]?.quoteCategory || "inspirational";

  const proxyBase = "https://moodspace-ninjas-proxy.kseniya-meyer.workers.dev/";

  const r = await fetch(`${proxyBase}/?categories=${encodeURIComponent(categories)}`);
  if (!r.ok) throw new Error("Proxy/Ninjas error");

  const data = await r.json();
  const item = Array.isArray(data) ? data[0] : null;

  if (!item) return { quote: "Stay present.", author: "MoodSpace", source: "ninjas" };
  return { quote: item.quote, author: item.author, source: "ninjas" };
}

async function fetchQuoteFallbackQuotable(moodKey) {
  const tag = moodMap[moodKey]?.quotableTag || "inspirational";
  const url = `https://api.quotable.io/random?tags=${encodeURIComponent(tag)}`;

  const r = await fetch(url);
  if (!r.ok) throw new Error("Quotable error");

  const data = await r.json();
  return { quote: data.content, author: data.author, source: "quotable" };
}

async function loadMood() {
  const titleEl = $("moodTitle");
  const quoteEl = $("moodQuote");
  const hintEl = $("loadHint");

  if (titleEl) titleEl.textContent = moodNames[mood] || "Mood";
  if (hintEl) hintEl.textContent = "Loading your mood…";
  if (quoteEl) quoteEl.textContent = "Loading quote…";

  try {
    imageData = await fetchUnsplash(mood);
    if (imageData?.imageUrl) setBackground(imageData.imageUrl);
  } catch (e) {
    imageData = { imageUrl: null };
  }

  try {
    try {
      quoteData = await fetchQuoteNinjas(mood);
    } catch (e) {
      quoteData = await fetchQuoteFallbackQuotable(mood);
    }
  } catch (e) {
    quoteData = { quote: "Stay present.", author: "MoodSpace", source: "fallback" };
  }

  if (quoteEl) quoteEl.textContent = `“${quoteData.quote}” by ${quoteData.author}`;
  if (hintEl) hintEl.textContent = "";
}

function setupSave() {
  const btn = $("saveFavoriteBtn");
  const hint = $("authHint");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    if (!currentUser) {
      if (hint) hint.style.display = "";
      return;
    }
    if (hint) hint.style.display = "none";

    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = "Saving…";

    const payload = {
      uid: currentUser.uid,
      mood,
      createdAt: serverTimestamp(),
      imageUrl: imageData?.imageUrl || null,
      unsplashId: imageData?.unsplashId || null,
      authorName: imageData?.authorName || null,
      authorUrl: imageData?.authorUrl || null,
      quoteText: quoteData?.quote || null,
      quoteAuthor: quoteData?.author || null,
      quoteSource: quoteData?.source || null
    };

    try {
      await addDoc(collection(db, "favorites"), payload);
      btn.textContent = "Saved ✓";
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 900);
    } catch (e) {
      btn.textContent = "Error. Try again";
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 1200);
    }
  });
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

loadMood();
setupSave();