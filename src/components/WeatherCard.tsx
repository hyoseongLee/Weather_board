import useWeatherStore from "../store/weatherStore"

export default function WeatherCard() {
    const { weather, hourly, isLoading, error } = useWeatherStore()

    const formatTime = (unix: number) => {
        return new Date(unix * 1000).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (isLoading) return (
        <div className="flex items-center justify-center h-64 text-gray-500 text-xl">
            🔄 날씨 불러오는 중...
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center h-64 text-red-400 text-xl">
            😢 {error}
        </div>
    )

    if (!weather) return (
        <div className="flex items-center justify-center h-64 text-gray-400 text-xl">
            🔍 도시를 검색해보세요!
        </div>
    )

    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            {/* 도시 이름 */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-4xl font-bold text-gray-800">{weather.city}</h2>
                    <p className="text-gray-400 mt-1">{weather.country}</p>
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-16 h-16 bg-sky-100 rounded-full"
                />
            </div>

            {/* 온도 */}
            <div className="mb-6">
                <p className="text-7xl font-bold text-gray-800">{weather.temp}°C</p>
                <p className="text-gray-500 mt-2 capitalize">{weather.description}</p>
                <p className="text-gray-400">체감온도 {weather.feelsLike}°C</p>
            </div>

            {/* 날씨 정보 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <p className="text-gray-400 text-sm">💧 습도</p>
                    <p className="text-gray-700 font-semibold">{weather.humidity}%</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <p className="text-gray-400 text-sm">💨 풍속</p>
                    <p className="text-gray-700 font-semibold">{weather.windSpeed}m/s</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <p className="text-gray-400 text-sm">🌅 일출/일몰</p>
                    <p className="text-gray-700 font-semibold text-xs">
                        {formatTime(weather.sunrise)} / {formatTime(weather.sunset)}
                    </p>
                </div>
            </div>

            {/* 시간별 예보 */}
            <div>
                <p className="text-gray-400 text-sm mb-3">⏱ 시간별 예보</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {hourly.map((item) => (
                        <div
                            key={item.time}
                            className="flex flex-col items-center bg-sky-50 border border-sky-100 rounded-xl p-3 min-w-16"
                        >
                            <p className="text-gray-400 text-xs">{formatTime(item.time)}</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                                alt={item.description}
                                className="w-8 h-8 bg-white rounded-full"
                            />
                            <p className="text-gray-700 text-sm font-semibold">{item.temp}°</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}