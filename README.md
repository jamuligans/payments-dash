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
service. If the config client is out of date the build step prints the service's
message with the recovery instruction.
