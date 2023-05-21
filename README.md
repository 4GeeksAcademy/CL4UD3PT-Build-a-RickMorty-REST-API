<!--hide-->
# <img height="50px" src="src/front/img/get-schwifty.png"/> Rick & Morty BlogWars Reading List
<!--endhide-->

<p align="center">
  <img height="500px" src="./src/front/img/rick-morty-blogwars-anim.gif?raw=true" />
</p>

# 📝 Purpose

Create a full-stack webapp with React and Flask that lists the Characters, Locations and Episodes schemas provided by the Rick & Morty API.

# 👨‍💻 Frontend
1. Need to have 2 views:
	- home.js to list all data (Characters, Locations or Episodes)
	- single.js to show more info from individual

2. Read Later or Favorites functionality
	- Implement a "Read Later" functionality, i.e, a button that allows the user to "save" the item (character, location or episode) into a special list. This list will be shown at the top of the home page, it resembles the main list but only shows the "saved" elements.

# ⚙️ Backend
Create an API that connects to a database and implements the following Endpoints:

- `[GET] /character` Get a list of all the characters in the database
- `[GET] /character/<int:character_id>` Get a one single character information
- `[GET] /location` Get a list of all the locations in the database
- `[GET] /location/<int:location_id>` Get one single location information
- `[GET] /episode` Get a list of all the episodes in the database
- `[GET] /episode/<int:location_id>` Get one single episodes information

Additionally create the following endpoints to allow your Rick&Morty BlogWars to have users and favorites:

- `[GET] /users` Get a list of all the blog post users (not implemented in frontend)

- `[GET] /favorites` Get all the favorites that belong to the current user. (user id is passed in request body)
- `[POST] /favorite/character/<int:character_id>` Add a new favorite character to the current user with the character id = character_id.
- `[POST] /favorite/location/<int:location_id>` Add new favorite location to the current user with the location id = location_id.
- `[POST] /favorite/episode/<int:episode_id>` Add new favorite episode to the current user with the episode id = episode_id.
- `[DELETE] /favorite/character/<int:character_id>` Delete favorite character with the id = character_id.
- `[DELETE] /favorite/location/<int:location_id>` Delete favorite location with the id = location_id.
- `[DELETE] /favorite/episode/<int:episode_id>` Delete favorite episode with the id = episode_id.

Your current API does not have an authentication system (yet), which is why the only way to create users is directly on the database using the flask admin.

# 📖 Fundamentals
This exercise will make you practice the following fundamentals:

Building an RESTful API using one of the most popular libraries Python Flask or Express.js.
Building a database with the ORM called SQLAlchemy or TypeORM
Database Migrations using migration system Alembic or the native migration system from TypeORM.

# 🔥 Bonus
- Option in search bar to not show the suggestions
- Characters, Locations, Episodes and Favorites are saved in sessionStorage

# Later Addons
- User authentication
- Ability to manage Characters, Locations and Episodes in frontend (Add, Edit, Delete)

# 👨‍💻 Technologies
- HTML
- CSS
- Bootstrap
- React
- Flux
- Flask sqlalchemy

# 👥 Contributors
This and many other projects are built by students as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).


# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

- Documentation can be found here: https://start.4geeksacademy.com/starters/react-flask
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to heroku [in just a few steps here](https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Use of .env file.
- SQLAlchemy integration for database abstraction.

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

To update with all yours tables you can edit the file app.py and go to the line 80 to insert the code to populate others tables

### Front-End Manual Installation:

-   Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://start.4geeksacademy.com/deploy).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).