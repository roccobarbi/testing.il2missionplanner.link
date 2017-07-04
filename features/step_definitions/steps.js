var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {

    When('I navigate to il2missionplanner.com', function () {
        return this.driver.get('http://il2missionplanner.com');
    });

    Then('I should see the map', function () {
        var condition = seleniumWebdriver.until.elementLocated({id: "map"});
        return this.driver.wait(condition, 5000);
    });

});