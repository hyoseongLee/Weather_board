import type { User } from 'firebase/auth'
import { Route, Routes } from 'react-router-dom'
import FavoritePage from '../pages/FavoritePage'
import MainPage from '../pages/MainPage'

interface RouterProps {
    user: User | null
}

export default function Router({ user }: RouterProps) {
    return (
        <Routes>
            {/* 비로그인도 메인 접근 가능 */}
            <Route path="/" element={<MainPage />} />
            {/* 즐겨찾기는 로그인시에만 */}
            <Route
                path="/favorites"
                element={user ? <FavoritePage /> : <MainPage />}
            />
        </Routes>
    )
}