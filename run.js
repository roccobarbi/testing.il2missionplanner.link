var handler = require('./index');

var mockContext = {
    fail(thing) {
        console.log(thing);
        process.exit();
    }
}

handler.handler(null, mockContext);