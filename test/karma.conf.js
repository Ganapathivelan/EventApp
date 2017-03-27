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

    // the files below will be rendered as source code so if debugging is required
    // Karma will make the files below available in the browser
    files : [
      'lib/angular/angular.js',
      'lib/angular-*/angular-*.js',
      '../test/lib/angular-mocks.js',
      '../test/lib/sinon-1.15.0.js',
      'js/**/*.js',
      '../test/unit/**/*.js',
      'templates/**/*.html',
    ],

    // to test directives, Karma can load and cache the directives rather tham angular
    // By using karma-ng-html2js-preprocessor package, this should speed up the load time
    // for running unit tests for directives. The four steps to achieving this are as follows
    // 1. npm install the karma-ng-html2js-preprocessor pacakage and save to the package.json file
    // 2. import the karma-ng-html2js-preprocessor plugin into the plugins property array of this
    // file. 3.Create/add the preprocessors property object anywhere within this file and add the
    // following key: value pair below. 4. Make reference to the location of the html files for the
    // directives. ***ENSURE THAT THE FILE PATH MENTIONED IN THE TEMPLATEURL PROPERTY OF ALL
    // DIRECTIVES IS IDENTICAL TO THE STRING VALUE ADDED TO THE FILES PROPERTY ARRAY IN KARMA-CONF
    // FILE. I.E. in a directive.js file, templateUrl: '../templates/directives/EventThumbnail.html',
    // karma-conf.js file -> files: ['../templates/directives/*.html']. If, for whatever reason, this
    // isn't possible, the karma-ng-html2js-preprocessor has a ngHtml2JsPreprocessor proeprty which
    // has properties that can either append or remove parts of path string in order to make it match
    // templateUrl within the directive (see below):
    /*
    ngHtml2JsPreprocessor: {
      stripPrefix: '/string/to/match',
      prependprefix: '/string/to/add'
    }
    */
    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    autoWatch : true,

    // frameworks: ['mocha'],
    frameworks: ['jasmine'],

    browsers : ['Chrome'],
    // browsers: ['PhantomJS'],

    plugins : [
      'karma-chrome-launcher',
      // 'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }//,

    // singleRun: true

  });
};
