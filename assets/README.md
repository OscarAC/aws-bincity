## About the Demo Application

&nbsp;

The Demo Web Application (BinCity v0.1) represents an abstraction of a global binary state (On/Off) for a set of objects, In the application, this state are represented as apartments within a building.

&nbsp;

![Bincity-BG](../dgm/bincity-bg.png)

&nbsp;

The application is an abstraction to different applications:

- Clickstream
- Global Representational State
- Massive Session Management / Monitoring
- Internet of Things
- More ...

The application makes use of the Cognito provided by the stack to authorize and sign the user. An authorized user can make changes to the global state.

The application uses a table in DynamoDB to store the current global state, and uses the Influxdb for historical changes to the state.


The application has been developed using React and makes use of Redux, and AWS Amplify for its operability. Other libraries and frameworks utilized:

- react-redux
- aws-amplify
- react-bootstrap
- react-router
- react-thunk
- uuid


The application utilizes the API Gateway as its RESTFul back-end in order to fullfil its requests, there are five lambda functions provided to serve as the back-end for the application. The lambda functions provided:

### ListApartments

Lambda function that retrieves the lists all the apartments registered in the system.

``` 
  GET /apartments

  response: {
    [{
      key: 'UUID v4'
      apartment: 0,
      building: 0,
      floor: 0,
      building: 0,
      value: 1
    }],
    ...
  }

```


### CreateApartments

Lambda function that creates a set of apartments for a floor (8 apartments per floor), assigns an UUIDv4 as key, saves it in the database, then returns the newly create apartments

``` 
  POST /apartments

  request: {          
      building: 0          
  }

  response: {
    [{
      key: 'UUID v4'
      apartment: 0,
      building: 0,
      floor: 0,
      building: 0,
      value: 1
    }],
    ...
  }

```

### UpdateApartments

Lambda function that updates a batch of apartments, if the apartments does not contain a keys, then function will asign an UUID v4 and save it in the database.

``` 
  PUT /apartments

  request: {
    [{
      key: 'UUID v4'
      apartment: 0,
      building: 0,
      floor: 0,
      building: 0,
      value: 1
    }],
    ...
  }

  response: {
    [{
      key: 'UUID v4'
      apartment: 0,
      building: 0,
      floor: 0,
      building: 0,
      value: 1
    }],
    ...
  }

```

### DeleteApartments

Lambda function that updates a batch of apartments, if the apartments does not contain a keys, then function will asign an UUID v4 and save it in the database.

``` 
  DELETE /apartments

  request: {
    [{
      key: 'UUID v4'
      apartment: 0,
      building: 0,
      floor: 0,
      building: 0,
      value: 1
    }],
    ...
  }

  response: {    
      deleted: 8    
  }

```

&nbsp;

### StreamReactor

This lambda function will react to the DynamoDB Stream for new modifications of the current state, then send a request to the Influxdb API to store the modification.

An example dashboard is provided in order to demostrate how this data can be exploited using the features of Influxdb 2.0 (please note this just a demostration purpose, therefore some limitations apply).

&nbsp;

![Bincity-BG](../dgm/dashboard-example.png)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


---

&nbsp;

## Questions or contact

&nbsp;

For questions please leave a comment on GitHub.

&nbsp;

---

&nbsp;

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**