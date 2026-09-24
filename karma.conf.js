// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const process = require('process');
const { execFileSync } = require('child_process');

process.env.CHROME_BIN = execFileSync(
  process.execPath,
  ['-e', "require('puppeteer').executablePath().then(path => process.stdout.write(path))"],
  { encoding: 'utf8' }
).trim();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-spec-reporter'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
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
    autoWatch: false,
    browsers: ['ChromeTesting'],
    customLaunchers: {
      ChromeTesting: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-translate',
          '--disable-extensions',
          '--disable-setuid-sandbox',
          '--no-proxy-server',
          '--enable-logging',
          '--headless',
          '--disable-gpu'
        ]
      }
    },
    singleRun: true,
    restartOnFileChange: false
  });
};