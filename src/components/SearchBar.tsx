import { useState } from "react";
import { useWeatherStore } from "../store/weatherStore";

export default function SearchBar() {
    const [city, setcity] = useState("")
    const { fetchWeather } = useWeatherStore();

    const handleSearch = async () => {
        if (!city.trim()) return
        await fetchWeather(city)
        setcity("");
    }
    return (
        <div className="flex gap-3">
            <input 
            type="text" 
            placeholder="도시 이름을 검색하세요!"
            onChange={(e)=> setcity(e.target.value)}
            onKeyDown={(e)=>{if (e.key ==="Enter") handleSearch()}}
            className="flex-1 bg-gray-800 text-white rounded-xl px-5 py-3 outline-none border border-gray-700"
            ></input>
            <button 
            type="button" 
            onClick={handleSearch}
            className="bg-sky-500 text-white rounded-xl px-6 py-3 font-semibold hover:bg-sky-400"
            >검색</button>
        </div>
    )


}
