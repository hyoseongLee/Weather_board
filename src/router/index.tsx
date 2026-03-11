import type { User } from 'firebase/auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import FavoritePage from '../pages/FavoritePage'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'

interface RouterProps {
    user: User | null
}

export default function Router({ user }: RouterProps) {
    return (
        <Routes>
            <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
                path="/"
                element={user ? <MainPage /> : <Navigate to="/login" />}
            />
            <Route
                path="/favorites"
                element={user ? <FavoritePage /> : <Navigate to="/login" />}
            />
        </Routes>
    )
}