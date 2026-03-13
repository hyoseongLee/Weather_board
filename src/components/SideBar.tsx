import { signOut } from "firebase/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import useWeatherStore from "../store/weatherStore"

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { favorites, fetchWeather, weather, addFavorites, uid, setLoginModalOpen,resetWeather } = useWeatherStore() // 👈 setLoginModalOpen 추가

    const handleLogout = async () => {
        await signOut(auth)
    }

    const handleCityClick = (city: string) => {
        fetchWeather(city)
        navigate("/")
    }

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-10">

            {/* 로고 */}
            <button
                type="button"
                onClick={() =>{ 
                    resetWeather()
                    navigate("/")}}
                className="p-6 border-b border-gray-200 cursor-pointer w-full text-left"
            >
                <h1 className="text-sky-500 font-bold text-2xl tracking-widest">SkyVue</h1>
            </button>

            {/* 메뉴 */}
            <div className="p-4 flex flex-col gap-2">
                <p className="text-gray-400 text-xs mb-1">메뉴</p>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer ${location.pathname === "/" ? "text-sky-600 bg-sky-50" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
                >
                    🌤 날씨 대시보드
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (!uid) {
                            setLoginModalOpen(true)
                        } else {
                            navigate("/favorites")
                        }
                    }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer ${location.pathname === "/favorites" ? "text-sky-600 bg-sky-50" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
                >
                    ⭐ 즐겨찾기
                </button>
            </div>

            {/* 즐겨찾기 도시 */}
            <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-gray-400 text-xs">즐겨찾기 도시</p>
                    {weather && !favorites.includes(weather.city) && (
                        <button
                            type="button"
                            onClick={() => {
                                if (!uid) {
                                    setLoginModalOpen(true) // 비로그인 체크 추가
                                } else {
                                    addFavorites(weather.city)
                                }
                            }}
                            className="text-sky-400 text-xs hover:text-sky-500 cursor-pointer"
                        >
                            + 추가
                        </button>
                    )}
                </div>

                {favorites.length === 0 ? (
                    <p className="text-gray-400 text-sm">즐겨찾기가 없어요</p>
                ) : (
                    favorites.map((city) => (
                        <button
                            type="button"
                            key={city}
                            onClick={() => handleCityClick(city)}
                            className="flex items-center text-gray-700 bg-gray-100 hover:bg-sky-50 hover:text-sky-600 rounded-lg px-3 py-2 cursor-pointer"
                        >
                            📍 {city}
                        </button>
                    ))
                )}
            </div>

            {/* 로그인/로그아웃 */}
            <div className="p-4 border-t border-gray-200">
                {uid ? (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-600 rounded-lg py-2 cursor-pointer"
                    >
                        🚪 로그아웃
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setLoginModalOpen(true)}
                        className="w-full bg-sky-300 hover:bg-sky-400 text-white rounded-lg py-2 font-bold cursor-pointer"
                    >
                        🔑 로그인
                    </button>
                )}
            </div>
        </div>
    )
}