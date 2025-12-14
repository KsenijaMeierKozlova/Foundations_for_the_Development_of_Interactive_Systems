🌙 MoodSpace

A personal inspiration platform that matches visuals and quotes to your mood

MoodSpace is a small full-stack web application created as part of the
Foundations for the Development of Interactive Systems course.

The goal of the project is to help users explore calming or motivating content based on their current mood, save favourite inspirations, and build a personal mood-based inspiration space.

📄 Project Overview

MoodSpace is built around a simple interaction flow:

Choose a mood → explore images and quotes → save what resonates

The application consists of multiple interconnected HTML pages with a shared visual style, responsive layout, and consistent navigation.
A gradient-based aesthetic, soft colour palette, and expressive typography are used to support the emotional and reflective nature of the experience.

In its final version (Phase 3), MoodSpace is implemented as a functional full-stack web application with:

- user authentication
- real-time database integration
- dynamic content from public APIs
- client-side interactivity powered by JavaScript

🔐 Core Features

1. User registration and login (Firebase Authentication)
2. Mood-based dynamic content (images + quotes)
3. Saving and managing favourites
4. Real-time updates without page reloads
5. Conditional UI based on authentication status
6. Responsive design across devices

📁 Project Structure

moodspace/
│
├── index.html          # Homepage
├── moods.html          # Mood selection
├── mood.html           # Dynamic mood view
├── favorites.html      # Saved inspirations (protected)
├── login.html          # Login page
├── signup.html         # Registration page
├── about.html          # Project information
│
├── css/
│   └── styles.css      # Global styling
│
├── js/
│   ├── firebase-init.js  # Firebase configuration
│   ├── auth.js           # Authentication & navigation logic
│   ├── mood.js           # API integration & mood logic
│   └── favorites.js      # Firestore favourites logic
│
├── assets/
│   └── fonts/          # Custom typography

🖥 Pages Included

1. Homepage
- Project introduction
- Main tagline
- “Get Started” call-to-action
- Navigation to About and Login

2. Mood Selection
- Six mood categories: Calm, Energetic, Focused, Romantic, Creative, Melancholy
- Button-based interaction
- Leads to dynamic mood view

3. Mood Detail Page
- Dynamically loaded background image (Unsplash API)
- Mood-specific inspirational quote (API Ninjas)
- “Add to Favorites” action
- Conditional messaging for non-authenticated users

4. Favorites Page (Dashboard)
- User-specific saved inspirations
- Real-time Firestore updates
- Search, filter, and sort functionality
- Empty state handling
- Delete option for saved items
- Accessible only to authenticated users

5. Login & Sign Up
- Firebase Authentication (email & password)
- Error handling and validation
- Seamless navigation between flows

6. About Page
- Project description
- Technology and API credits

🔄 Dynamic Functionality

MoodSpace includes multiple advanced JavaScript-based interaction features:

1. Live search within favourites
2. Filtering by mood and content type
3. Sorting by creation date
4. Real-time database updates via Firestore onSnapshot
5. Dynamic background updates using JavaScript
6. Conditional UI rendering based on authentication state

All interactions occur without page reloads.

🌐 Public APIs Used

Unsplash API

- Endpoint: /search/photos
- Purpose: Retrieve mood-based background images
- Integration: Dynamic image loading based on selected mood

API Ninjas – Quotes API (v2)

- Endpoint: /v2/randomquotes
- Purpose: Retrieve inspirational quotes by category
- Integration: Quotes are matched to mood categories and displayed dynamically

Error handling and fallbacks implemented

🔥 Firebase Integration

Firebase Authentication

1. Email/password login and registration
2. Authentication state monitoring
3. Conditional access to protected pages (Favorites)

Firestore Database

Collections used:

- users
- favorites

Stored data includes:

- user ID
- mood
- image URL
- quote text and author
- creation timestamp

Each user can only access and manage their own saved data.

📱 Responsive Design

The layout adapts across different screen sizes:

- Desktop (≥1200px): full grid layouts
- Tablet (~768px): simplified grids
- Mobile (≤480px): single-column layout with stacked UI

Media queries, Flexbox, and CSS Grid are used to ensure usability across devices.

🔧 Technologies Used

1. HTML5
2. CSS3 (Flexbox, Grid, media queries)
3. Vanilla JavaScript (ES modules)
4. Firebase Authentication
5. Firestore Database
6. Unsplash API
7. API Ninjas (Quotes API v2)