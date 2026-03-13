import { useEffect } from "react"

interface ToastProps {
    message: string | null
    onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
    useEffect(() => {
        if (!message) return
        const timer = setTimeout(onClose, 2500)
        return () => clearTimeout(timer)
    }, [message, onClose])

    if (!message) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-5 py-3 rounded-full shadow-lg z-50 animate-slideUp">
            {message}
        </div>
    )
}