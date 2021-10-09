const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/weathercode')

//Setting uo the paths of the required directories
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const app=express()
const port= process.env.PORT || 3000

//Setting the express congif and handlebars, see notes in the course
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
console.log(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Anshuman",
        age:20
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Anshuman",
        age:20
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"@anshuman.sharma4801@gmail.com"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provise a valid address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,{temp,feelsLike,weather_des,humidity})=>{
            if(error){
                return res.send({
                    error
                })
            }
            //console.log(res.body.current)
            res.send({
                temp,
                feelsLike,
                location: place_name,
                weather_des,
                humidity
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provise a search item"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('helpError',{
        title: 'Help article Not found',
    })
})

app.get('*',(req,res)=>{
    res.render('genericError',{
        title:'404 Page'
    })
})

app.listen(port,()=>{
    console.log("Server serving on port"+port)
})