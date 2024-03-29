// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-electron'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['AngularElectron'],
    singleRun: true,
    customLaunchers: {
      AngularElectron: {
        base: 'Electron',
        browserWindowOptions: {
          webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true
          }
        }
      }
    },
    client: {
      useIframe: false,
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    }
  });
};
