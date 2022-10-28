const { request, response } = require("express");
const express=require("express");
const Messagerouter=express.Router();

const conn=require("../config/DBConfig.js");

//1.app.js 미들웨어 등록
//2.DB정보등록(conn)

Messagerouter.get("/Message",(request,response)=>{
    //현재 로그인한 사람에게 온 메세지를 검색
    let sql="select * from web_message where rec=?";
    if(request.session.user){
        conn.query(sql,[request.session.user.email],(err,row)=>{
            console.log(row);
            response.render("message",{
                user:request.session.user,
                row_name:row
            });
        })
    }else{
        response.render("message",{
            user:request.session.user
        });
    }
    
})

Messagerouter.get("/MessageLogout",(request,response)=>{
    delete request.session.user;
    response.redirect("http://127.0.0.1:3001/Message");
})

Messagerouter.post("/MessageJoin",(request,response)=>{

    let email = request.body.email;
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address;

    let sql = "insert into web_member values(?, ?, ?, ?, now())";

    conn.query(sql, [email, pw, tel, address],(err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");
        }else{
            console.log("입력실패 : " + err);
        }
    })
})

//로그인 기능을 구현하시오.
//1.message.ejs에 form 수정
//2.MessageLogin라우터를 구현
//3.로그인 성공 후 Message페이지로 이동

Messagerouter.post("/MessageLogin", (request, response) => {

    let email = request.body.email;
    let pw = request.body.pw;

    let sql = "select * from web_member where email = ? and pw = ?";

    conn.query(sql, [email, pw], (err, row) => {

        if(err){
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            //로그인성공
            //LoginS.html -> ejs로 변환하시오.
            //1. LoginS.html을 ejs파일로 변경하여 views 이동
            //2. Login라우터에서 LoginS.ejs파일을 랜더링
            //3. 랜더링할 때 로그인에 성공한 id값을 전송
            //4. ejs파일에서 로그인에 성공한 id값을 출력
            console.log(row);

            request.session.user={
                "email":row[0].email,
                "tel":row[0].tel,
                "address":row[0].address
            }

            console.log("session영역에 id 저장 성공" +request.session.email);

            response.redirect("http://127.0.0.1:3001/Message");

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

Messagerouter.get("/MessageUpdate",(request,response)=>{
    //update.ejs파일을 렌더링
    response.render("update",{
        user:request.session.user
    })
    
})

Messagerouter.post("/MessageUpdateExe",(request,response)=>{

    let email = request.session.user.email;
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address;

    //사용자가 입력한 pw,tel,adress로 이메일의 정보를 수정하시오.
    let sql = "update web_member set pw=?,tel=?,address=? where email=?";

    conn.query(sql, [pw, tel, address, email],(err, row) => {
        if(!err){
            console.log("수정성공 : " + row);
            request.session.user={
                "email":email,
                "tel":tel,
                "address":address
            }
            response.redirect("http://127.0.0.1:3001/Message");
        }else{
            console.log("수정실패 : " + err);
        }
    })
})

Messagerouter.get("/MessageMemberSelect", (request, response) => {

    let sql = "select * from web_member";

    conn.query(sql, (err, row) => {

        if(err){
            console.log("검색실패 : " + err);
        }else if(row.length > 0){
            //로그인성공
            //LoginS.html -> ejs로 변환하시오.
            //1. LoginS.html을 ejs파일로 변경하여 views 이동
            //2. Login라우터에서 LoginS.ejs파일을 랜더링
            //3. 랜더링할 때 로그인에 성공한 id값을 전송
            //4. ejs파일에서 로그인에 성공한 id값을 출력
            console.log(row);

            response.render("selectMember", {
                row_name : row
            })

        }else if(row.length == 0){
            //검색된 데이터가 없을떄
            response.redirect("http://127.0.0.1:3001/Message");
        }
        
    })




    //if(id == "smart" && pw == "123"){
    //    response.redirect("http://127.0.0.1:5500/public/ex05LoginS.html");
    //}else{
    //    response.redirect("http://127.0.0.1:5500/public/ex05LoginF.html");
    //}

});

Messagerouter.get("/MessageDelete",(request,response)=>{

    let email = request.query.email;

    let sql = "delete from web_member where email=?";

    conn.query(sql, [email],(err, row) => {
        if(!err){
            console.log("삭제성공 : " + row);
            response.redirect("http://127.0.0.1:3001/MessageMemberSelect");
        }else{
            console.log("삭제실패 : " + err);
        }
    })
})

Messagerouter.post("/MessageSend",(request,response)=>{

    let send = request.body.send;
    let rec = request.body.rec;
    let content = request.body.content;
    

    let sql = "insert into web_message(send,rec,content,send_date) values(?,?,?,now())";

    conn.query(sql, [send,rec,content],(err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3001/Message");
        }else{
            console.log("입력실패 : " + err);
        }
    })
})

module.exports=Messagerouter;