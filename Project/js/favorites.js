import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

function $(id) {
  return document.getElementById(id);
}

let allFavorites = [];
let unsub = null;

function setVisible(el, visible) {
  if (!el) return;
  el.style.display = visible ? "" : "none";
}

function render(list) {
  const grid = $("favoritesGrid");
  const empty = $("favorites-empty");
  const full = $("favorites-full");
  const loading = $("favoritesLoading");

  if (!grid) return;

  setVisible(loading, false);
  grid.innerHTML = "";

  if (!list.length) {
    setVisible(empty, true);
    setVisible(full, false);
    return;
  }

  setVisible(empty, false);
  setVisible(full, true);

  for (const item of list) {
    const card = document.createElement("article");
    card.className = "favorite-card";

    if (item.imageUrl) {
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.mood || "mood";
      card.appendChild(img);
    }

    const title = document.createElement("div");
    title.className = "favorite-card-title";
    const moodName = (item.mood || "mood");
    title.textContent = moodName.charAt(0).toUpperCase() + moodName.slice(1) + " Mood";
    card.appendChild(title);

    if (item.quoteText) {
      const quote = document.createElement("p");
      quote.className = "favorite-quote";
      const author = item.quoteAuthor ? ` — ${item.quoteAuthor}` : "";
      quote.textContent = `“${item.quoteText}”${author}`;
      card.appendChild(quote);
    }

    const del = document.createElement("div");
    del.className = "favorite-delete";
    del.textContent = "🗑 delete";
    del.addEventListener("click", async () => {
      await deleteDoc(doc(db, "favorites", item.id));
    });
    card.appendChild(del);

    grid.appendChild(card);
  }
}

function applyFilters() {
  const qText = ($("favSearch")?.value || "").toLowerCase().trim();
  const type = $("favType")?.value || "all";
  const mood = $("favMood")?.value || "all";
  const sort = $("favSort")?.value || "newest";

  let list = [...allFavorites];

  if (type !== "all") {
    list = list.filter((x) => {
      if (type === "image") return !!x.imageUrl;
      if (type === "quote") return !!x.quoteText;
      return true;
    });
  }

  if (mood !== "all") {
    list = list.filter((x) => (x.mood || "") === mood);
  }

  if (qText) {
    list = list.filter((x) => {
      const t = (x.quoteText || "").toLowerCase();
      const a = (x.quoteAuthor || "").toLowerCase();
      const m = (x.mood || "").toLowerCase();
      return t.includes(qText) || a.includes(qText) || m.includes(qText);
    });
  }

  list.sort((a, b) => {
    const ta = a.createdAt?.seconds || 0;
    const tb = b.createdAt?.seconds || 0;
    return sort === "oldest" ? ta - tb : tb - ta;
  });

  render(list);
}

function bindControls() {
  ["favSearch", "favType", "favMood", "favSort"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener(id === "favSearch" ? "input" : "change", applyFilters);
  });
}

function showLoad() {
  setVisible($("favoritesLoading"), true);
  setVisible($("favorites-empty"), false);
  setVisible($("favorites-full"), false);
}

function showError(text) {
  const loading = $("favoritesLoading");
  if (loading) {
    loading.textContent = text;
    loading.style.display = "";
  }
}

onAuthStateChanged(auth, (user) => {
  if (unsub) {
    unsub();
    unsub = null;
  }

  showLoad();

  if (!user) return;

  const qRef = query(
    collection(db, "favorites"),
    where("uid", "==", user.uid)
  );

  unsub = onSnapshot(
    qRef,
    (snap) => {
      allFavorites = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      applyFilters();
    },
    (err) => {
      showError(err?.message || "Could not load favorites.");
    }
  );

  bindControls();
});