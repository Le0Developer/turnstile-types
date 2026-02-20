# Cloudflare Turnstile Types

Unofficial types for [Cloudflare Turnstile](https://challenges.cloudflare.com/).

## Install

```sh
npm install -D turnstile-types
```

## Usage

Add `turnstile-types` to the types array in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    // ...
    "types": ["turnstile-types"]
  }
}
```

## Maintenance

### Languages

Run this script on https://developers.cloudflare.com/turnstile/reference/supported-languages/ to get the list of supported languages for the `language` option.

```
console.log([...document.querySelectorAll("tbody code")].map(x => x.innerText).map(x => ` | "${x}"`).sort().join("\n"))
```
