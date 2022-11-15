require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 8010;
const server = http.createServer(app);

server.listen(port, () => console.log("Server is running.."));


const requests = require('./requests');
app.use('/api', requests);


//Handle production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}