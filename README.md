This repository tries to prove that `observable-webworker` gets too mangled to work in Angular production builds.

# Usage

## Development mode ✅

`npm start` (or `ng serve`) renders this on [http://localhost:4200/webpack-dev-server/](http://localhost:4200/webpack-dev-server/):

```
Non-observable worker: Hello from non-observable worker
Observable worker: Hello from observable webworker
```

## Build ✅

`npm build` (or `ng build`) renders this when the `dist/observable-webworker-problem` directory is served on a web server:

```
Non-observable worker: Hello from non-observable worker
Observable worker: Hello from observable webworker
```

## Production build ❌

`npm build:prod` (or `ng build --prod`) renders this when the `dist/observable-webworker-problem` directory is served on a web server:

```
Non-observable worker: Hello from non-observable worker
Observable worker:
```

# Why it disappears

When comparing the artefacts created by the two different builds, it's obvious that the production build mangles away too much of the web worker for it to work properly.

Open `dist/observable-webworker-problem/runtime-es2015.703a23e48ad83c851e49.js` after a production build and important things are missing, like `addEventListener` or even the string `Hello from observable webworker` that should be there.


