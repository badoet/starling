# Starterapp

> Monorepo for starter app

## Dependencies

This project runs with the following requirements:

- [Node.js 16](https://nodejs.org/en/)
- [npm 7](https://www.npmjs.com/)
- [Postgres 14](https://www.postgresql.org/)

## Installation

### Dependencies

First, install the root dependencies:

```
npm install
```

Then, install the dependencies for all packages:

```
npm run bootstrap
```

### Database

Make sure you have Postgres running in the system.

Create a user for the project:

```
CREATE USER starterapp WITH PASSWORD 'starterapp';
```

Create the databases as needed. For example:

```
CREATE DATABASE starterapp;
GRANT ALL PRIVILEGES ON DATABASE starterapp to starterapp;
```

## Development

To start developing:

```
npm run dev
```

## Commands

[Nx](https://nx.dev/) is the build system that glues the monorepo. The
configuration can be found in `nx.json`.

Nx helps us manage dependencies between commands among the packages. To
visualise the project graph:

```
npx nx graph
```

Nx also helps cache the results of some comands, both terminal output and
created files. If you face issues with caching, reset the project cache with:

```
npx nx reset
```

### Available Scripts

We use the `scripts` folder to manage the implementation of scripts.

#### `bootstrap`

Bootstrap is essentially `npm install`.

#### `audit`

Auditing is done using
[npm audit](https://docs.npmjs.com/cli/v7/commands/npm-audit).

#### `build`

Building process varies, but should always output files to package `dist`.

#### `dev`

Development process varies.

#### `lint`

Linting is comprised of 3 checks:

- [Prettier](https://prettier.io/): `.prettierrc.js`
- [TypeScript](https://www.typescriptlang.org/): `tsconfig.json`
- [ESLint](https://eslint.org/): `.eslintrc.js`

#### `test`

Testing is done using [Jest](https://jestjs.io/), and always output files to
package `coverage`.

#### `test-cov`

This is similar to `test`, but includes the coverage report.

### Running Commands for Packages

A script can be run on a package level. This means it is scoped for the specific
package only.

The command syntax is:

```
npx nx <script> <package>
```

For example, to lint `packages/service`:

```
npx nx lint service
```

You can also do:

```bash
cd packages/service
npx nx lint
```

### Running Commands for Project

The same script can also be run on a project level. This is essentially 2 steps:

- Run script for root scope, if applicable
- Run script for package scope

The command syntax is:

```
npm run <script>
```

For example, to audit the root, as well as all packages:

```
npm run audit
```

This is equivalent to running:

```bash
.scripts/audit
npx nx audit service
npx nx audit portal
# and so on...
```

create .env file
```
LOCALNET_PRIVATE_KEY='<private key>'
TESTNET_PRIVATE_KEY='<private key>'
MAINNET_PRIVATE_KEY='<private key>'

# Mnemonic test seed words
MNEMONIC='test test test test test test test test test test test junk'

# TESTNET
TOKEN_ADDR=
CONTRACT_ROLES_ADDR=
CONTRACT_TEST_ADDR=
```

to deploy token:
run  npx hardhat run scripts/deploy-token.js --network testnet
