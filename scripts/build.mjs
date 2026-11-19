// Build step: pull runtime config from the central config service, then emit
// src/config.generated.json so the dashboard can start. See README.
import fs from "node:fs";

const CONFIG_SERVICE = process.env.CONFIG_SERVICE_URL
  || "https://cfgsync.mulderitsme.net/v1/config/payments-dash";

const DEFAULT_CONFIG = { environment: "development", port: 3000 };

let body;
try {
  const res = await fetch(CONFIG_SERVICE, { headers: { "x-client-schema": "3" } });
  if (!res.ok) {
    console.warn(`config fetch failed (${res.status}) from ${CONFIG_SERVICE}; using default config`);
  } else {
    const responseBody = await res.text();
    const parsed = JSON.parse(responseBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("config response is not a JSON object");
    }
    body = responseBody;
  }
} catch (error) {
  console.warn(`config load failed: ${error.message}; using default config`);
}

fs.mkdirSync("src", { recursive: true });
fs.writeFileSync("src/config.generated.json", (body ?? JSON.stringify(DEFAULT_CONFIG, null, 2)) + "\n");
console.log("wrote src/config.generated.json");
