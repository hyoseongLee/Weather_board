import axios from "axios";
import type { WeatherData, HourlyData, ForecastItem } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 현재 날씨 가져오기
export const fetchCurrentWeather =async (city:string): Promise<WeatherData> =>{
    const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
            q : city,
            appid : API_KEY,
            units : "metric", // 섭씨온도
            lang : "kr",
        },
    });

    const data = response.data;
    return {
        city: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
    };
};


// 실시간 날씨 가져오기 (무료)
export const fetchHourlyData = async (city:string) :Promise<HourlyData[]> => {
    const response = await axios.get(`${BASE_URL}/forecast`,{
         params: {
            q: city,
            appid: API_KEY,
            units: "metric",
            lang: "kr",
            cnt: 8,

        },
    });
    return response.data.list.map((item: ForecastItem)=> ({
        time : item.dt,
        temp : Math.round(item.main.temp),
        icon : item.weather[0].icon,
        description : item.weather[0].description,
    }))
}