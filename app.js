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


