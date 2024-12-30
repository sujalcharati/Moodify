"use client"
import axios from "axios";
import { useState } from "react";



export const Openweather = async () =>{
    const [city , setCity]= useState<any>(null);
    const [weatherData, setWeatherData] = useState<any>(null);
    
    console.log('acess to openweather...');
          const api_key = "";
          const res = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`
          );
          setWeatherData(res);
          console.log(res.data); 
          return(
            <div>
                  <input
          value={ city }
          placeholder="Enter your place"
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value === '') {
                setWeatherData(null);
            }
          }}
          className="p-2 border border-black-300 rounded mr-4"
        />
        <button onClick={Openweather} className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Submit
        </button>
        {weatherData && (
          <div>
            <h3>Weather Data:</h3>
            <p>Temperature: {weatherData.data.current.temp_c}°C</p>
            <p>Condition: {weatherData.data.current.condition.text}</p>
          </div>
        )}
            </div>
          )
  }