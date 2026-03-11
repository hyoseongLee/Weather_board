# 🌤 날씨 대시보드 개발 로드맵

## 기술 스택
- React + TypeScript
- Zustand (상태관리)
- TailwindCSS (UI)
- OpenWeather API (날씨 데이터)
- Firebase Auth (로그인)
- Vite (빌드 도구)

---

## 📁 폴더 구조
```
src/
├── components/
│   ├── SearchBar.tsx       # 도시 검색바
│   ├── WeatherCard.tsx     # 메인 날씨 카드
│   └── FavoriteList.tsx    # 즐겨찾기 목록
├── store/
│   └── weatherStore.ts     # Zustand 상태관리
├── types/
│   └── weather.ts          # TypeScript 타입 정의
├── api/
│   └── weatherApi.ts       # OpenWeather API 호출
├── pages/
│   ├── HomePage.tsx        # 메인 페이지
│   └── LoginPage.tsx       # 로그인 페이지
├── firebase.ts             # Firebase 초기화
├── App.tsx                 # 라우팅
└── index.css               # TailwindCSS
```

---

## ✅ 진행 순서

### STEP 1. 프로젝트 세팅 ✅ 완료
- [x] Vite + React + TypeScript 프로젝트 생성
- [x] TailwindCSS 설치 및 설정
- [x] Zustand, Axios, Firebase 설치
- [x] OpenWeather API 키 발급
- [x] Firebase 프로젝트 생성
- [x] `.env` 파일 작성
- [x] `firebase.ts` 파일 작성
- [x] 폴더 구조 생성

---

### STEP 2. 타입 정의
- [ ] `src/types/weather.ts`
  - WeatherData 인터페이스
  - HourlyData 인터페이스
  - WeatherStore 인터페이스

---

### STEP 3. API 연동
- [ ] `src/api/weatherApi.ts`
  - 현재 날씨 가져오기 (fetchCurrentWeather)
  - 시간별 예보 가져오기 (fetchHourlyWeather)

---

### STEP 4. 상태관리 (Zustand)
- [ ] `src/store/weatherStore.ts`
  - weather 상태
  - hourly 상태
  - favorites 상태
  - isLoading, error 상태
  - fetchWeather 액션
  - addFavorite / removeFavorite 액션

---

### STEP 5. 로그인 페이지
- [ ] `src/pages/LoginPage.tsx`
  - 이메일/비밀번호 입력
  - Firebase 로그인 연동
  - 회원가입 연동

---

### STEP 6. 컴포넌트 작성
- [ ] `src/components/SearchBar.tsx`
  - 도시 검색 입력
  - 검색 버튼
- [ ] `src/components/WeatherCard.tsx`
  - 온도, 날씨 상태 표시
  - 습도, 풍속, 체감온도
  - 일출/일몰 시간
  - 시간별 예보
- [ ] `src/components/FavoriteList.tsx`
  - 즐겨찾기 도시 목록
  - 추가/삭제 기능

---

### STEP 7. 메인 페이지
- [ ] `src/pages/HomePage.tsx`
  - 사이드바 + 메인 레이아웃
  - 컴포넌트 조합

---

### STEP 8. 라우팅
- [ ] `src/App.tsx`
  - 로그인 여부에 따라 페이지 분기
  - 로그인 안 했으면 → LoginPage
  - 로그인 했으면 → HomePage

---

### STEP 9. 배포
- [ ] Vercel 배포
  - GitHub에 푸시
  - Vercel 연동
  - 환경변수 설정

---

## 🔑 환경변수 목록 (.env)
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

## 📦 설치한 패키지
```bash
# 프로덕션
npm install zustand axios firebase

# 개발용
npm install -D tailwindcss @tailwindcss/vite
```

---

## 🗓 1주일 플랜
| 일차 | 목표 |
|------|------|
| 1일차 | STEP 1~3 (세팅 + 타입 + API) |
| 2일차 | STEP 4 (Zustand 상태관리) |
| 3일차 | STEP 5 (로그인 페이지) |
| 4일차 | STEP 6 (컴포넌트) |
| 5일차 | STEP 7~8 (메인 페이지 + 라우팅) |
| 6일차 | UI 다듬기 + 버그 수정 |
| 7일차 | STEP 9 (배포) |
