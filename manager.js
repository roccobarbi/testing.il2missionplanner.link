

exports.run = function(event, context) {

    // Get the list of features / scenarios (TBD - we'll say 'tests' from now on)

    // Execute a lambda function for each test, passing it as a parameter to the child function



    /*
    // Add current working directory and cucumber bin to the PATH
    var lambdaTaskRoot = process.env['LAMBDA_TASK_ROOT'];
    var cwd = process.cwd();
    if (lambdaTaskRoot) {
        cwd = lambdaTaskRoot;
    }
    process.env['PATH'] = process.env['PATH'] + ':' + cwd + ':' + cwd + '/node_modules/cucumber/bin/';

    // Launch the cucumber child process
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
    });
    */



}