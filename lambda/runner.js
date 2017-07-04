var childProcess = require('child_process');
var AWS = require('aws-sdk');
var fs = require('fs');

exports.run = function(event, context) {
    console.log('runner.run start');
    getFeaturesFromS3(event, context);
}

function getFeaturesFromS3(event, context) {
    var s3params = {
        Bucket: 'features.il2missionplanner.com',
        Key: 'features.zip'
    }
    var S3 = new AWS.S3();
    S3.makeUnauthenticatedRequest('getObject', s3params, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
            context.buffer = data.Body;
            buildWorkspace(event, context);
        }
    });
}

function buildWorkspace(event, context) {
    childProcess.execFileSync('rm', ['-rf', '/tmp/workspace/']);
    fs.mkdirSync('/tmp/workspace');
    childProcess.execFileSync('cp', ['-r', 'node_modules/', 'phantomjs.binary', '/tmp/workspace/']);
    process.chdir('/tmp/workspace');

    fs.writeFileSync('/tmp/features.zip', context.buffer);
    childProcess.execFileSync('unzip', ['/tmp/features.zip', '-d', './features']);

    var cwd = process.cwd();
    process.env['PATH'] = process.env['PATH'] + ':' + cwd + ':' + cwd + '/node_modules/cucumber/bin/';

    runTests(event, context);
}

function runTests(event, context) {
    // TODO specify on a single feature or scenario to run using parameter passed by manager
    childProcess.execFile('cucumber.js', ['--format', 'json'], function(error, stdout, stderr) {
        if (error) { context.fail(error); return; }
        if (stderr) { context.fail(error); return; }
        console.log(stdout);
        // TODO write json output to an S3 bucket
    });
}