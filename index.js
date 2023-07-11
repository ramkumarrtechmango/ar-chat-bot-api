const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chatRouter');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const globalErrorHandler = require('./controller/errorController');

// Start express app
const app = express();

app.enable('trust proxy');

// Set security HTTP headers
app.use(helmet());

// GLOBAL MIDDLEWARES
app.use(cors());


// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req);
    next();
});

// Limit requests from same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 100,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Routes
app.use('/api/v1/chat', chatRouter);

app.use(globalErrorHandler);

module.exports = app;