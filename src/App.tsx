import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import LoginModal from './components/LoginModal'
import { auth } from './firebase'
import Router from './router'
import useWeatherStore from './store/weatherStore'

export default function App() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { setUid, loadFavorites, isLoginModal } = useWeatherStore()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
            if (user) {
                setUid(user.uid)
                loadFavorites(user.uid)
            } else {
                setUid(null)
            }
        })
        return unsubscribe
    }, [setUid, loadFavorites])

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#e0f2fe]">
            <p className="text-gray-400 text-xl">🌤 불러오는 중...</p>
        </div>
    )

    return (
        <>
            <LoginModal isOpen={isLoginModal} />
            <Router user={user} />
        </>
    )
}