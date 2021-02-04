# Starter Project (React + Express + ESLint)

This is a bare bones starter project, with a React front-end, Express back-end, and linting, that can be used to bootstrap new projects. The exact steps used to create this project can be found below. I would recommend going through the steps instead of cloning this repo if only for learning purposes. These steps were compiled after reading countless tutorials on creating an app from scratch and choosing the set of features, configuration, and conventions that work well for *my* projects. Your mileage may vary.

## Create your project directory structure

`mkdir starter-project`<br />
`cd starter-project`<br />
`mkdir src`<br />

The `/src` directory is where all of our source code will live. We’ll eventually add two folders under that called `/client` and `/server`. The final bundled code will be outputted to `/public`, but that folder is created automatically when we build our app so we won’t create it here.

## Initialize npm

`npm init`

This will create your `package.json`. You will be presented with a few questions to help you fill it out. Leave `entry point` and `scripts` as their default values.

# Adding an Express back-end

We’ll start by adding our back-end Express server.

## Install Express

`npm install express`

## Install Nodemon

`npm install -g nodemon`

Nodemon monitors your server files and automatically restart it when changes are made. It’s best to install this globally since you can use it for all of your Node apps.

## Install CORS

`npm install cors`

This permits your client to talk to your server even though they are not on the same domain.

## Install Axios

`npm install axios`

This replaces `fetch` for communicating with our Express server.

## Create a server folder

`mkdir src/server`

## Create a server file

`touch src/server/index.js`

This is the file that will contain your Express server and routes.

### index.js
```
const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" })
})
```

This tells Express to listen for requests on port 3000, and sets up a single GET route at `/`.

# Adding a React front-end

## Create your directory structure

`mkdir src/client`<br />
`mkdir src/client/components`<br />
`mkdir src/client/styles`

## Create your main files

`touch src/client/index.html`<br />
`touch src/client/index.js`

### index.html

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Starter Project</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

The key part of this markup is `id="root"`. In `index.js` we will tell React to look for `#root` and manage everything inside it.

### index.js
```
import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

ReactDOM.render(<App />, document.querySelector("#root"))
```

The last line simply says to take the `App` component and render it within the tag with the `id` of `root` in the prevous HTML file we created.

## Create your first React component

`touch src/client/components/App.jsx`<br />
`touch src/client/styles/App.css`

### App.jsx
```
import React, { useEffect, useState } from "react"
import axios from "axios"
import "../styles/App.css"

function App() {
  const [message, setMessage] = useState([])

  useEffect(async () => {
    const response = await axios.get("http://localhost:3000/")
    setMessage(response.data.message)
  }, [])

  return (
    <div className="App">
      {message}
    </div>
  )
}

export default App
```
This is a very simple React component. We first need to import the React library. Then we’ll import Axios for calling our back-end. Finally, we’ll import the CSS file we just created to accompany this component. Classes are passed to components using the `className` property. Lastly, we create and export our component which consists of a simple function that returns JSX. JSX essentially allows us to write something similar to HTML directly in JavaScript instead of manually creating elements.

### App.css
```
.App {
  font-weight: bold;
}
```

This is a very simple CSS file to accompany `App.jsx`.

## Create GitHub repository

You’ll want your GitHub repo URL handy when you initialize npm in the next section, or you can always add it later.

## Install webpack

`npm install webpack webpack-cli webpack-dev-server babel-loader html-loader html-webpack-plugin css-loader style-loader --save-dev`

Webpack crawls your code recursively through `require` and `import` statements and builds a dependency graph. It then usues that graph to build a single JavaScript file with all of the modules in the correct order. Webpack starts at the entry point defined in `package.json`, (`index.js` by default).

Webpack only works with JavaScript, so if you want Webpack to read other file types, you need to use "loaders". Loaders convert non-JavaScript files into JavaScript modules that Webpack can work with.

**webpack** – This is the core webpack package.<br />
**webpack-cli** – Allows us to bundle from the command line.<br />
**webpack-dev-server** – Automatically bundles our code whenever we make changes to our app so we don’t have to do it manually.<br />
**babel-loader** – The loader for Babel. Babel is used to transpile modern JavaScript to older JavaScript that can be read by older browsers (explained more later).<br />
**html-loader** – This loader will convert your HTML into a string, resolving image sources into `require` statements, and exports it as a JavaScript module. Once HTML and images are managed by webpack you don’t have to worry about manually updating referenced filenames or paths that might change due to configuration changes or cache busting filename hashing.<br />
**html-webpack-plugin** – Generates HTML dynamically using a template we supply and embeds a `<script>` tag whose `src` attribute points to our bundled JavaScript. Again, without this plugin, we’d need to manually update the `src` attribute if we were to use filename hashing.<br />
**css-loader** – This loader turns all of your CSS into a string and exports it as a module resolving things like `url()` into `require` for reasons similar to `html-loader`.<br />
**style-loader** – This loader takes the final processed CSS and inserts it between `<style>` tags in your HTML.

