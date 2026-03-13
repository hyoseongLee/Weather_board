import type { ISourceOptions } from "@tsparticles/engine"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useEffect, useState } from "react"

interface WeatherParticlesProps {
    iconCode: string
}

// 날씨 코드별 파티클 설정
const getParticlesConfig = (iconCode: string): ISourceOptions => {
    const code = iconCode.slice(0, 2) // "01d" → "01"

// 초기화면 (검색 전)
if (!iconCode) {
    return {
        particles: {
            number: { value: 80 },
            color: { value: "#90caf9" },  // 하늘색 파티클
            opacity: { value: { min: 0.2, max: 0.6 } },
            size: { value: { min: 1, max: 3 } },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
            },
            shape: { type: "circle" },
        },
        background: { color: "#e0f2fe" },  // 밝은 하늘색
    }
}

switch (code) {
    case "01": // 맑음
        return {
            particles: {
                number: { value: 80 },
                color: { value: "#fbbf24" },  // 햇살 느낌 노란색
                opacity: { value: { min: 0.1, max: 0.4 } },
                size: { value: { min: 1, max: 3 } },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                },
                shape: { type: "circle" },
            },
            background: {
                color: iconCode.endsWith("n")
                    ? "#e0f2fe"   // 맑은 밤 (어둡게 유지)
                    : "#e0f2fe",  // 맑은 낮 - 밝은 하늘색
            },
        }

    case "09":
    case "10": // 비
        return {
            particles: {
                number: { value: 200 },
                color: { value: "#60a5fa" },
                opacity: { value: 0.6 },
                size: { value: { min: 1, max: 2 } },
                move: {
                    enable: true,
                    speed: 15,
                    direction: "bottom",
                    straight: true,
                },
                shape: { type: "circle" },
            },
            background: { color: "#93c5fd" },  // 밝은 파란색
        }

    case "13": // 눈
        return {
            particles: {
                number: { value: 150 },
                color: { value: "#bfdbfe" },
                opacity: { value: 0.8 },
                size: { value: { min: 2, max: 5 } },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "bottom",
                    random: true,
                    straight: false,
                },
                shape: { type: "circle" },
            },
            background: { color: "#e0f2fe" },  // 밝은 하늘색
        }

    case "11": // 천둥번개
        return {
            particles: {
                number: { value: 100 },
                color: { value: "#fbbf24" },
                opacity: {
                    value: 0.8,
                    animation: {
                        enable: true,
                        speed: 3,
                        sync: false,
                    },
                },
                size: { value: { min: 1, max: 3 } },
                move: {
                    enable: true,
                    speed: 10,
                    direction: "bottom",
                    straight: true,
                },
                shape: { type: "circle" },
            },
            background: { color: "#475569" },  // 천둥 - 어두운 회색
        }

    default: // 흐림, 안개
        return {
            particles: {
                number: { value: 60 },
                color: { value: "#94a3b8" },
                opacity: { value: { min: 0.1, max: 0.4 } },
                size: { value: { min: 1, max: 3 } },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "right",
                    straight: true,
                },
                shape: { type: "circle" },
            },
            background: { color: "#cbd5e1" },  // 흐림 - 밝은 회색
        }
}
}

export default function WeatherParticles({ iconCode }: WeatherParticlesProps) {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => setInit(true))
    }, [])

    if (!init) return null

    return (
        <Particles
            id="weather-particles"
            options={getParticlesConfig(iconCode)}
            className="fixed inset-0 -z-10"
        />
    )
}