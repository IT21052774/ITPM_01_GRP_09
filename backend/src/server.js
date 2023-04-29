const http = require("http")
const mongoose = require("mongoose")
const express = require("express")

//asdasda
const activityController = require("./controllers/activity_controller")
const customerController = require("./controllers/customer_controller")
const employeeController = require("./controllers/employee_controller")
const foodController = require("./controllers/food_controller")
const orderController = require("./controllers/order_controller")
const roomController = require("./controllers/room_controller")
const safariController= require("./controllers/safari_controller")

const router = express()
const chalk = require('chalk');

log = (args) => this.info(args);
info = (args) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);
warning = (args) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
error = (args) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);

const db_url = "mongodb+srv://kavindip09:071656Ad@cluster0.ntaz7wu.mongodb.net/test"
const port = 8080

mongoose.connect(db_url)
    .then(() => {
        info('Mongo connected successfully.');
        StartServer();
    })
    .catch(err => {
        //    console.log(err)
        error(err)
    })


const StartServer = () => {
    
    router.use((req, res, next) => {
        /** Log the request */
        info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next(); /**allow to pass through the middleware to next tasks */
    })

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

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

    /** Routes */
    router.use("/customer-controller",customerController)
    router.use("/employee-manager",employeeController)
    router.use("/food-controller",foodController)
    router.use("/order-controller",orderController)
    router.use("/safari-controller",safariController)
    router.use("/activity-controller",activityController  )
    router.use("/room-controller",roomController)
  
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(port, () => info(`Server is running on port ${port}`));
} 

