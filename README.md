
# TODO PWA

-----

## Overview

A simple todo app as a progressive web app.

- Bootstrap 5 for layout and styling
- Create/delete tasks
- TODO list is cached using indexedDB API
- Service worker provides near-instant load times and  download/add-to-home capabilities

## Installation

```bash
git clone <git-clone-method>
cd todo-pwa
npm i && bundle i
```

## Builds

Changes to `_config.yml`, `webpack.config.js`, `postcss.config.js`, `package.json`, require the build process be stopped and then restarted.

**Do not push a development build to the GitHub repo.**

### Dev

Running a development build:

```bash
npm run development
```

- Compiles a development JS bundle
- Compiles SASS
- Creates a local server (`http://localhost:3002`)
- Watches for file changes

### Production

Running a production build:

```bash
npm run production
```

- Compiles a production/minified JS bundle
- Compiles SASS
- Creates a local server (`http://localhost:3002`)
- Watches for file changes

### GitHub Pages

1. Run the `gh-pages` script.
2. Copy everything in `_site/*` into `docs/*`.
3. Add files, commit, & push

To run a build for GitHub pages, run the following script already defined in `package.json`:

```bash
npm run gh-pages
```

After the build runs, copy the entire contents of the `_site/` directory containing the new `gh-pages` build and paste it into `docs/`.

Next, add the changes to a new commit and push to the master branch (GitHub pages is setup for `master` in `./docs/`.)