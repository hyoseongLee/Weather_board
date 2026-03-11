import { signOut } from "firebase/auth"
import FavoriteList from "../components/FavoriteList"
import SearchBar from "../components/searchBar"
import WeatherCard from "../components/weatherCard"
import { auth } from "../firebase"



export default function MainPage() {
    const handleLogout = async () => {
        await signOut(auth)
    }
    return (
        <div className="min-h-screen bg-gray-900 p-8">
            {/**헤더 */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">🌤 날씨 대시보드</h1>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white text-sm"
                >로그아웃</button>
            </div>
            {/**검색바 */}
            <div className="mb-6"> <SearchBar /> </div>
            {/** 메인 컨텐츠 */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2"><WeatherCard />
                </div>
                {/**즐겨찾기 바 */}
                <div className="col-span-1"><FavoriteList />
                </div>
            </div>
        </div>
    )
}