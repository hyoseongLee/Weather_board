import useWeatherStore from "../store/weatherStore"

export default function FavoriteList() {
    const { favorites, fetchWeather, addFavorites, removeFavorites, weather } = useWeatherStore()

    return (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">⭐ 즐겨찾기</h3>
                {/* 현재 날씨가 있고 즐겨찾기에 없을 때만 추가 버튼 표시 */}
            </div>

            {/* 즐겨찾기 없을 때 */}
            {favorites.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                    즐겨찾기한 도시가 없어요
                </p>
            )}

            {/* 즐겨찾기 목록 */}
            <div className="flex flex-col gap-2">
                {favorites.map((city) => (
                    <div
                        key={city}
                        className="flex justify-between items-center bg-gray-700 rounded-xl px-4 py-3"
                    >
                        <button
                            type="button"
                            onClick={() => fetchWeather(city)}
                            className="text-white hover:text-sky-400"
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