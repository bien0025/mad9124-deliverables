const express = require('express'); // import express

const app = express(); // create an express app


app.get('/', (request,response) => {
    response.send('Hello world from express');

});
app.get('/feed', (request,response) => {
    response.send('this is your news feed');
});
app.get('/username', (request,response) => {
    response.send('obed');
});

app.use('*', (res) => {
    response.json('Hello world from express');
});

app.get('/api',(req,res) => {
    res.json({
        data: students,
    });
    
});

app.listen(4000, (err) => {
    if (err) {
        console.log('Error:', err);
        return;
    } 
    console.log('Server is listening on port 4000');
});