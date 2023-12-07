const express= require('express');

const app = express();
const dotenv= require("dotenv");
const connect = require('./database/connection');

const cors= require('cors');
const managerRoutes = require('./routes/manager');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const transactionRouter = require('./routes/transaction');
const aggregateRouter = require('./routes/aggregations');
const cartRouter = require('./routes/cart');
const tillOperatorRoute = require('./routes/tilloperator');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');

const tillRouter = require('./routes/till');
const salesRouter = require('./routes/sales');
dotenv.config();


app.use(cors());
app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log(`app running on port ${process.env.PORT}`);
})

 connect(process.env.MONGODB_URI);
 // Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use("/api/v1/admin/",adminRoutes);

app.use("/api/v1/manager/",managerRoutes);
app.use("/api/v1/customer/",customerRoutes);
app.use("/api/v1/till-operator/",tillOperatorRoute);
app.use("/api/v1/product/",productRouter);
app.use("/api/v1/till/",tillRouter);
app.use("/api/v1/sale/",salesRouter);
app.use("/api/v1/cart/",cartRouter);
app.use("/api/v1/order/",orderRouter);
app.use("/api/v1/transaction/",transactionRouter);
app.use("/api/v1/statistics/",aggregateRouter);


