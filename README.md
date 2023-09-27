<div align="center">

<img src="https://s.electerious.com/images/ackee-lighthouse/icon.png" title="ackee-lighthouse" alt="ackee-lighthouse logo" width="128">

# ackee-lighthouse

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

A script that runs continuously thanks to GitHub Actions and sends [Lighthouse](https://developers.google.com/web/tools/lighthouse) reports the Ackee.

<br/>

</div>

## 🤗 Usage

### 1. Install dependencies

ackee-lighthouse dependents on …

- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [yarn](https://yarnpkg.com/en/)
- [Chrome](https://www.google.com/chrome/index.html)

Make sure to install and update all dependencies before you continue. The installation instructions for the individual dependencies can be found on the linked websites.

### 2. Create the configuration

Pull the project and configure ackee-lighthouse using environment variables or create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

Examples:

```
ACKEE_ENDPOINT=https://ackee.example.com/api
ACKEE_EVENT_ID=a26932b8-a088-4fc1-b723-c3ea5b9ba9e4
URL=https://a.example.com
```

```
ACKEE_ENDPOINT=https://ackee.example.com/api
ACKEE_EVENT_ID=a26932b8-a088-4fc1-b723-c3ea5b9ba9e4,6bad9a10-ed63-447b-b026-086b80da15d2
URL=https://a.example.com,https://b.example.com
AUDIT=speed-index.numericValue
```

### 3. Install ackee-lighthouse

Install all required dependencies.

```sh
yarn install
```

### 4. Run ackee-lighthouse

ackee-lighthouse will create a Lighthouse report for every URL specified in the environment. The `AUDIT` option must be a [dot path](https://github.com/sindresorhus/dot-prop) that selects a single value from the Lighthouse report. It defaults to `speed-index.numericValue`, which will report the speed index as a numeric value (in milliseconds). ackee-lighthouse will send the selected value to the specified Ackee event.

Multiple URLs are handled so that the first URL uses the first event id, the second URL uses the second event id, and so on.

```sh
yarn start
```

## Miscellaneous

### Donate

I am working hard on continuously developing and maintaining Ackee. Please consider making a donation to keep the project going strong and me motivated.

- [Become a GitHub sponsor](https://github.com/sponsors/electerious)
- [Donate via PayPal](https://paypal.me/electerious)
- [Buy me a coffee](https://www.buymeacoffee.com/electerious)

### Links

- [Follow Ackee on Twitter](https://twitter.com/getackee)
- [Vote for Ackee on ProductHunt](https://www.producthunt.com/posts/ackee)
