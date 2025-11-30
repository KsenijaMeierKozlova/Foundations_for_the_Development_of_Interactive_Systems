🌙 MoodSpace

A personal inspiration platform that matches visuals and quotes to your mood

MoodSpace is a small full-stack web application created as part of the Foundations for the Development of Interactive Systems course.
Its goal is to help users explore calming or motivating content based on their current mood, save their favourite inspirations, and create a personal mood space.

📄 Project Overview

MoodSpace is built around a simple idea: choose a mood → explore images and quotes → save what resonates.

The project consists of multiple interconnected HTML pages with a shared visual style, responsive layout, and consistent navigation.
It uses a gradient-based aesthetic with soft colors and expressive typography to support the emotional theme of the site.

This repository contains the Phase 2 submission, which includes:
1. full HTML page structure
2. responsive CSS layouts
3. navigation system
4. placeholder content for future API integration

In Phase 3, Firebase and public APIs will be connected.

📁 Structure

moodspace/
│
├── index.html          # Homepage
├── moods.html          # Mood selection
├── mood.html           # Single mood view (dynamic/placeholder)
├── favorites.html      # Saved inspirations
├── login.html          # Login form
├── signup.html         # Registration form
├── about.html          # Project information
│
├── css/
│   └── styles.css      # Global styling
│
├── js/
│   └── script.js       # Base JS (future: API, Firebase)
│
├── assets/
    ├── images/         # Mood images / placeholders
    ├── icons/          # SVG icons
    └── gradients/      # Background gradient assets

🖥 Pages Included

1. Homepage
- Hero section
- Project tagline
- “Get Started” CTA
- Navigation to About and Login

2. Mood Selection
- Six mood categories (Calm, Energetic, Focused, Romantic, Creative, Melancholy)
- Simple button-based layout
- Leads to mood detail page

3. Mood Detail Page
- Background image representing the mood
- Mood title + inspirational quote
- “Add to Favorites” button
- “Back to Moods” navigation

4. Favorites / Dashboard
- Grid of saved inspirations
- Delete option
- Empty state when no items are saved

5. Login & Sign Up
- Clean, readable forms
- Gradient backgrounds
- Links between login/signup flows

6. About Page
- Brief project explanation
- API & Firebase credits

📱 Responsive Design

The layout adapts across:
1. Desktop (≥1200px) — full multi-column layouts
2. Tablet (~768px) — simplified grids
3. Mobile (≤480px) — single-column content + stacked UI

🎨 Design Decisions

A consistent gradient theme is used across pages to support the emotional concept of “mood”. Typography combines expressive headings with clean body text for readability.

🔧 Technologies Used

1. HTML5
2. CSS3 (Flexbox, Grid, media queries)
3. Vanilla JS (structure only)

Upcoming in Phase 3:

1. Firebase Authentication
2. Firestore Database
3. Unsplash API for images
4. Quotable API for quotes

📬 Author: Ksenija Meier-Kozlova | Tallinn University — Human-Computer Interaction