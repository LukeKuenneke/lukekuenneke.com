// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-spec-reporter'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/jill-sphere-jamboree-herd'),
      subdir: '.',
      reporters: [
        { type: 'kjhtml' },
        { type: 'progress' },
        { type: 'text-summary' },
        { type: 'spec' }
      ]
    },
    reporters: ['spec', 'kjhtml', 'progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeTesting'],
    customLaunchers: {
      ChromeTesting: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--user-data-dir',
          '--disable-translate',
          '--disable-extensions',
          '--disable-setuid-sandbox',
          '--no-proxy-server',
          '--enable-logging',
          '--remote-debugging-address=0.0.0.0',
          '--remote-debugging-port=9876',
          '--headless',
          '--disable-gpu'
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};