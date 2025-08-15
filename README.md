# BMS HTML Demo

This repository contains a minimal front‑end implementation that interacts with the BotMasterSender (BMS) API. The project showcases basic authentication and profile management using only static HTML, vanilla JavaScript, and CSS.

## Features

- **User registration** and **login** flows that persist the session in `localStorage`.
- **Dashboard** page that retrieves and updates the logged‑in user's profile.
- Simple **API wrapper** in `api.js` that centralizes calls to the BMS REST endpoints.
- Modular **auth utilities** to guard routes and manage stored user data.
- Lightweight styling through a single `styles.css` file.

## Project Structure

```
├── api.js          # Fetch helpers for BMS endpoints
├── auth.js         # Authentication utilities and route guards
├── config.js       # Base API URL, version and default routes
├── dashboard.html  # Authenticated dashboard with profile update form
├── index.html      # Redirects to the login page
├── login.html      # Sign‑in form
├── register.html   # Registration form
└── styles.css      # Shared styles
```

## Running the Project

These pages use ES modules, so they must be served over a web server. Any simple static server works:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/index.html` (redirects to `login.html`).

## Configuration

Update values in `config.js` to point at a different API base URL, API version, or partner UID. The `ROUTES` section controls default page paths for redirects.

## Authentication Overview

`auth.js` stores the authenticated user under the `bms_user` key in `localStorage`. Helper functions such as `requireAuth`, `requireGuest`, and `logout` are used by pages to redirect users and clear sessions.

`api.js` exposes helpers like `registerCustomer`, `loginCustomer`, and `getCustomer`, which wrap fetch requests and handle error cases consistently.

## License

No license information is provided with this example.

