const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./routes/routes');

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/user", userRoute);

// Middleware untuk menangani rute yang tidak ditemukan
app.use((req, res, next) => {
    const err = new Error(`${req.url} not found on this server`);
    err.status = 404;
    next(err);
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({error: err.message});
});

module.exports = app;
