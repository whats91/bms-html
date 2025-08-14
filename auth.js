// auth.js
import { CONFIG } from "./config.js";

const KEY = "bms_user";

export function saveUser(user) {
  const toSave = {
    id: user.id,
    uid: user.uid,
    name: user.name,
    email: user.email,
    phone: user.phone,
    username: user.username,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
  localStorage.setItem(KEY, JSON.stringify(toSave));
}

export function getUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

export function isLoggedIn() {
  return !!getUser();
}

// Page guards
export function requireGuest() {
  if (isLoggedIn()) {
    window.location.replace(CONFIG.ROUTES.dashboard);
  }
}

export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.replace(CONFIG.ROUTES.login);
  }
}

export function logout() {
  clearUser();
  window.location.replace(CONFIG.ROUTES.login);
}
