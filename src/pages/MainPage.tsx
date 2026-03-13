import SearchBar from "../components/SearchBar"
import Sidebar from "../components/SideBar"
import WeatherCard from "../components/WeatherCard"
import WeatherParticles from "../components/WeatherParticles"
import useWeatherStore from "../store/weatherStore"

export default function MainPage() {
    const { weather } = useWeatherStore()

    return (
        <div className="flex min-h-screen">
            {/**파티클 배경 */}
            {<WeatherParticles iconCode={weather?.icon ?? ""} />}
            {/* 사이드바 */}
            <Sidebar />

            {/* 메인 콘텐츠 */}
            <div className="ml-64 flex-1 p-8">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">🌤 날씨 대시보드</h1>

                </div>

                {/* 검색바 */}
                <div className="mb-6">
                    <SearchBar />
                </div>

                {/* 날씨카드 + 즐겨찾기 */}
                <div className="flex flex-col gap-6">
                    <WeatherCard />
                </div>
            </div>
        </div>
    )
}