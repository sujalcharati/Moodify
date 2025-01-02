"use client"
import axios from "axios";
import { useState, useEffect } from "react";



export const Openweather = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeather = async () => {
    if (city) {
      console.log("access to openweather...");
      const api_key = "23dc27e2cd36408ca75130328240708";
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`
      );
      setWeatherData(res.data);
      console.log(res.data);
    }
  };

  useEffect(() => {
    // fetchWeather();
  }, []);

  return (
    <div>
      <input
        value={city}
        placeholder="Enter your place"
        onChange={(e) => {
          setCity(e.target.value);
          if (e.target.value === "") {
            setWeatherData(null);
          }
        }}
        className="p-2 border border-black-300 rounded mr-4"
      />
      <button
        onClick={  fetchWeather }
        className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Submit
      </button>
      {weatherData && weatherData.current && (
        <div>
          <h3>Weather Data:</h3>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <h3 className="text-2xl font-bold">Feels like: {weatherData.current.feelslike_c}°C</h3>
          <h3 className="text-2xl font-bold">Wind: {weatherData.current.wind_kph} Km/hr</h3>
        </div>
      )}
    </div>
  );
};