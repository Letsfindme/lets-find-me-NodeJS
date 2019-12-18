![Lets find ME](https://.png)


<p align="center">
  <a href="https://www.letsfindme.online">
    <img alt="Lets find ME" src="https://www.letsfindme.online" width="60" />
  </a>
</p>
<h1 align="center">
  Let's Fine Me starter
</h1>


#### Social network app that empowers volunteers to share new countries culture and places.
- **API** built with Node, Rest, Express, Sequelize (MySQL) and JWT Auth.Find it [here](https://gitfadi.ddns.net/lets-find-me-group/letsfindmenode)
- **WebApp** built with React and Redux.Find it [here](https://gitfadi.ddns.net/lets-find-me-group/letsfindmeui)
- Written in ES6+ using Babel + Parcel
- Designed using Adobe Experience Design. Preview it [here](https://xd.adobe.com/view/a662a49f-57e7-4ffd-91bd-080b150b0317/).


## Features
- Modular and easily scalable code structure
- UI components in separate folder which can be swapped for your favorite UI framework easily
- Responsive UI for React to support Mobile and Tablet
- User authentication using JSON Web Tokens with Rest API
- File upload feature with Multer
- Multi-package setup and dev scripts for an automated dev experiance



## Screenshots and GIFs
Click on image to view fullscreen and zoom

### Desktop
[IMAGE](https://)

![Let's Find ME Desktop](https://)

### Mobile
[IMAGE](https://github.com/.png) · [GIF](https://github.com/.gif)

![Let's Find ME Mobile](https://)

## 🧐 What's inside?
A quick look at the top-level files and directories you'll see in this project.
### Front-end Core Structure
    letsfindme.online
      ├── package.json
      ├── node_modules
      ├── src 
      │   ├── assets
      │   │   └── images
      │   │   
      │   ├── js
      │   │   ├── components
      │   │   ├── pages
      │   │   ├── reducers
      │   │   ├── utils
      │   │   ├── App.jsx
      │   │   ├── App.less
      │   │   ├── reducers.js
      │   │   └── store.js
      │   │   
      │   ├── less
      │   │   ├── components
      │   │   ├── functionnal
      │   │   └── style.less
      │   │ 
      │   ├── index.html
      │   ├── index.jsx
      │   └── index.less
      │
      ├── .babelrc
      ├── .env
      ├── .gitignore
      └── README.md


1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.babelrc`**: The ._babelrc file_ is local configuration for code in project. Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments

4.  **`.env`**: simple configuration text file that is used to define some variables you want to pass into the application's environment.

5.  **`LICENSE`**: Gatsby is licensed under the MIT license.

6. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

7. **`README.md`**: A text file containing useful reference information about the project.


### Back-end Core Structure
    letsfindme.online
      ├── api 
      │   ├── node_modules
      │   ├── public
      │   │   └── images
      │   │       └── uploads
      │   │   
      │   ├── src
      │   │   ├── config
      │   │   ├── controllers
      │   │   ├── media
      │   │   ├── middleware
      │   │   ├── migrations
      │   │   ├── models
      │   │   ├── routes
      │   │   ├── seeders
      │   │   ├── setup
      │   │   ├── util
      │   │   └── index.js
      │   │
      │   ├── .babelrc
      │   ├── .env
      │   ├── .sequelizerc
      │   └── package.json
      │
      ├── .docker-compose.yml
      ├── .Dockerfile
      ├── .gitignore
      └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to the back end server project of the site,such as routs and middleware.

3.  **`/src/sequelizerc`**: This is a special configuration file. It lets you specify  options that you would usually pass as arguments to CLI,such as routs and middleware.

4.  **`/src`**: This directory will contain all of the code related to the back end server project of the site, such as config, models-path and migrations-path.

5.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

6.  **`/src/.babelrc`**: The ._babelrc file_ is local configuration for code in project. Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments

7.  **`/src/.env`**: simple configuration text file that is used to define some variables you want to pass into the application's environment.

8.  **`docker-compose.yml`**:  is a config file for **docker**-**compose**. it allows to deploy, combine and configure multiple **docker-container** at the same time.

9.  **`.Dockerfile`**:  is a text document that contains all the commands a user could call on the command line to assemble an image. Using **docker** build users can create an automated build that executes several command-line instructions in succession.
 
11.  **`LICENSE`**: Gatsby is licensed under the MIT license.

12. **`/src/package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

13. **`README.md`**: A text file containing useful reference information about the project.



## 🚀 Setup and Running

### Back-end
- Prerequisites
  - Node
  - Docker for MySQL (or Postgres / Sqlite / MSSQL)
- Clone repo `http://gitfadi.ddns.net/lets-find-me-group/letsfindmenode.git`
- Configurations
  - Modify `/docker-compose.yml` for database credentials
  - Modify `/api/.env` for PORT (optional)
- Setup
  - API: Install packages and database setup  `cd api` and `npm i`
- Development 
  - Run docker database `docker-compose up` and `npm start`
  - Run API `cd api` and `npm start`
- Production
  - on progress
### Front-end
- Prerequisites
  - Node
- Clone repo `http://gitfadi.ddns.net/lets-find-me-group/letsfindmeui.git`
- Setup
  - Install packages and database setup `npm i`
- Development 
  - Run  `npm run dev`
  - Your site is now running at `http://localhost:1234`!
- Production
  - on progress




## Author
- Fadi NOUFAL - [GitHub](https://github.com/fadinoufal) · [Twitter](https://twitter.com/fadi_noufal)




## Hire me
Looking for a developer to build your next idea or need a developer to work remotely? Get in touch: [noufal4me@gmail.com](mailto:noufal4me@gmail.com)


## License

The License....


