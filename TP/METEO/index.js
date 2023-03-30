const express=require('express')//backend server(npm install express to install)
const https=require('https');//protocole reseau
const bodyparser=require('body-parser')// module in node to get the attribute of the body of the request
const app=express()//instanc of express
app.use(bodyparser.urlencoded({extended:true}));//use body parser t get the attributsn easily
app.get('/',(req,res)=>{//to redirect to form page
res.sendFile(__dirname+"/index.html");
})
app.post('/',(req,res)=>{//if the request is of type post
const city=req.body.cityname;//get the attributet city name of the requset's body
const cleapi='a6bccd7ab6834c99394b16ef34bdc41f'//openweathermap apiKey
const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+cleapi+'&unit=metric';
https.get(url,(response=>{//recuper the response from the url which will be JSON
response.on('data',(data)=>{
const weatherData=JSON.parse(data);//Parse the data 
const temp=weatherData.main.temp; //get the value of the temperature
const t=temp-273.15;
//run(city,t.toString());
res.write("<h1 style='font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem;'>The temerature in "+city+" is "+t+" degree °C</h1>")
res.write("<div style='text-align: center;'>")
res.write(" <a href='/' style='font-size: 1.1rem; color: #0077cc; text-decoration: none; border: 2px solid #0077cc; padding: 0.5rem 1rem; border-radius: 5px; background-color: #fff;'>Retour</a>")
res.write("</div>") 


})
}))
})
app.listen(4000,()=>{//Listening for request
    console.log("Server is running....");
})



async function run(v,t) {
    const gg = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ville: v,
            tmp: t
        })
    })
    
  }
  