const express = require('express');
const createRoutes = require('app/routes');
const appConfig = require('app/config');
const path = require('path');

const app = express();

// Add CORS support for development
if (process.env.NODE_ENV === 'development' || typeof process.env.NODE_ENV === 'undefined') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', req.get('Origin'));
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}

// static files
app.use(express.static(path.join('app/static')));

// server routes
createRoutes(app);

app.listen(appConfig.port, () => {
    console.log(`magic is happening on port ${appConfig.port}`);
});
