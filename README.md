## Getting Started

First, make sure you have the correct Node version. If you have `nvm`, you can run `nvm use` to temporarily update your node version with the latest in the .nvmrc file.

Then, install the dependencies with `npm i`.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions

In real life, I may have asked the following questions before jumping in.

- Is there a limit on the number of conditions that a user can make?
- Do you have test cases available?

In the interest of time and since we do not have a physical person to ask, I made the following assumptions.

- Users can add an infinite number of conditions, OR and AND conditions. This adds more complexity in the code. It will vastly simplify the code if we have a limit on the number of conditions.
- Spaces, font, colors and stylings. Styles may be slightly off in the absence of a Figma spec. Designers usually spec out the screens upto the last pixel in Figma. For a good design, developers simply copy the stylesheet.

## Improvements

- Responsive design - just needs mobile spec. Ideally, it will be easier if we use a mobile first approach during development.
- During development, we can add feature flag so that we can commit our half baked features anytime.
- Cypress tests for end-to-end test. Right now, I am mocking API calls with msw. With Cypress, you can test different data with different API calls.

## Demo

I implemented all the features, including the two bonus points.

![demo1](./demos/demo1.gif)
![demo2](./demos/demo2.gif)
![demo3](./demos/demo3.gif)
