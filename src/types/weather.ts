// 날씨 데이터 타입
export interface WeatherData {
    city:string; // 국가
    country: string; // 국가코드
    temp: number; // 현재온도
    feelsLike : number; // 체감온도
    humidity : number; // 습도
    windSpeed : number; // 풍속
    description : string; // 날씨 설명
    icon : string; // 날씨 아이콘
    sunrise : number; // 일출시간
    sunset : number; // 일몰시간
}


// 시간별 데이터 타입
export interface HourlyData {
    time : number; // 현재 시간
    temp : number; // 현재 온도
    icon : string; // 날씨 아이콘
    description : string; // 날씨 설명
}

export interface ForecastItem { 
    dt:number;
    main:{
        temp:number;
    };
    weather:{
        icon:string;
        description: string;
    }[]
}



// Zustand Store 타입
export interface WeatherStore {
    weather : WeatherData | null ;  // 현재 날씨
    hourly : HourlyData[]; // 시간별 예보
    favorites : string[]
    isLoading : boolean;
    error : string | null;
    uid: string | null                                              
    setUid: (uid: string | null) => void                       
    fetchWeather: (city: string) => Promise<void>
    loadFavorites: (uid: string) => Promise<void>
    addFavorites: (city: string) => Promise<void>              
    removeFavorites: (city: string) => Promise<void> 
    isLoginModal: boolean
    setLoginModalOpen: (open:boolean) => void
    resetWeather: () => void
}