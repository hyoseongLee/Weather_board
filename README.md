# 🌤 SkyVue - 날씨 대시보드

> 도시별 날씨를 검색하고, 즐겨찾기로 관리하는 개인 날씨 대시보드

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React + TypeScript |
| 상태관리 | Zustand |
| 스타일 | TailwindCSS |
| 날씨 데이터 | OpenWeather API |
| 인증 | Firebase Auth |
| DB | Firebase Firestore |
| 배포 | Vercel |
| 빌드 | Vite |

---

## 📁 폴더 구조
```
src/
├── components/
│   ├── SearchBar.tsx       # 도시 검색바
│   ├── WeatherCard.tsx     # 메인 날씨 카드
│   ├── FavoriteList.tsx    # 즐겨찾기 목록
│   ├── SideBar.tsx         # 사이드바
│   ├── WeatherParticles.tsx # 날씨별 파티클 배경
│   ├── LoginModal.tsx      # 로그인/회원가입 모달
│   └── Toast.tsx           # 토스트 알림
├── store/
│   └── weatherStore.ts     # Zustand 전역 상태
├── types/
│   └── weather.ts          # TypeScript 타입 정의
├── api/
│   └── weatherApi.ts       # OpenWeather API 호출
├── pages/
│   ├── MainPage.tsx        # 메인 페이지
│   └── FavoritePage.tsx    # 즐겨찾기 페이지
├── router/
│   └── index.tsx           # 라우팅
├── firebase.ts             # Firebase 초기화
├── App.tsx                 # 앱 진입점
└── index.css               # 전역 스타일
```

---

## ✨ 주요 기능

- 🔍 한국어 도시명으로 날씨 검색
- 🌤 현재 날씨 및 시간별 예보 표시
- ⭐ 즐겨찾기 도시 저장 및 관리 (로그인 필요)
- 🎨 날씨 상태에 따라 배경·파티클 자동 변경
- 🔐 Firebase 이메일 로그인 / 회원가입
- 📱 비로그인 상태에서도 날씨 검색 가능

---

## 💡 기술적 도전

### 로그인 직후 즐겨찾기 자동 동기화
`onAuthStateChanged`를 App.tsx 최상단에서 구독해,
로그인이 감지되는 즉시 Firestore에서 즐겨찾기를
자동으로 불러오는 흐름을 설계했습니다.

### 로그인 페이지 → 모달로 설계 변경
초기에는 비로그인 사용자를 로그인 페이지로
강제 리다이렉트하는 구조로 설계했습니다.
개발 중 사용자 이탈 가능성을 인식하고,
즐겨찾기 접근 시점에만 모달을 노출하는 방식으로
전면 재설계했습니다.

### Zustand 단일 스토어로 전역 상태 통합
날씨 데이터, uid, 즐겨찾기, 모달 제어를
단일 스토어로 통합 관리해 props drilling 없이
어떤 컴포넌트에서든 상태를 즉시 참조할 수 있도록
설계했습니다.

---

## 🚀 시작하기
```bash
# 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

---

## 🔑 환경변수 설정 (.env)
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_OPENWEATHER_API_KEY=
```

---

## 📦 설치 패키지
```bash
# 프로덕션
npm install zustand firebase react-router-dom

# 개발용
npm install -D tailwindcss @tailwindcss/vite
```