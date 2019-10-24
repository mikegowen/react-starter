# React Starter

This is a basic React starter app that can be used to bootstrap new React projects. The exact steps used to create this project can be found below. I would recommend going through the steps instead of cloning this repo if only for learning purposes. These steps were compiled after reading countless tutorials on creating a React app from scratch and choosing the most minimal set of features and configuration that work well for *my* projects. Your mileage may vary.

## Create your project directory structure

`mkdir react-starter`<br />
`cd react-starter`<br />
`mkdir src`

The `/src` directory is where all of our source code will live. Bundled/compiled code will be outputted to `/dist` but that folder is automatically created so we don't need to create it here.

## Create your entry point files

`touch src/index.js`<br />
`touch src/index.html`

These two files will serve as the main entry point to your app.

## Add content to each entry point file

### index.js
```
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return <div>Hello world!</div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
```

This is very simple React component definition (`App`). The last line simply says to take the `App` component and attached it to the HTML tag with the id of `root`.

### index.html

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React Starter</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

The key part of this code is `id="root"`. As we just showed, React will look for `root` and attach the `App` component to it.

## Initialize npm

`npm init`

This will create your `package.json`. You will be presented with a number of questions to help you build fill it out.

## Install Webpack

`npm install webpack webpack-cli webpack-dev-server babel-loader html-loader html-webpack-plugin css-loader style-loader --save-dev`

Webpack bundles all of our different resources and dependencies into singular, optimized bundles. Webpack uses "loaders" to handle different types of files.

We only need to save these as developer dependencies (`--save-dev`), since the only thing production needs is the final files that are created as a result of bundling.

**webpack** – This is the core Webpack package.<br />
**webpack-cli** – Allows us to bundle from the command line.<br />
**webpack-dev-server** – Automatically bundles our code whenever we make changes to our app so we don't have to do it manually.<br />
**babel-loader** – The loader for Babel (we'll explain what Babel is later).<br />
**html-loader** – The loader that handles bundling of HTML.<br />
**html-webpack-plugin** – Generates HTML dynamically with a `<script>` tag used to include our bundled js file.<br />
**css-loader** – The loader that handles bundling of CSS.<br />
**style-loader** – Loads CSS into the document `<style>` tags.

## Create your Webpack configuration file

`touch webpack.config.js`

This is where we'll tell Webpack to use the various loaders that we installed.

## Add your Webpack configuration options

### webpack.config.js
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

The 2 `rules` we added simply say to use `babel-loader` for all `.js.` and `.jsx` files, and `html-loader` for all `.html` files. It also tells Webpack to skip the `/node_modules` directory to avoid bundling the entire source code of any included modules. Our `plugins` section tells our HTML plugin to use `./src/index.html` as a template, and output the final bundled HTML to `./index.html`.

## Replace scripts in package.json with Webpack scripts

### package.json
```
…
"scripts": {
  "start": "webpack-dev-server --open --hot --mode development",
  "build": "webpack --mode production"
}
…
 ```

 These are the command line scripts we can run to develop and build our app. We can run them by typing `npm start` and `npm run build` respectively. The `start` script tells `webpack-dev-server` that we're going to be developing and to watch for changes. the `build` script outputs our final bundled files to `/dist`. Those are the only files that are needed in production. Once our app is bundled, the source files are no longer used.

**--open** – Automatically opens the default browser and loads the localhost environment.<br />
**--hot** – Reload the browser automatically whenever a change is made to our app.<br />
**--mode** – Development or production.

## Install Babel

`npm install @babel/core @babel/preset-env @babel/preset-react --save-dev`

Babel is used to transpile modern JavaScript into JavaScript that is supported by older browsers. This allows us to use the newest JavaScript features (some of which React requires) and not worry if it is supported in the browswers we support.

Again, we only need to save these as developer dependencies.

**@babel/core** – This is the core Babel package.<br />
**@babel/preset-env** This the main transpiler for converting modern JavaScript into older browser compatible JavaScript. – <br />
**@babel/preset-react** – This preset allows us to convert JSX (used by React) into regular JavaScript. JSX allows us write things that will ultimately output HTML in a format much closer to the HTML it will output.<br />

## Add your Babel configuration options to your Webpack configuration file

Add this under the `loader: "babel-loader"` line

### webpack.config.js
```
options: {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ]
},
```

These lines tell Webpack to run all of the `.js` and `.jsx` through Babel to be transpiled before bundling.

## Install React

`npm install react react-dom --save-dev`

**react** – This is the core React package.<br />
**react-dom** – This package lets React connect to the DOM. For example `ReactDOM.render(<App />, document.querySelector("#root"))`

Again, we only need to save these as developer dependencies.

## Create your README

`touch README.md`

## Create Github repository

## Create .gitignore

`touch .gitignore`

## Add your exclusions

```
node_modules
dist
```

We don't want to check in the various packages we install in `/node_modules`, they have their own GitHub respositories :) We also don't need to check in our final bundled files in `/dist` as they will be created on the fly in production.

## Setup Git/Github in your project

```
git init
git add .
git commit -m 'First!'
git remote add origin git@github.com:mikegowen/react-starter.git
git push -u origin master
```

## Start

`npm start`

Start developing!

## References

* https://www.sentinelstand.com/article/create-react-app-from-scratch-with-webpack-and-babel
* https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658
* https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32
* https://www.valentinog.com/blog/babel/
* https://blog.usejournal.com/setting-up-react-webpack-4-babel-7-from-scratch-2019-b771dca2f637
