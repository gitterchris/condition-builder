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

## Assumptions

In real life, I may have asked the following questions before jumping in.

- Is there a limit on the number of conditions that a user can make?
- Do you have test cases available?

In the interest of time and since we do not have a physical person to ask, I made the following assumptions.

- Users can add an infinite number of conditions, OR and AND conditions. This adds more complexity in the code. It will vastly simplify the code if we have a limit on the number of conditions.
- Spaces, font, colors and stylings. Styles may be slightly off in the absence of a Figma spec. Designers usually spec out the screens upto the last pixel in Figma. For a good design, developers simply copy the stylesheet.

## Improvements

- Responsive design - just needs mobile spec. Ideally, it will be easier if we use a mobile first approach during development.
- We can also add a feature flag so that we can commit our half baked features anytime.
- Cypress tests for end-to-end test. Right now, I am mocking API calls with msw. With Cypress, you can test different data with different API calls.
- We can use React Query to further improve our caching and state management.

## Demo

I implemented all the features, including the two bonus points. I used component driven development, wherein I started with the smallest components first (`./src/components/atomic/*`) then slowly building from the bottom up (`./src/components/composite` -> `./src/components/pages`).

I decided to wrap MUI with my own component library to make it cleaner. It will also make it easier for us to update our own components and have more control (e.g. we decided to use Semantic UI instead of MUI, or remove dependency to MUI for some components, etc).

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
