// adding configs for testing purposes only

var webpackConfig = require('./webpack.config.js');

module.exports = function(config){
  config.set({ // set configurations
    browsers: ['Chrome'], // test our debugs in Chrome browser
    singleRun: true,
    frameworks: ['mocha'], // use mocha framework that has 'describe' and 'it'

    /*
      globing pattern - basic file pattern to match the tests
    */
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/foundation-sites/dist/foundation.min.js',
      './app/app.jsx',
      'app/tests/**/*.test.jsx' // get tests file in tests folder ** (or in any sub directories) that has a file name of star of anything, but ends in of 'test.jsx'
    ], // test files to be executed

    // specifying the things we want to do with our test files
    preprocessors: {
      // run 'webpack' and 'sourcemap' on the test files
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    // which tests passed/failed
    reporters: ['mocha'], // shows the checkmarks
    // tests timeout (if website doesn't load within certain amount of seconds , timeout the page)
    client:{
      mocha:{
        timeout: '5000' // 5 seconds
      }
    },
    webpack: webpackConfig, // load in webpack config
    webpackServer: {
      noInfo: true
    }
  });
};
