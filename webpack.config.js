const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/debounce.js",
    "./js/advert.js",
    "./js/card.js",
    "./js/map.js",
    "./js/photo.js",
    "./js/page.js",
    "./js/drag.js",
    "./js/form.js",
    "./js/filter.js"
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },

  devtool: false
};
