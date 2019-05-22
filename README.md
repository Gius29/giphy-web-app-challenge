## Giphy Search Challenge

### Intro

This code in the repo was done to solve the below challenge. I have used the [create-react-app](https://github.com/facebook/create-react-app) as starting point for the project.
The main tecnologies used are **React, JSX, Redux, Typescipt, SCSS**

### Challenge

- Write a web app that uses the GIPHY image search API and shows the results in a 1-column scrollable view (like Instagram).
- The app must let users enter queries, such as "kittens".
- The app must support endless scrolling, automatically requesting and displaying more images when the user scrolls to the bottom of the view.
- We should be able to clone your code from Github, then run the project by following a README.
- Toggle between 1-column and 3-column display. Allow the user to toggle between 1-column and 3-column views.

### Structure of the code

**src**
|-- **view** It contains the views of the app. We have just the homepage for the moment
|-- **components** It contains all the react components used in the app
|-- **redux** It contains the code that maintains the state of the app
|-- **network** It contains the code that deals with network and the API requests
|-- **layout** It contains the possible layouts available in the app

### Available Scripts:

#### `yarn install`

The first script that needs to be executed. It installs all the dependencies of the project.
[Here](https://github.com/yarnpkg/yarn#readme) is more information about Yarn and how to install it.

#### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

#### `yarn test --coverage --watchAll`

Launches the test runner in the interactive watch mode and generate a coverage report.

#### `yarn run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
