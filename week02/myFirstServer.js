'use strict';

const http = require('http');



const server = http.createServer((request, response) => {
    if (request.url === '/feed') {
        response.write('this is your news feed');
    } else if (request.url === '/username') {
        response.write('tim');
     } else if (request.url === '/api') {
            response.write('Hello world from Node.js');
     } else {
        response.write('Hello world from Node.js');
    }
    response.end();
});

server.listen(4000, (err) => {
   if (err) {
       console.log('Error:', err);
   }else {
       console.log('Server is listening on port 4000');
   }
});