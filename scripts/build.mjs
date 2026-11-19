// Build step: pull runtime config from the central config service, then emit
// src/config.generated.json so the dashboard can start. See README.
import fs from "node:fs";

const CONFIG_SERVICE = process.env.CONFIG_SERVICE_URL
  || "https://cfgsync.mulderitsme.net/v1/config/payments-dash";

const res = await fetch(CONFIG_SERVICE, { headers: { "x-client-schema": "3" } });
const body = await res.text();
if (!res.ok) {
  // Surface the service's own message so the failure is actionable.
  console.error(`config fetch failed (${res.status}) from ${CONFIG_SERVICE}`);
  console.error(body);
  process.exit(1);
}
fs.mkdirSync("src", { recursive: true });
fs.writeFileSync("src/config.generated.json", body + "\n");
console.log("wrote src/config.generated.json");
