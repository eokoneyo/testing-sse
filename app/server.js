const express = require('express');
const createRoutes = require('app/routes');
const appConfig = require('app/config');
const path = require('path');

const app = express();

// static files
app.use(express.static(path.join('app/static')));

// server routes
createRoutes(app);

app.listen(appConfig.port, () => {
    console.log(`magic is happening on port ${appConfig.port}`);
});
