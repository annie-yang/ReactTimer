var webpackConfig = require('./webpack.config.js');

module.exports = function(config){
  config.set({ // set configurations
    browsers: ['Chrome'], // test our debugs in Chrome browser
    singleRun: true,
    frameworks: ['mocha'],

    // globing pattern - basic file pattern
    // get tests file in tests folder ** (or in any sub directories) that has a file name of star of anything that end in of 'test.jsx'
    files: ['app/tests/**/*.test.jsx'], // test files to be executed

    // specifying the things we want to do in our test files
    preprocessors: {
      // run 'webpack' and 'sourcemap' on the test files
      'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
    },
    // which tests passed/failed
    reporters: ['mocha'],
    // tests timeout (if website doesn't load within certain amount of seconds , timeout the page)
    client:{
      mocha:{
        timeout: '5000' // 5 seconds
      }
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
