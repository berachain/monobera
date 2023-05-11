# MonoBera 🐻

This is an official home for:

- Homepage
- Dex
- Honey
- BGS

## Stack

This Turborepo has the following tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

Run the following commands to start hacking:

Web: runs on localhost:3000

```sh
yarn dev:web
```

Dapp: runs on localhost:3001

```sh
yarn dev:dapp
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

#### Apps

- `web` (Homepage): [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `dapp` (MainDapp): another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)

For now `dapp` will include routes for the following:

- `dex`
- `honey`
- `bgs`

#### Packages

- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `dapps` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is setup to build `packages/ui` and output the transpiled source and compiled styles to `dist/`. This was chosen to make sharing one `tailwind.config.js` as easy as possible, and to ensure only the CSS that is used by the current application and its dependencies is generated.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update your `tailwind.config.js` to be aware of your package locations, so it can find all usages of the `tailwindcss` class names.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
```
