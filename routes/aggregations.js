const express= require("express");
const isAuth = require("../middlewares/auth");
const { GetMostOrderedProducts, GetMostSoldProducts, GetDailySales, CumulativeSales, GetWeeklySales, GetMonthlySales, GetYearlySales} = require("../controllers/aggregations");


const aggregateRouter= express.Router();

//aggregateRouter.get("/stats",isAuth,GetProductsStats);
aggregateRouter.get("/most-ordered-goods",isAuth,GetMostOrderedProducts);
aggregateRouter.get("/most-sold-goods",isAuth,GetMostSoldProducts);
aggregateRouter.get("/daily-sales",isAuth,GetDailySales);
aggregateRouter.get("/daily-sales",isAuth,GetWeeklySales);
aggregateRouter.get("/weekly-sales",isAuth,GetWeeklySales);
aggregateRouter.get("/monthly-sales",isAuth,GetMonthlySales);
aggregateRouter.get("/yearly-sales",isAuth,GetYearlySales);
aggregateRouter.get("/cumulative-sales",isAuth,CumulativeSales);


module.exports= aggregateRouter;