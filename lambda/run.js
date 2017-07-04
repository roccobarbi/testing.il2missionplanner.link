var runner = require('./runner');

var mockContext = {
    fail: function(thing) {
        console.log(thing);
        process.exit();
    }
}

runner.run(null, mockContext);