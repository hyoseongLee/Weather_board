import { useNavigate } from "react-router-dom"
import useWeatherStore from "../store/weatherStore"

export default function FavoriteList() {
    const { favorites, fetchWeather, removeFavorites } = useWeatherStore()
    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-800 font-semibold">⭐ 즐겨찾기</h3>
            </div>

            {favorites.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                    즐겨찾기한 도시가 없어요
                </p>
            )}

            <div className="flex flex-col gap-2">
                {favorites.map((city) => (
                    <div
                        key={city}
                        className="flex justify-between items-center bg-gray-50 hover:bg-sky-50 rounded-xl px-4 py-3"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                fetchWeather(city)
                                navigate("/")
                            }
                            }
                            className="text-gray-700 hover:text-sky-500 cursor-pointer"
                        >
                            📍 {city}
                        </button>
                        <button
                            type="button"
                            onClick={() => removeFavorites(city)}
                            className="text-gray-400 hover:text-red-400 text-sm cursor-pointer"
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}