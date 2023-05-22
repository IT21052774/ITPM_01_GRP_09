import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import userRoutes from './routes/user';
import fertilizerRoutes from './routes/fertilzer';
import orderRoutes from './routes/order';
import loanRoutes from './routes/loan';

import harvestRoutes from './routes/harvest';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

const NAMESPACE = 'Server';
const router = express();

/** set application assests folder*/
router.use("/assets", express.static(__dirname + "/assets"))
router.use(fileUpload());
/** Connect to Mongo */
mongoose
    .connect("mongodb+srv://root:071656Ad@cluster0.zekgg7g.mongodb.net/test")
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/api/auth-controller', userRoutes);
router.use('/api/harvest-controller', harvestRoutes);
router.use('/api/fertilzer-controller', fertilizerRoutes);
router.use('/api/order-controller', fertilizerRoutes);
router.use('/api/loan-controller', loanRoutes);



router.get("/hello-world", (req, res) => {
    return res.status(200).json({ "hello": "world" })
})


/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port || 1337, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
