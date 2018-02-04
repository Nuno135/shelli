var Execi = require('../execi');
var shell = new Execi();
var get = require('is-reachable');
var spawn = require('child_process').spawn;

Execi.prototype.wget = function(url) {
    if (url && typeof url !== 'string')
        throw new TypeError('Invalid String.');

    if (!url) throw new Error('Invalid argument.');
    var err;

    get(url).then(reachable => {
        if (reachable === false) {
            err = 'err: website is down or does not exist.';
            console.log(err)
        } else {
            var ls = spawn('wget', [url]);

            ls.stderr.on('data', function(data) {
                console.log(data.toString());
            });
        }
    })
}