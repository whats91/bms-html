// api.js
import { CONFIG } from "./config.js";

const apiUrl = (action) => `${CONFIG.BASE_URL}/${CONFIG.VERSION}/?action=${encodeURIComponent(action)}`;

async function post(action, payload = {}) {
  const body = JSON.stringify({
    partner_uid: CONFIG.PARTNER_UID,
    ...payload,
  });

  const res = await fetch(apiUrl(action), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // The API examples showed a Cookie header—NOT required for customer endpoints here.
    body,
  });

  // Network / transport level problems
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  const data = await res.json().catch(() => ({}));
  // Application-level success check
  if (data?.success !== true) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
}

export const BMS = {
  registerCustomer: (payload) => post("register_customer", payload),
  loginCustomer: (payload) => post("login_customer", payload),
  getCustomer: (customer_uid) => post("get_customer", { customer_uid }),
  updateCustomer: (payload) => post("update_customer", payload),
  updateCustomerStatus: (payload) => post("update_customer_status", payload),
};
