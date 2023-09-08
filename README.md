# The Concord App

The Concord App is a group effort for a Discord clone made as part of App Academy's week 20 project. The Concord App allows you find groups that share your interests and make new friends. Join a server you like and start the conversation! Try it out @ https://group-6-concord.onrender.com.

For more details on features and application architecture see our wiki: 
* [Features List](https://github.com/Somorovd/appacademy-group-project-discord/wiki/Feature-List)
* [User Stories](https://github.com/Somorovd/appacademy-group-project-discord/wiki/User-Stories)
* [Database and Endpoints](https://github.com/Somorovd/appacademy-group-project-discord/wiki/Database,-API-Endpoints,-and-Frontend-Routes)
* [Redux Store Shape](https://github.com/Somorovd/appacademy-group-project-discord/wiki/Store-Shape)
* [React Components](https://github.com/Somorovd/appacademy-group-project-discord/wiki/React-Component-List)

## How to Build
  In the root directory:

  ```bash
   pipenv install -r requirements.txt
   pipenv shell
   cp .env.example .env
   flask db upgrade
   flask seed all
   flask run
   ```
In a second terminal:
  ```bash
   cd react-app
   npm install
   npm start
  ```

## Screenshots
![image](https://github.com/Somorovd/appacademy-group-project-discord/assets/18534469/6b434f88-be38-4cef-be3e-6ae63e2e72e4)
![image](https://github.com/Somorovd/appacademy-group-project-discord/assets/18534469/1d67dfe5-1a71-4fb9-ba0d-05a620494704)
![image](https://github.com/Somorovd/appacademy-group-project-discord/assets/18534469/3414affc-90cf-4e6f-a3a8-1911b64937e9)
![image](https://github.com/Somorovd/appacademy-group-project-discord/assets/18534469/4238376d-9280-4e97-ab66-c7787b495b97)
![image](https://github.com/Somorovd/appacademy-group-project-discord/assets/18534469/e03c1058-e514-4348-bdd1-f56d4dafaa25)

## Tech and Languages

* React
* Redux
* Flask
* SQLAlchemy
* Socketio
* Javascript
* Python
* Postgres
* CSS
* HTML

## Future Features

1. Joining private servers via private keys and invites
2. Server member roles and permissions
3. Reactions and replies to messages
4. Notifications and unread messages
5. Live voice chat

## Connect
[Christian Spada](https://github.com/christian-spada)

[Ruben Ramirez](https://github.com/RubenRamirez12)

[Edward Huffstetler](https://github.com/Somorovd)

[Daniel Somorov](https://github.com/Somorovd)


