let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header ("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    )
    res.header (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        )
next();
})
var port=process.env.PORT||2410
app.listen(port,() =>console. log(`Node App listening on port ${port}!`))
let {cars,carMaster}=require("./carData.js")


app.get("/cars",function(req,res){
    let arr=cars
    let {minPrice=0,maxPrice=0,type="",fuel="",sortBy=""}=req.query
    if(minPrice){
        arr=arr.filter((a)=>a.price>=minPrice)
    }
    if(maxPrice){
        arr=arr.filter((a)=>a.price<=maxPrice)
    }
    if(fuel){
        arr=arr.filter((a)=>carMaster.find((b)=>b.model==a.model).fuel==fuel)
    }
    if(type){
        arr=arr.filter((a)=>carMaster.find((b)=>b.model==a.model).type==type)
    }
    if(sortBy=="kms"){
        arr=arr.sort((a,b)=>a.kms-b.kms)
    }
    if(sortBy=="year"){
        console.log("in")
        arr=arr.sort((a,b)=>a.year-b.year)
    }
    if(sortBy=="price"){
        arr=arr.sort((a,b)=>a.price-b.price)
    }
    res.send(arr)
})
app.get("/cars/:id",function(req,res){
    let id=req.params.id
    res.send(cars.find((a)=>a.id==id))
})
app.post("/cars",function(req,res){
    let body=req.body
    cars.push(body)
    res.send(body)
})
app.put("/cars/:id",function(req,res){
    let body=req.body
    let id=req.params.id
    let index=cars.findIndex((a)=>a.id==id)
    cars[index]=body
    res.send(body)
})
app.delete("/cars/:id",function(req,res){
    let id=req.params.id
    let index=cars.findIndex((a)=>a.id==id)
    let car=cars.splice(index,1)
    res.send(car)
})
app.get("/carmaster",function(req,res){
    res.send(carMaster)
})