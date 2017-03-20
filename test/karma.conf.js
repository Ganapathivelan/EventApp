module.exports = function(config){
  config.set({

    // relative to the karma.conf.js file
    basePath : '../app',

    // PLEASE PLEASE PLEASE!!!!
    // ENSURE THAT ANYTHING ANGULAR I.E. angular.js angular-route, angular-mock etcs
    // ALL HAVE THE SAME VERSION NUMBER WHEN INSTALLED TO PACKAGE.JSON!!! I.E. 1.6.2 ACROSS THE BOARD
    // ELSE THERE'LL BE PAIN!!!

    // the files listed below are now relative to the basePath value
    // ***PLEASE NOTE: THE ORDER OF THE FILES LISTED ARE ESSENTIAL***
    // ***BE SURE TO LOAD THE REQUIRED FRAMEWORKS AND TESTING RESPECTIVELY ***
    // before loading app and test specs
    files : [
      'lib/angular/angular.js',
      'lib/angular-*/angular-*.js',
      '../test/lib/angular-mocks.js',
      '../test/lib/sinon-1.15.0.js',
      'js/**/*.js',
      '../test/unit/**/*.js'
    ],

    autoWatch : true,

    // frameworks: ['mocha'],
    frameworks: ['jasmine'],

    browsers : ['Chrome'],
    // browsers: ['PhantomJS'],

    plugins : [
      'karma-chrome-launcher',
      // 'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }//,

    // singleRun: true

  });
};
