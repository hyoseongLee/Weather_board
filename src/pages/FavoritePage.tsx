import FavoriteList from "../components/FavoriteList"
import Sidebar from "../components/SideBar"

export default function FavoritePage() {
    return (
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <div className="ml-64 flex-1 p-8">
                <h1 className="text-3xl font-bold text-white mb-8">⭐ 즐겨찾기</h1>
                <FavoriteList />
            </div>
        </div>
    )
}