import express from "express";

import cors from "cors";

import mysql from "mysql";


const app = express();

app.use(cors());

const connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Mysql#45411admin",
    database:"testing"
  
});



connection.connect((err)=>{
    if (err) {
        console.log("failed to connect mysql" + err.stack);
        return;
    }

    connection.query("USE testing;",(err,data)=>{
    
    })

    console.log("connect to mysql with threadId : " + connection.threadId);
    app.listen(2000,()=> console.log("server working on port 2000"))
})



app.get("/api/getData/:active/:sport",(req,res)=>{
     
    let q = "select * from example";

    let active = req.params.active;
    let sport = req.params.sport; 

    let value = [];

    if(active == "all"){
        if(sport == "all"){
            q = "select * from example"; 
            value = [];
        }
        else{
            q = "select * from example where matchId = ? ";
            value = [sport];
        }
    }
    else{
        if(sport == "all"){
            q = "select * from example where isActive = ? ";
            value = [active];
        }
        else{
            q = "select * from example where isActive = ? and matchId = ? ";
            value = [active,sport];
        }
    }
    
    // q = `select * from example ${active == "all" ? "" : "where isActive = ?"} ${sport == "all" ? sport == "all" ? "" :"and matchId = ?" :""}`



    connection.query(q,value,(err,data)=>{
        if(err) {
            console.log("error in sending data");
             return;     
        }

        res.send(data);
        console.log("data is sended to frontend");
    })

})

// api for testing pagination
app.get("/api/getdata/students",(req,res)=>{
    const { page, pageSize } = req.query;
    const offset = (page - 1) * pageSize;
    let totalRow;

    console.log(offset,pageSize);
    
    let value = [Number(pageSize),Number(offset)];
    
    connection.query("SELECT COUNT(*) as row_count FROM students",(err,data)=>{
        if(err){
            console.log("error in counting the row !!");
            return;
        }
        totalRow = data;
        
    })

    connection.query("SELECT * FROM students LIMIT ? OFFSET ?",value,(err,data)=>{
        if(err){
            console.log("error in sending data!");
            return;
        }
        res.json({data,totalRow});
    })
})




