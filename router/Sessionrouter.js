const express=require("express");
const Sessionrouter=express.Router();

Sessionrouter.get("/sessionCreate",(request,response)=>{
    //세션생성
    request.session.user={
        "id":"smart",
        "pw":"123",
        "nick":"smart"
    };

    response.end()
})
Sessionrouter.get("/sessionSelect",(request,response)=>{
    //세션 검색
    console.log("세션에 있는 유저값: "+request.session.user);
})

Sessionrouter.get("/sessionDelete",(request,response)=>{
    //세션 삭제
    delete request.session.user;
    response.end();
})

module.exports = Sessionrouter