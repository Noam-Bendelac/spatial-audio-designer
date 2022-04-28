
# Spatial Audio Designer

Spatialized audio capstone project for CS 4784 HCI Capstone.

## [Live Demo](https://statuesque-truffle-c0f172.netlify.app/)

We used Netlify to easily deploy our frontend-only app.

## Development and Libraries

We utilized the Web Audio API and Web3D technologies through the [Three.js](https://www.npmjs.com/package/three)
library, and through the [@react-three/fiber](https://www.npmjs.com/package/@react-three/fiber)
bridge library. We also used [React](https://www.npmjs.com/package/react) and
[Immer](https://www.npmjs.com/package/immer) for state management and rendering.
We wrote our app in [Typescript](https://www.typescriptlang.org/) and created the
template app using [Create React App](https://create-react-app.dev/). A full list
or our direct dependencies is in the `package.json` file.

Our app is not particularly optimized for performance. Rather, we focused on
exploring visualization and interaction design alternatives during development.
The first thing we would do to improve performance is to change the high-frequency
state updates coming from sliders in the inspector to instead mutate pieces of state like
`Vector3`s rather than allocate new ones, and for all components that read those
mutable pieces of state to also apply them imperatively in `useFrame`, as described
[here](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls#%E2%9C%85-fetch-state-directly)


## create-react-app scripts

These are scripts created by the create-react-app utility. There is an already
built live demo linked above, but if you wish to build or run locally, you can
do so using these commands. After running `npm ci`, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

