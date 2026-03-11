import { useEffect, useState } from "react"
import LoginPage from "./pages/LoginPage"
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";  
import MainPage from "./pages/MainPage";


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const unsuubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })
    return () => unsuubscribe()
  }, [])


  // 로딩 중
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
      🔄 로딩 중...
    </div>
  )

  return user ? <MainPage /> : <LoginPage />

}