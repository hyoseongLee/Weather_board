import { create } from "zustand";
import type { WeatherStore } from "../types/weather";
import { fetchHourlyData,fetchCurrentWeather } from "../api/weatherApi";


export const useWeatherStore = create<WeatherStore>((set) => ({
//초기상태
weather : null,
hourly:[],
favorites: [],
isLoading: false,
error: null,

// 날씨가져오기
fetchWeather :async (city: string) => {
set({isLoading:true,error:null})
try {
    const weather = await fetchCurrentWeather(city);
    const hourly = await fetchHourlyData(city);
    set({weather, hourly, isLoading: false});
} catch (e) {
    const message = e instanceof Error ? e.message : "날씨를 가져오지 못했어요 😢"
    set({error: message,isLoading: false});
}
},
// 즐겨찾기 추가
addFavorites: (city:string) => {
    set((state) => ({
        favorites: [...state.favorites,city],
    }));
},
// 즐겨찾기 삭제
removeFavorites: (city:string) => {
    set((state)=> ({
        favorites: state.favorites.filter((fav)=> fav !== city)
    }));
},
}));