const weatherForm= document.querySelector('form')

const search= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messagetwo= document.querySelector('#message-2')

//messageOne.textContent='From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address= search.value
    messageOne.textContent='Fetching the data!!'
    messagetwo.textContent=''

    
    fetch("/weather?address="+address).then((response)=>{
        response.json().then((data)=>{   

            if(data.error){
  
               messageOne.textContent=data.error
               messagetwo.textContent=''
               return
            }


            messageOne.textContent="Loaction found: "+data.location

            messagetwo.textContent="Forecast: Current temperature is "+data.temp+" degree centigrade. It feels like "+data.feelsLike+" degree centigrade. Weather Description is : "+data.weather_des+" .Humidity is "+data.humidity+"%"

        })

    })
})