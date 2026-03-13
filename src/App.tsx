import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import LoginModal from './components/LoginModal'
import Toast from './components/Toast'
import { auth } from './firebase'
import Router from './router'
import useWeatherStore from './store/weatherStore'

export default function App() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState<string | null>(null)
    const isFirstLoad = useRef(true)
    const { setUid, loadFavorites, isLoginModal } = useWeatherStore()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)

            if (isFirstLoad.current) {
                isFirstLoad.current = false
                if (user) {
                    setUid(user.uid)
                    loadFavorites(user.uid)
                } else {
                    setUid(null)
                }
                return
            }

            if (user) {
                setUid(user.uid)
                loadFavorites(user.uid)
                setToast("로그인되었습니다! 👋")
            } else {
                setUid(null)
                setToast("로그아웃되었습니다.")
            }
        })
        return unsubscribe
    }, [setUid, loadFavorites])

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <p className="text-gray-400 text-xl">🌤 불러오는 중...</p>
        </div>
    )

    return (
        <>
            {isLoginModal && <LoginModal isOpen={isLoginModal} />}
            <Toast message={toast} onClose={() => setToast(null)} />
            <Router user={user} />
        </>
    )
}