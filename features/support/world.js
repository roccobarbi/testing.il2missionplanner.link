var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

function CustomWorld() {
    this.driver = new seleniumWebdriver.Builder()
        .withCapabilities({
            browserName: 'phantomjs',
            javascriptEnabled: true,
            acceptSslCerts: true,
            takesScreenshot: false,
            "phantomjs.binary.path": "phantomjs.binary"
        }).build();
}

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(CustomWorld)
})