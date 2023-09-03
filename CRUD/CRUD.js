//引用mysql依赖
const mysql = require("mysql");
//引用express依赖
const express = require("express");
//引用body-parser 解析post传参
const bodyParser = require("body-parser");
//express实例化
const app = express();
//引用 cors
const cors = require("cors");
const { json } = require("body-parser");
//关闭Form表单传值
app.use(bodyParser.urlencoded({ extended: false }));
//使用Json传值
app.use(bodyParser.json());
//使用cors 解决跨域问题
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //是用自己的数据库账号
  password: "", //使用自己的数据库密码
  database: "test",
});
// 建立数据库连接
connection.connect();

/**
 * select
 */
app.get("/website", (req, res) => {
  let sql = "select * from websites";
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    // return results;
    return res.json(results);
  });
});

/**
 * delete
 */
app.get("/website/delete/:id", (req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  let delSql = `DELETE FROM websites where id= ${parseInt(req.params.id)}`;
  console.log(delSql);
  connection.query(delSql, function (error, results) {
    if (error) throw error;
    console.log(results);
    // return results;
    return res.json(results);
  });
});

/**
 * insert
 */
app.get("/website/insert", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  console.log(req.query.id);
  let insertSql = `insert into websites VALUES(null,?,?,?,?)`;
  console.log(insertSql);
  let data = [req.query.name,req.query.url,req.query.alexa,req.query.country]
  connection.query(insertSql, data,function (error, results) {
    if (error) throw error;
    console.log(results);
    // return results;
    return res.json(results);
  });
});

/**
 * update
 */
 app.get("/website/update", (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.query.id);
    let updateSql = `update websites set name = ?, url = ?, alexa = ?, country = ? where id = ?`;
    console.log(updateSql);
    let data = [req.query.name,req.query.url,req.query.alexa,req.query.country,req.query.id]
    connection.query(updateSql, data,function (error, results) {
      if (error) throw error;
      console.log(results);
      // return results;
      return res.json(results);
    });
  });
app.listen(3000, () => {
  console.log("running...");
});