We only need to save these as developer dependencies (`--save-dev`), since our production servers only needs the final bundles.

## Create your webpack configuration file

`touch webpack.config.js`

This is where we’ll tell webpack to use the various loaders that we installed.

## Add your webpack configuration options

### webpack.config.js
```
const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  resolve: {
    extensions: [
      ".jsx",
      ".mjs",
      ".js",
      ".json",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    publicPath: "/",
  },
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].[fullhash].js",
  },
}
```
The `resolve` section allows you to leave off the listed extensions when importing.

The first `rule` above tells webpack to use `babel-loader` to process all `.js.` and `.jsx` files, ignoring anything in the `node_modules` folder.

The second rule tells webpack to use `html-loader` for all `.html` files.

The third rule tells webpack to use `css-loader` and `style-loader` for all CSS files. These are processed right to left (or bottom to top).

The `plugins` section tells webpack to use `html-webpack-plugin` with `./src/client/index.html` as a template, and output the final bundled HTML to `./index.html`.

Setting `publicPath` inside`devServer` sets the path that you’ll use to access the root of the site e.g. `http://localhost:8080/my-path`.

The `output` section tell webpack where to output our bundled files and to name them using a hash for cache busting purposes.

## Replace scripts in package.json with webpack scripts

### package.json
```
…
"scripts": {
  "start:client": "webpack serve --hot --mode development",
  "build": "webpack --mode production",
  "start:server": "nodemon src/server/index.js"
…
 ```

 These are the command line scripts we use to run our client and server. The `start` scripts tell `webpack` that we’re going to be developing, and to watch for changes. The `build` script outputs our final bundled files to `/public`. To run this app locally we need to start our server and our client using `npm run start:server` and `npm run start:client` respectively.

**--hot** – Reload the browser automatically whenever a change is made to our app.<br />
**--mode** – Development or production.

## Install Babel

`npm install @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime --save-dev`

Babel is used to transpile modern JavaScript into JavaScript that is supported by older browsers. This allows us to use the newest JavaScript features (some of which React requires) without worrying about whether a our target browsers support them.

**@babel/core** – This is the core Babel package.<br />
**@babel/preset-env** This the main transpiler for converting modern JavaScript into older browser compatible JavaScript.<br />
**@babel/preset-react** – This preset allows us to convert JSX (used by React) into regular JavaScript.<br />
**@babel/plugin-transform-runtime** – This allows you to use async/await in React, among other things.<br />

`npm install @babel/runtime`

**@babel/runtime** – This allows you to use async/await in React, among other things.<br />

## Create your Babel configuration file

`touch .babelrc`

### .babelrc
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}
```

## Install React

`npm install react react-dom`

**react** – This is the core React package.<br />
**react-dom** – This package lets React connect to the DOM.

We’ll install these are regular dependencies.

## Create your README

`touch README.md`

# Adding linting

## Install ESLint

`npm install eslint --save-dev`

## Initialize ESLint

`npx eslint --init`

You will be asked a series of questions that will setup your initial configuration.

> How would you like to use ESLint?

Choose: "To check syntax, find problems, and enforce code style"

> What type of modules does your project use?

Choose: "JavaScript modules (import/export)"

We will add "CommonJS (require/exports)" once we’re done here.

> Which framework does your project use?

Choose: "React"

> Does your project use TypeScript?

Choose: "No"

> Where does your code run?

Use the space bar to select both "Browser" and "Node"

> How would you like to define a style for your project?

Choose: "Use a popular style guide"

> Which style guide do you want to follow?

Choose: "Airbnb: https://github.com/airbnb/javascript"

> What format do you want your config file to be in?

Choose: "JSON"

> Would you like to install them now with npm?

Choose: "Yes"

## Edit the .eslintrc.json file that was created

### .eslint.json
```
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "commonjs": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-console": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["_id"]
      }
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/prop-types": [0]
  }
}
```

Modify this configuration to suit your own tastes.

## Install the VSCode ESLint extension

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

# Setup Git/Github in your project

## Create .gitignore

`touch .gitignore`

## Add your exclusions

### .gitignore

```
node_modules/
public/
```

We don’t want to check in the various packages we install in `/node_modules`, they have their own GitHub respositories :) We also don’t need to check in our final bundled files in `/public` as they will be generated in production.

```
git init
git add .
git commit -m 'First!'
git branch -M main
git remote add origin git@github.com:mikegowen/starter-project.git
git push -u origin master
```

# Running the project

## Start the server

`npm run start:server`

## Start the client

`npm run start:client`

Now you should be able to access your React app (client) at `https://localhost:8080/`. It will call the Express back-end and return a message to your front-end.

## License

© 2021 Mike Gowen

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
