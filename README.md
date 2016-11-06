# Meet-Up Event Planner - Senior Web Developer Nanodegree Project 1

You can view the app at https://davidandrus.github.io/swd-nano-project-1/

Notable libraries included in this project are:
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Redux Form](https://github.com/erikras/redux-form)
* [Material UI](https://github.com/callemall/material-ui)
* [React Router](https://github.com/ReactTraining/react-router)

## Running the project locally

This assumes that you have node and npm installed

### Clone the Repo
``` sh
git clone git@github.com:davidandrus/swd-nano-project-1.git
```
### Install dependencies
`cd` into your cloned folder and then run:
``` sh
npm install
```

### Add API Keys
Copy the keys template by running:

``` sh
cp keys.json.template keys.json
```

Next in _keys.json_ replace __"YOUR_API_KEY_HERE"__ with your google maps API key

#### keys.json
```
{
  "google_maps": "YOUR_API_KEY_HERE"
}
```
 You can obtain a google maps api key from: https://developers.google.com/maps/documentation/javascript/get-api-key

### Starting the dev server
``` sh
npm start
```
After the dev server has started you can view the project at: [http://localhost:3000](http://localhost:3000)
### Build Production Assets
``` sh
npm run build
```
