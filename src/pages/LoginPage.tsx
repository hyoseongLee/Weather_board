import { useState } from "react";
import { auth } from "../fireBase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            const message = e instanceof Error ? e.message : "오류가 발생했어요"
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl w-96">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    {isSignUp ? "회원가입" : "로그인"}
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