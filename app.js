// external
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var ejs = require("ejs");

// inner
// 路由控制器
var index = require("./routes/index");

// 创建express实例
var app = express();

// 设置视图引擎、视图文件夹和中间件
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// 设置中间件-log
app.use(logger("dev"));
// 设置中间件-解析json
app.use(bodyParser.json());
// 设置中间件-解析url
app.use(bodyParser.urlencoded({ extended: false }));
// 设置中间件-解析cookie
app.use(cookieParser());
// 设置中间件-提供静态文件
app.use(express.static(path.join(__dirname, "public")));

// 设置路由
app.use("/", index);

// 设置错误pre处理，提供了404传递给next
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// 设置错误后处理，在error视图上呈现错误
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 导出
module.exports = app;
