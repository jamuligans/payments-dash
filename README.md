# payments-dash

Small internal dashboard for the payments service. Static front end plus a tiny
status API.

## Running locally

```
npm install
npm run build   # pulls runtime config from the central config service
npm start
```

`npm run build` writes `src/config.generated.json` from the central config
service. If the service is unavailable or returns an incompatible config, the
build falls back to a local default so the app can still start.
