var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

function PhantomJSWorld() { // Requires included phantomjs binary.
    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities({
            browserName: 'phantomjs',
            javascriptEnabled: true,
            acceptSslCerts: true,
            takesScreenshot: false,
            "phantomjs.binary.path": "phantomjs.binary"
        }).build();
}

function ChromeWorld() { // Requires 'chrome' on PATH
    require('chromedriver');
    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities({
            browserName: 'chrome',
            javascriptEnabled: true,
            acceptSslCerts: true,
            takesScreenshot: false
        }).build();
}

function HeadlessChromeWorld() { // Requires 'chrome' on PATH
    require('chromedriver');
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
    'phantomjs' : PhantomJSWorld,
    'chrome' : ChromeWorld,
    'headless-chrome': HeadlessChromeWorld,
}
var configuredWorld = worldMap[process.env['IL2_TESTING_BROWSER']];
var worldConstructor = configuredWorld ? configuredWorld : ChromeWorld;

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(worldConstructor);
})