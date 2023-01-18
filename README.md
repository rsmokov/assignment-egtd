# Assigment EGTD Demo App

## About

This is a demo application with 2 main routes "Tasks" and "Users". "Users" route has subroutes "User List" and "User Posts".

### Requirements

#### For User List
- Use the public JSONPlaceholder API to fetch and display 10 users on the home page of the application
- Display the users as a vertical list of collapsible sections
- Expanded users should be editable
- Add basic input validation - username, email, address.street, address.suite, and address.city are mandatory
- Implement cancel/revert and submit buttons (should only be active when changes are made)
- Add a button ’See posts’ that redirects to a new page

##### For User Posts

GET https://jsonplaceholder.typicode.com/posts?userId=X
- Display the user details at the top of the page (information should be editable as on the home page)
- Fetch and display a list of posts for the given user id
- Posts should be editable and deletable through the JSONPlaceholder API - use a confirmation popup for
the delete functionality

##### For Tasks

GET https://jsonplaceholder.typicode.com/todos
- Create a separate /tasks route
- Fetch and display a list of tasks - use HTML table with basic pagination of page size 10
- Allow filtering by task status (completed or not completed), title and owner (user)
- Implement functionality for changing the status of a task - changes should persist through searches

## How to run

###### In the project root directory, you should first run:

```bash
 `yarn`
```

###### Then start the application with for dev environment:

```bash
 `yarn start`
```

###### To build the application user the command:

```bash
 `yarn build`
```

###### To run tests:

```bash
 `yarn test`
```

###### Tests with coverage:

```bash
 `yarn test:coverage`
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Tech

- [React with Typescript] (https://create-react-app.dev/docs/adding-typescript/)
- [State management] - Redux and redux-toolkit (https://redux-toolkit.js.org/introduction/getting-started)
- [RTK Query] - Part of the Redux Toolkit. It is purpose-built to solve the use case of data fetching and caching, supplying a compact, but powerful toolset to define an API interface layer for your app. 
- [UI Library] (https://ant.design/components/overview/) - Ant Design for React
- [Router] (https://reactrouter.com/) - react-router
- [Backend] (https://jsonplaceholder.typicode.com/guide/) - JSONPlaceholder API 

## Motivation

The used tech set of coice by recommendation. RTK Query as management for API calls is powerful tool with caching management build in. Its part of redux toolkit so no extra library needed. Did not used axios HTTP client for that matter, asobsolete over RTK Query. It might have less support for older browsers, so a polyfill must be used instead. Used craco to extend react-scripts without ejecting the application. Extended the react-scripts in order to user relative paths for typescript. Setup Husky git hooks for inting on commit and deploy.

## Left TO DO 

- Removing repetative inline styles.
- Generalizind and extendng interfaces for component props.
- Test cases and test coverage

## Authors
Radoslav Smokov

## License

[MIT](https://choosealicense.com/licenses/mit/)
