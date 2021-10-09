const request= require('request')

const weathercode=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=381482268a15666fa9c2868930eb0e69&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)

    request({url, json: true}, (error, {body})=>{//{response.body.current.temperature:temp, response.body.current.feelslike:feelsLike}
        if(error){
            callback("Unable to connect to server",undefined)
        }
        else if(body.error){
            callback("Please enter a valid location",undefined)
        }
        else{
            callback(undefined,{
                temp:body.current.temperature,
                feelsLike:body.current.feelslike
            })
        }
    })
}

module.exports= weathercode