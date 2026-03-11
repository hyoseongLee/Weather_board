import SearchBar from "../components/SearchBar"
import Sidebar from "../components/SideBar"
import WeatherCard from "../components/WeatherCard"

export default function MainPage() {

    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* 사이드바 */}
            <Sidebar />

            {/* 메인 콘텐츠 */}
            <div className="ml-64 flex-1 p-8">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">🌤 날씨 대시보드</h1>

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