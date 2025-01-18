const os = require('os');
const log = console.log;
//console.log(os.platform());

//console.log(
process.env.NODE_ENV === 'production'
? 'http://mad9124.com'
: 'localhost:3000'
//);

const path = require('path');
log(path.join(__dirname, '../test.json'));