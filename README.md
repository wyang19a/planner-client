# Get It Done !

This application allows user to CRUD tasks resource, and keep track of complete/incomplete tasks.

![App-image](https://imgur.com/8Dm1qEN)

## Setup Steps

1. [Fork and clone](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone) this repository.
2. Run `npm install` to install all dependencies
3. Use `npm start` to run the client on browser.

## Important Links

- [Deployed Client](https://wyang19a.github.io/planner-client/)
- [Deployed API](https://sheltered-waters-25858.herokuapp.com/)
- [API Repo](https://github.com/wyang19a/planner-api)

## Planning

I planned to make a simple to do list, which can be updated to become a project manager, sharable between users. First goal was to do simple crud action on single resource `tasks` with a `one to many` relationship with `user` (user has many tasks), and wanted to make another resource `project`, which `has many` `users`, and `has many` `tasks`, and make `project` sharable between users, enabling them to see progress of a `project` as a team. I did not get a chance to work on `project` resource yet, but will be working on it as a personal project. I will also be looking to integrate a useful 3rd party api.

### User Stories
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create a new task item with date, title, time, and description.
- As a signed in user, I would like to edit existing task item’s date, title and description.
- As a signed in user, I would like to delete existing task item.
- As a signed in user, I would like to mark completed task item.

### Wireframe

![Wireframe](https://media.git.generalassemb.ly/user/23929/files/43a69a80-40e2-11ea-856d-4ef94865b53a)

### Technologies Used

- React.js
- Jsx/sass
- React Bootstrap
- Rails

### Unsolved problems

- User can select `Time to` to be before `Time from`
- New user, or user without any task will see `Great job! You completed all tasks!` heading.
