import { signOut } from "firebase/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import useWeatherStore from "../store/weatherStore"

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { favorites, fetchWeather, weather, addFavorites } = useWeatherStore()

    const handleLogout = async () => {
        await signOut(auth)
    }

    const handleCityClick = (city: string) => {
        fetchWeather(city)
        navigate("/")
    }

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 flex flex-col z-10">

            {/* 로고 */}
            <button
            type="button"
                onClick={() => navigate("/")}
                className="p-6 border-b border-gray-700 cursor-pointer"
            >
                <h1 className="text-cyan-400 font-bold text-2xl tracking-widest">WEATHERLY</h1>
            </button>

            {/* 메뉴 */}
            <div className="p-4 flex flex-col gap-2">
                <p className="text-gray-500 text-xs mb-1">메뉴</p>
                <button
                    type="button"

                    onClick={() => navigate("/")}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer ${location.pathname === "/" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white "}`}
                >
                    🌤 날씨 대시보드
                </button>
                <button
                    type="button"

                    onClick={() => navigate("/favorites")}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer ${location.pathname === "/favorites" ? "text-white bg-gray-700" : "text-gray-400 hover:text-white"}`}
                >
                    ⭐ 즐겨찾기
                </button>
            </div>

       {/* 즐겨찾기 도시 */}
<div className="p-4 flex flex-col gap-2 flex-1">
    <div className="flex justify-between items-center mb-1">
        <p className="text-gray-500 text-xs">즐겨찾기 도시</p>
        {/* 현재 날씨가 있고 즐겨찾기에 없을 때만 표시 */}
        {weather && !favorites.includes(weather.city) && (
            <button
                type="button"
                onClick={() => addFavorites(weather.city)}
                className="text-sky-400 text-xs hover:text-sky-300 cursor-pointer"
            >
                + 추가
            </button>
        )}
    </div>

    {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm">즐겨찾기가 없어요</p>
    ) : (
        favorites.map((city) => (
            <button
                type="button"
                key={city}
                onClick={() => handleCityClick(city)}
                className="flex items-center text-white bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer"
            >
                📍 {city}
            </button>
        ))
    )}
</div>

            {/* 로그아웃 */}
            <div className="p-4 border-t border-gray-700">
                <button
                    type="button"

                    onClick={handleLogout}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 cursor-pointer"
                >
                    🚪 로그아웃
                </button>
            </div>

        </div>
    )
}