require('dotenv').config();
const http = require('http');


const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = process.env.PORT || 8010;
const server = http.createServer(app);

server.listen(port, () => console.log("Server is running.."));

//Auth0 dodaci start
const { auth } = require('express-openid-connect');
app.use(
    auth({
        authRequired: false,
        idpLogout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        clientSecret: process.env.CLIENT_SECRET,
        authorizationParams: {
            response_type: 'code',
            //scope: "openid profile email"   
        },
    })
);

app.get('/', async (req, res) => {
    res.redirect('http://localhost:8080/');
});
app.get('/api/getuser', async (req, res) => {
    let username = '';
    if (req.oidc.isAuthenticated()) {
        username = await req.oidc.user.nickname;
        res.send(username);
        return
    }
    else res.send(false);
});
//Auth0 end


const requests = require('./requests');
app.use('/api', requests);

app.get('/*', (req, res) => {
    res.status(404).send({ status: "Not found", message: "The page you're looking for doesn't exist" });
});


//Handle production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}