// auth.js
var KEY = "bms_user";

function saveUser(user) {
  var toSave = {
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

function getUser() {
  try {
    var raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearUser() {
  localStorage.removeItem(KEY);
}

function isLoggedIn() {
  return !!getUser();
}

// Page guards
function requireGuest() {
  if (isLoggedIn()) {
    window.location.replace(CONFIG.ROUTES.dashboard);
  }
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.replace(CONFIG.ROUTES.login);
  }
}

function logout() {
  clearUser();
  window.location.replace(CONFIG.ROUTES.login);
}