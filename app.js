const express = require("express"); //설치된 express 사용 선언
const app = express(); // express실행 app변수에 대입

const router = require("./router/router.js");
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const Sessionrouter = require("./router/Sessionrouter.js");
const bodyparser = require("body-parser");
const Messagerouter=require("./router/Messagerouter.js")
let ejs = require("ejs");

const session = require("express-session"); //세션기능
const mysql_session = require("express-mysql-session"); //세션이 저장되는 영역(mysql)

app.set("view engine", "ejs");

let conn = {
    host : "127.0.0.1",
    user : "root",
    password : "na5231ra92",
    port : "3306",
    database : "nodejs_db"
}

let conn_session = new mysql_session(conn);

app.use(session({
    secret : "smart",
    resave : false, //저장
    saveUninitialized : true,//초기화
    store : conn_session
}))//미들웨어로 session기능(저장위치 : mysql) 등록

app.use(express.static("./public"));

app.use(bodyparser.urlencoded({extended:false})); 
// post방식일때 body영역을 분석해주는 미들웨어로 bodyparser등록
app.use(router); // 미들웨어로 router등록
app.use(DBrouter);
app.use(EJSrouter);
app.use(Sessionrouter);
app.use(Messagerouter);
app.listen(3001); //현재 서버파일의 port번호설정