import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            const code = (error as { code?: string }).code ?? ""
            switch (code) {
                case "auth/weak-password":
                    return "비밀번호는 6자 이상이어야 해요"
                case "auth/email-already-in-use":
                    return "이미 사용중인 이메일이에요"
                case "auth/user-not-found":
                    return "존재하지 않는 계정이에요"
                case "auth/wrong-password":
                    return "비밀번호가 틀렸어요"
                case "auth/invalid-email":
                    return "이메일 형식이 올바르지 않아요"
                case "auth/invalid-credential":
                    return "이메일 또는 비밀번호가 틀렸어요"
                default:
                    return "오류가 발생했어요"
            }
        }
        return "오류가 발생했어요"
    }


    const handleSubmit = async () => {
        try {
            if (isSignUp) {
                // 회원가입
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // 로그인
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (e) {
            setError(getErrorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl w-96">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    WEATHERLY
                </h1>

                {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-xl p-3 mb-4 outline-none"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-xl p-3 mb-6 outline-none"
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-sky-500 text-white rounded-xl p-3 font-semibold hover:bg-sky-400 cursor-pointer"
                >
                    {isSignUp ? "가입하기" : "로그인"}
                </button>

                <p
                    onClick={() => setIsSignUp(!isSignUp)}
                    onKeyDown={(e) => { if (e.key === "Enter") setIsSignUp(!isSignUp) }}
                    className="text-gray-400 text-center mt-4 cursor-pointer hover:text-white"
                >
                    {isSignUp ? "이미 계정이 있어요" : "계정이 없어요"}
                </p>
            </div>
        </div>
    );
}