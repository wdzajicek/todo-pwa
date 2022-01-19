
# TODO PWA

-----

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
