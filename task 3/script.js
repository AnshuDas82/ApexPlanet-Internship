const apikey="a4b00060db8c2bff1673658047376713";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
async function weather(city){
    let response = await fetch(apiurl+city+`&appid=${apikey}`);
    let data= await response.json();
    console.log("data",data);
    document.querySelector(".weather .city h2").innerHTML=data.name;
    document.querySelector(".weather .info h2").innerHTML=Math.round(data.main.temp )+" °C";
    document.querySelector(".weather .feels h3").innerHTML=Math.round(data.main.feels_like )+" °C";
    document.querySelector(".humidity .right h2").innerHTML=data.main.humidity +" %" ;
    document.querySelector(".windspeed .right2 h2").innerHTML=Math.round(data.wind.speed )+" km/h";
    document.querySelector(".weather .info h1").innerHTML=data.weather[0].main;

    if(data.weather[0].main=="Clear"){
        document.querySelector(".weather .info .icon").src ="sunny.png"
    }
    else if(data.weather[0].main=="Clouds"){
        document.querySelector(".weather .info .icon").src ="cloudy.png"
    }
    else if(data.weather[0].main=="Rain"){
        document.querySelector(".weather .info .icon").src ="rain.png"
    }
    else if(data.weather[0].main=="Mist"){
        document.querySelector(".weather .info .icon").src ="mist.png"
    }
    else if(data.weather[0].main=="Drizzle"){
        document.querySelector(".weather .info .icon").src ="drizzle.png"
    }
    document.querySelector(".bottom").style.display="block";
}
searchbtn.addEventListener("click",()=>{
    weather(searchbox.value);
})


