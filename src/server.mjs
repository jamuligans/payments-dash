import fs from "node:fs";
import http from "node:http";
const cfg = JSON.parse(fs.readFileSync(new URL("./config.generated.json", import.meta.url)));
http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ service: "payments-dash", env: cfg.environment ?? "unknown", ok: true }));
}).listen(cfg.port ?? 3000, () => console.log(`payments-dash on :${cfg.port ?? 3000}`));
