import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase"
import useWeatherStore from "../store/weatherStore"

interface LoginModalProps {
    isOpen: boolean
}

export default function LoginModal({ isOpen }: LoginModalProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { setLoginModalOpen } = useWeatherStore()

    const getErrorMessage = (error: unknown): string => {
        const code = (error as { code?: string })?.code ?? ""
        switch (code) {
            case "auth/weak-password": return "비밀번호는 6자 이상이어야 해요"
            case "auth/email-already-in-use": return "이미 사용중인 이메일이에요"
            case "auth/user-not-found": return "존재하지 않는 계정이에요"
            case "auth/wrong-password": return "비밀번호가 틀렸어요"
            case "auth/invalid-email": return "이메일 형식이 올바르지 않아요"
            case "auth/invalid-credential": return "이메일 또는 비밀번호가 틀렸어요"
            default: return "오류가 발생했어요"
        }
    }

    const handleSubmit = async () => {
        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
            setEmail("")
            setPassword("")
            setError(null)
            setLoginModalOpen(false)  // 로그인 성공시 모달 닫기
        } catch (e) {
            setError(getErrorMessage(e))
        }
    }

    if (!isOpen) return null

    return (
        <>
            {/* 모달 카드 */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative bg-sky-100 backdrop-blur-md rounded-2xl p-8 w-96 shadow-xl animate-slideUp">

                    {/* 닫기 버튼 */}
                    <button
                        type="button"
                        onClick={() => setLoginModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        ✕
                    </button>

                    {/* 로고 */}
                    <h1 className="text-3xl font-bold text-sky-500 tracking-widest text-center mb-2">
                        SkyVue
                    </h1>
                    <p className="text-gray-400 text-sm text-center mb-8">
                        날씨를 한눈에 확인하세요
                    </p>

                    {error && (
                        <p className="text-red-400 mb-4 text-sm">{error}</p>
                    )}

                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 text-gray-800 rounded-xl p-3 mb-4 outline-none border border-gray-200 focus:border-sky-400 placeholder-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
                        className="w-full bg-gray-100 text-gray-800 rounded-xl p-3 mb-6 outline-none border border-gray-200 focus:border-sky-400 placeholder-gray-400"
                    />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
                        className="w-full bg-sky-500 text-white rounded-xl p-3 font-semibold hover:bg-sky-400 cursor-pointer"
                    >
                        {isSignUp ? "가입하기" : "로그인"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="w-full text-gray-400 text-center mt-4 cursor-pointer hover:text-sky-500 text-sm"
                    >
                        {isSignUp ? "이미 계정이 있어요" : "계정이 없어요"}
                    </button>
                </div>
            </div>
        </>
    )
}