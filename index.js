const express = require("express")

const fs = require("fs")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080
app.get("/", (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        res.end("hello i am here")
    })
})
///create 
app.post("/user/create", (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        const parsed = JSON.parse(data)
        id = Math.floor(Math.random()*10)
        const Nuser = {id:id,...req.body}
        parsed.user = [...parsed.user, Nuser]
    fs.writeFile("./db.json", JSON.stringify(parsed), (err) => {
        res.status(201).send(data)
        console.log( {
            status:"user created",
            id : id
        })
    })
    })
})

app.get("/user/create", (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        res.end(data)
    })
})

//login
function validation1(req,res,next) {
    const {username,password} = req.body

    if(!username)
    {
        res.status(400).send("please provide username ")
    }
    if(!password){
        res.status(400).send("please provide password")
    }
    next()
}


app.post("/user/login", validation1,validation, (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        const parsed = JSON.parse(data)
        parsed.user = [...parsed.user, req.body]
    fs.writeFile("./db.json", JSON.stringify(parsed), (err) => {
   
        res.end(data)

    })
    })
})

app.get("/user/login", (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        res.end(data)
    })
})


//validation for login

function validation (req,res,next) {
    if(req.url==="/user/login"){
        fs.readFile("./db.json",{encoding:"utf-8"}, (err,data) => {
            const parsed = JSON.parse(data)
            const user = parsed.user.filter((user) => {
                user.name=req.body.username && user.password==require.body.password
            })


            console.log(user)

            if(user.length!==0)
            {
                next()
            }
            else{
                res.status(401).send({status:"invalid credentials"})
            }
        })
    }
    next()
}

///party

app.get("/user/:party",validation, (req,res) => {
    const {party} =  req.params

    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
       
        const parsed = JSON.parse(data)

        parsed.user = parsed.user.filter(el => el.party==party)
        parsed.user = [...parsed.user,req.body]

        res.end(JSON.stringify(parsed))
    })
})


//voter
app.get("/votes/voters", (req,res) => {
    
    const {role} =  req.params


    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
       
        const parsed = JSON.parse(data)

        parsed.user = parsed.user.filter((user) => user.role === "voter")
        res.end(JSON.stringify(parsed))
        

    })
})


//for test

app.get("/db", (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        res.end(data)
    })
})


app.post("/db", (req,res) => {
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data) => {
        const parsed = JSON.parse(data)
        parsed.user = [...parsed.user, req.body]
    fs.writeFile("./db.json", JSON.stringify(parsed), (err) => {
   
        res.end(data)

    })
    })
})


// app.listen(8080, () => {
//     console.log("server started in localhost:8080")
// })


app.listen(PORT)