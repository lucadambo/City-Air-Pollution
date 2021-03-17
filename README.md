# CITY AIR POLLUTION

# Project Title

Creation of an application able to return the air pollution level of a city, searched by the user or obtained through geolocation.

## Description


The request was to interface with an external API through a key to obtain the pollution level of the city through geolocation, or through the search for the city by the user.ff

## Getting Started 

#### Technologies

- [JavaScript](https://javascript.info)
- [Webpack](https://webpack.js.org)
- [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/#/)
- [Axios](https://www.npmjs.com/package/axios)
- [Lodash](https://lodash.com/)

### Dependencies

In the application, in addition to the dev-dependencies, it was useful to use the dependencies of Axios and Lodash to facilitate the get request and manage any errors.

### Installing

Just download this repo locally, install the repo with

```javascript
	npm install
```

build the repo with

```javascript
	npm run build
```

and start the app with

```javascript
	npm start
```

Alternatively, you can also test the application directly from the site [CITY AIR POLLUTION](https://city-air-pollution.netlify.app/)

#### API .env

You need to add your APIs token to .env file, here's a snippet with .env sample:

```html
    API_KEY=yourtokenfromaqicn
```

### Executing program

In the initial screen you will have two possibilities: either enter the name of the city and press the SEARCH button, or click the USE GEOLOCALIZATION button.

In both cases, the data of the searched city will appear, with the air pollution index, a comment and the time of the last update of the data.

At that point, a TRY ANOTHER CITY button will appear at the bottom to be able to go back to the initial choice and try a new city.

## Authors

The program was created by Luca d'Ambrosio, with the help of theory and coaches within the [start2impact](https://talent.start2impact.it/home/student_index) platform .

## Version History

* 0.1
    * Initial Release
