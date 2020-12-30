# React Starter

This is a barebones React starter app that can be used to bootstrap new React projects. The exact steps used to create this project can be found below. I would recommend going through the steps instead of cloning this repo if only for learning purposes. These steps were compiled after reading countless tutorials on creating a React app from scratch and choosing the set of features, configuration, and conventions that work well for *my* projects. Your mileage may vary.

## Create your project directory structure

`mkdir react-starter`<br />
`cd react-starter`<br />
`mkdir src`<br />
`mkdir src/components`<br />
`mkdir src/styles`

The `/src` directory is where all of our source code will live. Bundled code will be outputted to `/dist` but that folder is created automatically when we build our app so we won't create it here.

## Create your first pages

`touch src/index.html`<br />
`touch src/index.js`

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

The key part of this markup is `id="root"`. In `index.js` we will tell React to look for `#root` and manage everything inside it.

### index.js
```
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx"

ReactDOM.render(<App />, document.querySelector("#root"));
```

The last line simply says to take the `App` component and render it within the HTML tag with the `id` of `root`.

## Create your first React component

`touch src/components/App.jsx`<br />
`touch src/styles/App.css`

### App.jsx
```
import React from "react";
import "../styles/App.css"

function App() {
  return (
    <div className="App">
      Hello world!
    </div>
  );
};

export default App;
```
This is a very simple React component. We first need to import the React library. Then we import the CSS file we just created to accompany this component. Classes are passed to components using the `className` property. Finally, we create and export our component which consists of a simple function that returns JSX. JSX essentially allows us to write something similar to HTML directly in JavaScript instead of manually creating elements.

### App.css
```
.App {
  font-weight: bold;
}
```

This is a very simple CSS file to accompany `App.jsx`.

## Create GitHub repository

You'll want your GitHub repo URL when you initialize npm in the next section, or you can always add it later.

## Initialize npm

`npm init`

This will create your `package.json`. You will be presented with a few questions to help you fill it out. Leave `entry point` and `scripts` as their default values.

## Install webpack

`npm install webpack webpack-cli webpack-dev-server babel-loader html-loader html-webpack-plugin css-loader style-loader --save-dev`

Webpack crawls your code recursively through `require` and `import` statements and builds a dependency graph. It then usues that graph to build a single JavaScript file with all of the modules in the correct order. Webpack starts at the entry point defined in `package.json`, (`index.js` by default).

Webpack only works with JavaScript, so if you want Webpack to read other file types, you need to use "loaders". Loaders convert non-JavaScript files into JavaScript modules that Webpack can work with.

**webpack** – This is the core webpack package.<br />
**webpack-cli** – Allows us to bundle from the command line.<br />
**webpack-dev-server** – Automatically bundles our code whenever we make changes to our app so we don't have to do it manually.<br />
**babel-loader** – The loader for Babel. Babel is used to transpile modern JavaScript to older JavaScript that can be read by older browsers (explained more later).<br />
**html-loader** – This loader will convert your HTML into a string, resolving image sources into `require` statements, and exports it as a JavaScript module. Once HTML and images are managed by webpack you don't have to worry about manually updating referenced filenames or paths that might change due to configuration changes or cache busting filename hashing.<br />
**html-webpack-plugin** – Generates HTML dynamically using a template we supply and embeds a `<script>` tag whose `src` attribute points to our bundled JavaScript. Again, without this plugin, we'd need to manually update the `src` attribute if we were to use filename hashing.<br />
**css-loader** – This loader turns all of your CSS into a string and exports it as a module resolving things like `url()` into `require` for reasons similar to `html-loader`.<br />
**style-loader** – This loader takes the final processed CSS and inserts it between `<style>` tags in your HTML.

We only need to save these as developer dependencies (`--save-dev`), since our production servers only needs the final bundles.

## Create your webpack configuration file

`touch webpack.config.js`

This is where we'll tell webpack to use the various loaders that we installed.

## Add your webpack configuration options

### webpack.config.js
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

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
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    publicPath: "/dist"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js'
  }
};
```

The first `rule` above tells webpack to use `babel-loader` to process all `.js.` and `.jsx` files, ignoring anything in the `node_modules`  folder.

The second rule tells webpack to use `html-loader` for all `.html` files.

The third rule tells webpack to use `css-loader` and `style-loader` for all CSS files. These are processed right to left (or bottom to top).

The `plugins` section tells webpack to use `html-webpack-plugin` with `./src/index.html` as a template, and output the final bundled HTML to `./index.html`.

The `devServer` section sets the bundle path.

The `output` section tell webpack where to output our bundled files and to name them using a hash for cache busting purposes.

## Replace scripts in package.json with webpack scripts

### package.json
```
…
"scripts": {
  "start": "webpack serve --hot --mode development",
  "build": "webpack --mode production"
},
…
 ```

 These are the command line scripts we can run to develop and build our app. We can run them by typing `npm start` and `npm run build` respectively. The `start` script tells `webpack` that we're going to be developing and to watch for changes. The `build` script outputs our final bundled files to `/dist`.

**--open** – Automatically opens the default browser and loads the localhost environment.<br />
**--hot** – Reload the browser automatically whenever a change is made to our app.<br />
**--mode** – Development or production.

## Install Babel

`npm install @babel/core @babel/preset-env @babel/preset-react --save-dev`

Babel is used to transpile modern JavaScript into JavaScript that is supported by older browsers. This allows us to use the newest JavaScript features (some of which React requires) without worrying about whether a our target browsers support them.

**@babel/core** – This is the core Babel package.<br />
**@babel/preset-env** This the main transpiler for converting modern JavaScript into older browser compatible JavaScript.<br />
**@babel/preset-react** – This preset allows us to convert JSX (used by React) into regular JavaScript.<br />

Again, we only need to save these as developer dependencies.

## Add your Babel configuration options to your webpack configuration file

Add this under the `loader: "babel-loader"` line.

### webpack.config.js
```
…
options: {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
  ]
}
…
```

These two presets are what `babel-loader` uses to transpile JavaScript and JSX respectively. Babel presets are a collection of instructions on how to transpile various JavaScript features for older browsers.

## Install React

`npm install react react-dom`

**react** – This is the core React package.<br />
**react-dom** – This package lets React connect to the DOM.

We'll install these are regular dependencies.

## Create your README

`touch README.md`

## Create .gitignore

`touch .gitignore`

## Add your exclusions

```
node_modules/
dist/
```

We don't want to check in the various packages we install in `/node_modules`, they have their own GitHub respositories :) We also don't need to check in our final bundled files in `/dist` as they will be generated in production.

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

## License

© 2021 Mike Gowen

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
