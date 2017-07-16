var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

function ChromeWorld() { // Requires 'chrome' on PATH
    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities({
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            takesScreenshot: false
        }).build();
}

function HeadlessChromeWorld() { // Requires 'chrome' on PATH
    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities({
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            takesScreenshot: false,
            chromeOptions: { args: ['headless', 'disable-gpu'] }
        }).build();
}

var worldMap = {
    'chrome' : ChromeWorld,
    'headless-chrome': HeadlessChromeWorld,
}
var configuredWorld = worldMap[process.env['TESTING_BROWSER']];
var worldConstructor = configuredWorld ? configuredWorld : ChromeWorld;

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(worldConstructor);
})