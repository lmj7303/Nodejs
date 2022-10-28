const { request, response } = require("express");
const express = require("express");
const router = express.Router(); // express갖고있는 기능중에 router기능 사용


router.get("/plus", (request, response) => { // /plus라우터 기능정의 및 등록

    console.log("/plus 라우터호출")
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    response.write("응답성공<br>");
    response.write("결과값 : " + (parseInt(request.query.num1)+parseInt(request.query.num2)));
    response.write("</body>");
    response.write("</html>");
    response.end();

});

router.get("/cal", (request, response) => { // /cal라우터 기능정의 및 등록
    //1. 사용자 입력한 값을 가져오기.
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;

    console.log(num1 + cal + num2);

    //사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하시오.
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    if(cal == "+"){
        response.write("결과값 : " + (parseInt(num1)+parseInt(num2)))
    }else if(cal == "-"){
        response.write("결과값 : " + (parseInt(num1)-parseInt(num2)))
    }else if(cal == "*"){
        response.write("결과값 : " + (parseInt(num1)*parseInt(num2)))
    }

    response.write("</body>");
    response.write("</html>");
    response.end();

})

router.post("/Grade", (request, response) => {

    let avg = (parseInt(request.body.java) + parseInt(request.body.web)
    + parseInt(request.body.android) + parseInt(request.body.iot)) / 4

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");

    response.write("이름 : " + request.body.name + "<br>");
    response.write("자바 : " + request.body.java + "<br>");
    response.write("웹 : " + request.body.web + "<br>");
    response.write("IoT : " + request.body.iot + "<br>");
    response.write("안드로이드 : " + request.body.android + "<br>");
    response.write("AVG : " + avg + "<br>");

    if(avg >= 95){
        response.write("학점 : A+");
    }else if(avg >= 90){
        response.write("학점 : A");
    }else if(avg >= 85){
        response.write("학점 : B+");
    }

    response.write("</body>");
    response.write("</html>");
    response.end();

});

router.post("/Join", (request, response) => {

    let id = request.body.id;
    let pw = request.body.pw;
    let name = request.body.name;
    let gender = request.body.gender;
    let hobby = request.body.hobby;
    let birth = request.body.birth;
    let color = request.body.color;
    let email = request.body.email;
    let tel = request.body.tel;

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");

    response.write("ID : " + id + "<br>");
    response.write("PW : " + pw + "<br>");
    response.write("GENDER : " + gender + "<br>");
    response.write("HOBBY : " + hobby + "<br>");
    response.write("BIRTH : " + birth + "<br>");
    response.write("ID : " + id + "<br>");
    response.write("ID : " + id + "<br>");

    response.write("</body>");
    response.write("</html>");
    response.end();

});




module.exports = router;

