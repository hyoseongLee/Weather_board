import { doc, getDoc, setDoc } from "firebase/firestore"
import { create } from "zustand"
import { fetchCurrentWeather, fetchHourlyData } from "../api/weatherApi"
import { db } from "../firebase"
import type { WeatherStore } from "../types/weather"

const useWeatherStore = create<WeatherStore>((set, get) => ({
    weather: null,
    hourly: [],
    favorites: [],
    isLoading: false,
    isLoginModal: false,
    setLoginModalOpen: (open) => set({ isLoginModal: open }),
    error: null,
    uid: null,
    resetWeather: () => set({ weather: null, hourly: [], error: null }),

    setUid: (uid) => {
        if (uid === null) {
            set({ uid: null, favorites: [] })
        } else {
            set({ uid })
        }
    },

    fetchWeather: async (city: string) => {
        set({ isLoading: true, error: null })
        try {
            const [weather, hourly] = await Promise.all([
                fetchCurrentWeather(city),
                fetchHourlyData(city),
            ])
            set({ weather, hourly, isLoading: false })
        } catch (e) {
            set({ error: e instanceof Error ? e.message : "오류가 발생했어요", isLoading: false })
        }
    },

    loadFavorites: async (uid: string) => {
        const docRef = doc(db, "favorites", uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            set({ favorites: docSnap.data().cities ?? [] })
        }
    },

    addFavorites: async (city: string) => {
        const { uid, favorites } = get()
        if (!uid || favorites.includes(city)) return
        const updated = [...favorites, city]
        set({ favorites: updated })
        await setDoc(doc(db, "favorites", uid), { cities: updated })
    },

    removeFavorites: async (city: string) => {
        const { uid, favorites } = get()
        if (!uid) return
        const updated = favorites.filter((c) => c !== city)
        set({ favorites: updated })
        await setDoc(doc(db, "favorites", uid), { cities: updated })
    },
}))

export default useWeatherStore