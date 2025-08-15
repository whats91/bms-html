// api.js
var apiUrl = function(action) {
  return CONFIG.BASE_URL + "/" + CONFIG.VERSION + "/?action=" + encodeURIComponent(action);
};

function post(action, payload) {
  payload = payload || {};
  var body = JSON.stringify(Object.assign({
    partner_uid: CONFIG.PARTNER_UID
  }, payload));

  return fetch(apiUrl(action), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": window.location.origin,
      "Accept": "application/json"
    },
    mode: "cors", // Explicitly request CORS mode
    credentials: "include", // Include cookies if needed
    body: body
  })
  .then(function(res) {
    // Network / transport level problems
    if (!res.ok) {
      return res.text().catch(function() { return ""; })
        .then(function(text) {
          throw new Error("HTTP " + res.status + ": " + (text || res.statusText));
        });
    }
    
    return res.json().catch(function() { return {}; });
  })
  .then(function(data) {
    // Application-level success check
    if (data && data.success !== true) {
      throw new Error(data && data.message ? data.message : "Request failed");
    }
    return data;
  });
}

var BMS = {
  registerCustomer: function(payload) { return post("register_customer", payload); },
  loginCustomer: function(payload) { return post("login_customer", payload); },
  getCustomer: function(customer_uid) { return post("get_customer", { customer_uid: customer_uid }); },
  updateCustomer: function(payload) { return post("update_customer", payload); },
  updateCustomerStatus: function(payload) { return post("update_customer_status", payload); }
};