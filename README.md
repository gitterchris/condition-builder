## Getting Started

First, make sure you have the correct Node version. If you have `nvm`, you can run `nvm use` to temporarily update your node version with the latest in the .nvmrc file.

Then, install the dependencies with `npm i`.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run storybook:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to see the components.

Run tests with coverage:

```bash
npx jest --coverage
```

![tests](./demos/tests.png)

## Demo

I used NextJS to get webpack and all other dev setup for free. I used the context API + custom hooks pattern to make it easier to share data between components in the tree, thus avoiding prop drilling, resulting to a much cleaner code. To briefly explain the code flow, here is the component tree structure:

1. src/app/page.tsx (Root)

- NextJS page.
- Wraps the main ConditionBuiler component inside the two context providers. DataContextProvider contains the data returned by the URL and all other operations for these data that can be shared by child components. Similarly, QueryContextProvider contains the current queries and all other functions needed to update the queries.

2. src/components/pages/condition-builder/index.tsx

- Contains the actual page.
- Has the header, URL field, Filters and Result as children. Filters and Result are the two main child components.

3. src/components/composite/condition/condition-with-or.tsx (Filters component)

- This is the parent of all condition components in the folder. This represents the entire filter section of the page.
- The conditions-with-or.tsx represents each box in the filter section, separated by OR statements.
- The conditions.tsx represents a single condition, one left condition, operator and value set.

4. src/components/composite/results/index.tsx (Result component)

- Contains the result portion of the page.

![demo1](./demos/demo1.gif)
![demo2](./demos/demo2.gif)
![demo3](./demos/demo3.gif)
