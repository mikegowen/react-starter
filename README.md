# Setting up React from scratch (October 2019)

## Create your project directory structure

`mkdir my-project`<br />
`cd my-project`<br />
`mkdir src`

## Create your entry point files

`touch src/index.html`<br />
`touch src/index.js`

## Add barebones content to each entry point file

### index.html

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>My Project</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

### index.js
```
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return <div>Hello world!</div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
```

## Initialize npm

`npm init`

## Install Webpack

`npm install webpack webpack-cli webpack-dev-server babel-loader html-loader html-webpack-plugin css-loader style-loader --save-dev`

npm WARN babel-loader@8.0.6 requires a peer of @babel/core@^7.0.0 but none is installed. You must install peer dependencies yourself.

**webpack** – Bundles all of our different resources and dependencies into singular, optimized bundles.<br />
**webpack-cli** – Enables compilation from the command line.<br />
**webpack-dev-server** – Automatically bundles our code on the fly so we don't have to bundle after every change.<br />
**babel-loader** – The Webpack loader for Babel (transpiles modern JavaScript into browser compatible JavaScript).<br />
**html-loader** – The Webpack loader that handles bundling of HTML.<br />
**html-webpack-plugin** – Generates HTML dynamically with a `<script>` tag used to include our bundled js file.<br />
**css-loader** – The Webpack loader that handles bundling of CSS.<br />
**style-loader** – Loads CSS into the document `<style>` tags.

## Create your Webpack configuration file

`touch webpack.config.js`

## Add your Webpack configuration options

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

**--open** – Opens the default browser and loads the localhost environment.<br />
**--hot** – Watch all your changes and reload the browser automatically.<br />
**--mode** – Development or production.

## Install Babel

`npm install @babel/core @babel/preset-env @babel/preset-react --save-dev`

**@babel/core** – <br />
**@babel/preset-env** – <br />
**@babel/preset-react** – <br />

## Add your Babel configuration options to your Webpack configuration file

Add this under the `loader: "babel-loader"` line

### .babelrc
```
options: {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ]
},
```

## Install React

`npm install react react-dom --save-dev`

**react** – <br />
**react-dom** –

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

## References

* https://www.sentinelstand.com/article/create-react-app-from-scratch-with-webpack-and-babel
* https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658
* https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32
* https://www.valentinog.com/blog/babel/
* https://blog.usejournal.com/setting-up-react-webpack-4-babel-7-from-scratch-2019-b771dca2f637
