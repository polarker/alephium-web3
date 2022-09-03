# Alephium Web3

[![Github CI][test-badge]][test-link]
[![Code Coverage][coverage-badge]][coverage-link]
[![NPM][npm-badge]][npm-link]
[![code style: prettier][prettier-badge]][prettier-link]

A JavaScript/TypeScript library for building decentralized applications and smart contracts on Alephium.

You could run the following command to scaffold a skeleton project for smart contract development:

```
npx @alephium/web3 <project-dir> [-t template-name]
```

## Install

### In Node projects

```shell
npm install @alephium/web3
```

💥 Until our library is stable, breaking changes will be introduced in **minor** versions (instead of the traditional major versions of semver). We recommend allowing patch-level updates and to always read the [release notes][release-notes] for breaking changes.

```js
// package.json
{
   "dependencies": {
      "@alephium/web3": "~X.Y.Z"
   }
}
```

### In browser projects

All you have to do is to include the library in your HTML document. The `alephium` global variable will be available.

```html
<script src="alephium-web3.min.js"></script>
<script>
  const { walletGenerate } = alephium
  const wallet = walletGenerate()
  console.log(wallet)
</script>
```

You can either build the library by cloning this repo and running the build script (the file will be located at `/dist/alephium-web3.min.js`), or simply using a CDN.

```shell
npm run build
```

#### via UNPKG CDN

```html
<script src="https://unpkg.com/@alephium/web3@X.Y.Z/dist/alephium-web3.min.js"></script>
```

#### via jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@alephium/web3@X.Y.Z/dist/alephium-web3.min.js"></script>
```

## Development

### Update schemas

One first needs to update the version number of `alephium` and `explorer-backend` in `package.json`. Kindly note that one needs to check the compatibility of both OpenAPI files manually.

Typings can automatically generated using the following command:

```shell
npm run update-schemas
```

### Packaging

We need to include the `.gitignore` file inside the npm package so that it can be used by the `dist/cli/create-project.js` script. To do that we define the `prepack` and `postpack` npm scripts that will rename the `.gitignore` file to `gitignore`, pack it into the package, and rename it back to `.gitignore`. Similar approach has been followed by `create-react-app`<sup>[1]</sup>.

### Release

To release a new version:

1. Create a commit that updates the package version in package.json and package-lock.json and a tag with:
   ```shell
   npm version patch # if you want to bump the patch version, without breaking changes
   npm version minor # if you want to bump the minor version, with breaking changes
   npm version prerelease --preid=rc # if you want to create a release candidate
   npm version prerelease --preid=leman # if you want to create a leman prerelease
   ```
2. Push the tag to GitHub and trigger the publish workflow that will publish it on NPM with:

   ```shell
   git push [remote] <tag>
   ```

3. Unless you are on `master`, create a new branch and push it to GitHub so that the tagged commit belongs to a branch of this repo with:
   ```shell
   git checkout -b <tag>
   git push
   ```
   Otherwise, just push to `master`.

## Build

Compile the TypeScript files into JavaScript:

```shell
npm run build
```

## Testing

```shell
npm run start-devnet # this will start a devnet for smart contract tests
npm test
```

or, to watch for changes:

```shell
npm run test:watch
```

[test-badge]: https://github.com/alephium/alephium-web3/actions/workflows/test.yml/badge.svg
[test-link]: https://github.com/alephium/alephium-web3/actions/workflows/test.yml
[coverage-badge]: https://codecov.io/gh/alephium/alephium-web3/branch/master/graph/badge.svg
[coverage-link]: https://codecov.io/gh/alephium/alephium-web3
[npm-badge]: https://img.shields.io/npm/v/@alephium/web3.svg
[npm-link]: https://www.npmjs.org/package/@alephium/web3
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-link]: https://github.com/prettier/prettier
[release-notes]: https://github.com/alephium/alephium-web3/releases
[1]: https://github.com/facebook/create-react-app/blob/2da5517689b7510ff8d8b0148ce372782cb285d7/packages/react-scripts/scripts/init.js#L264-L278
