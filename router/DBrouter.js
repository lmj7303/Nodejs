const { request, response } = require("express");
const express = require("express");
const DBrouter = express.Router();

const conn = require("../config/DBConfig.js");

DBrouter.post("/Login", (request, response) => {

    let id = request.body.id;
    let pw = request.body.pw;

    let sql = "select * from member where id = ? and pw = ?";

    conn.query(sql, [id, pw], (err, row) => {

        if(err){
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            //로그인성공
            //LoginS.html -> ejs로 변환하시오.
            //1. LoginS.html을 ejs파일로 변경하여 views 이동
            //2. Login라우터에서 LoginS.ejs파일을 랜더링
            //3. 랜더링할 때 로그인에 성공한 id값을 전송
            //4. ejs파일에서 로그인에 성공한 id값을 출력

            request.session.user=id;
            console.log("session영역에 id 저장 성공" +request.session.user);

            response.render("LoginS", {
                id_name : id
            })

        }else if(row.length == 0){
            //로그인실패
            response.redirect("http://127.0.0.1:5500/public/ex05LoginF.html");
        }
        
    })




    //if(id == "smart" && pw == "123"){
    //    response.redirect("http://127.0.0.1:5500/public/ex05LoginS.html");
    //}else{
    //    response.redirect("http://127.0.0.1:5500/public/ex05LoginF.html");
    //}

});

DBrouter.post("/JoinDB", (request, response) => {

    let id = request.body.id;
    let pw = request.body.pw;
    let nick = request.body.nick;

    let sql = "insert into web_member values(?, ?, ?)";

    conn.query(sql, [id, pw, nick],(err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Main");
        }else{
            console.log("입력실패 : " + err);
        }
    })

});

//회원삭제라우터만들기
//1. get방식의 /Delete라우터 생성
//2. 사용자가 입력한 id값 가져오기
//3. id값을 통해 member테이블에 있는 id값 삭제하기
//4. 삭제성공 후 Main.html로 돌아가기

DBrouter.get("/Delete", (request, response) => {

    let id = request.query.id;

    let sql = "delete from member where id = ?";

    conn.query(sql, [id],(err, row) => {

        if(err){

            console.log("삭제실패 : " + err);

        }else if(row.affectedRows > 0){

            console.log("명령에 성공한 수 : " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/Main");           

        }else if(row.affectedRows == 0){

            console.log("삭제된 값이 없습니다.")

        }

    })

})

DBrouter.post("/Update", (request, response) => {

    //사용자가 입력한 id의 pw를 변경하고
    //성공 후 Main.html페이지로 이동하시오.

    let id = request.body.id;
    let select = request.body.select; // pw or nick
    let data = request.body.data; // 변경될 데이터

    let sql = "update member set pw = ? where id = ?";

    if(select == "pw"){
        sql = "";
    }else if(select == "nick"){
        sql = "update member set nick = ? where id = ?";
    }

    conn.query(sql, [data, id],(err, row) => {

        if(err){

            console.log("수정실패 : " + err);

        }else if(row.affectedRows > 0){

            console.log("명령에 성공한 수 : " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/Main");           

        }else if(row.affectedRows == 0){

            console.log("수정된 값이 없습니다.")

        }

    })

})

DBrouter.get("/SelectAll", (request, response) => {

    let sql = "select * from member";

    conn.query(sql, (err, row) => {

        if(err){
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            console.log("검색된 데이터의 수 : " + row.length);

            response.render("SelectAll", {
                row_names : row
            })


        }else if(row.length == 0){
            console.log("검색된 데이터가 없습니다.");
        }

        
    })

});

//회원검색라우터만들기
//1. get방식의 /SelectOne라우터 생성
//2. 사용자가 입력한 id의 정보만 검색해서 브라우저 출력하시오.

DBrouter.get("/SelectOne", (request, response) => {

    let id = request.query.id;

    let sql = "select * from member where id = ?";

    conn.query(sql, [id], (err, row) => {

        if(err){
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            console.log("검색된 데이터의 수 : " + row.length);
            console.log(row);

            response.render("SelectOne", {
                row_name : row
            })

        }else if(row.length == 0){
            console.log("검색된 데이터가 없습니다.");
        }

        
    })

});

DBrouter.get("/SelectDelete", (request, response) => {

    let id = request.query.id;

    console.log(id);

    let sql = "delete from member where id = ?";

    conn.query(sql, [id],(err, row) => {

        if(err){

            console.log("삭제실패 : " + err);

        }else if(row.affectedRows > 0){

            console.log("명령에 성공한 수 : " + row.affectedRows);
            response.redirect("http://127.0.0.1:3001/SelectAll");           

        }else if(row.affectedRows == 0){

            console.log("삭제된 값이 없습니다.")

        }

    })

})
DBrouter.get("/Main",(request,response)=>{

    response.render("Main",{
        id:request.session.user
    })
})

DBrouter.get("/Logout",(request,response)=>{

    delete request.session.user;

    response.render("Main",{
        id:request.session.user
    })
})

module.exports = DBrouter;