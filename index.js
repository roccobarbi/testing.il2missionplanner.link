var childProcess = require('child_process');

exports.handler = function(event, context) {

    // Add current working directory and cucumber bin to the PATH
    var lambdaTaskRoot = process.env['LAMBDA_TASK_ROOT'];
    var cwd = process.cwd();
    if (lambdaTaskRoot) {
        cwd = lambdaTaskRoot;
    }
    process.env['PATH'] = process.env['PATH'] + ':' + cwd + ':' + cwd + '/node_modules/cucumber/bin/';

    // Launch the cucumber child process
    // TODO specify on a single feature or scenario to run using parameter passed by manager
    // TODO specify json output with --format=json
    childProcess.execFile('cucumber.js', null, function(error, stdout, stderr) {
        if (error) {
            context.fail(error);
            return;
        }
        if (stderr) {
            context.fail(error);
            return;
        }
        console.log(stdout);
        // TODO write json output to an S3 bucket or something
    });

}