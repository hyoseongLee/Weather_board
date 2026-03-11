import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from './firebase'
import Router from './router'
import useWeatherStore from './store/weatherStore'

export default function App() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { setUid, loadFavorites } = useWeatherStore()

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

    if (loading) return <div className="text-white p-8">로딩중...</div>

    return <Router user={user} />
}