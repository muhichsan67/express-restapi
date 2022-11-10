
# Express REST Api

Made by love to support programmers (me of course, lol) create REST Api using Express.
This project already use JWT as middleware.

## Acknowledgements

 - [ExpressJS](https://expressjs.com/)
 - [Sequelize](https://sequelize.org/)
 - [MySQL](https://www.mysql.com/)
 - [JSON Web Token](https://jwt.io/)
 - Etc


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`

`DB`, `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`

`IS_RESYNC` with `true` or `false` as value


## Run Locally

Clone the project

```bash
  git clone https://github.com/muhichsan67/express-restapi.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## API Reference

#### Get all role

```http
  GET /api/auth/allrole
```

#### Sign Up

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|
| `email`      | `string` | **Required**.|
| `phone_number`      | `string` | **Required**.|
| `role`      | `string` | **Not Required**. (admin/moderator/user) Default value will be user.|

#### Sign In

```http
  POST /api/auth/signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|


This is how to test if your token is valid or Not

#### Test Role
```http
  GET /api/test/user
  GET /api/test/mod
  GET /api/test/admin
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Bearer** _USER TOKEN_|

## Tech Stack

**Backend:** Node, Express

**Middleware:** JSON Web Token

**Database:** MySQL


## License

[MIT](https://choosealicense.com/licenses/mit/)

