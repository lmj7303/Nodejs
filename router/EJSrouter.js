const express = require("express");
const EJSrouter = express.Router();

EJSrouter.get("/ejs01", (request, response) => {

    console.log("/ejs01 라우터실행")

    response.render("ex01EJS", {
        name1 : "value1",
        name2 : "value2"
    });

})



module.exports = EJSrouter;
