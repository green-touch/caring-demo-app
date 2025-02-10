import { create } from "zustand";

// 화면 상태 enum
export enum ScreenStatus {
  ON = "ON",
  OFF = "OFF",
  ERROR = "ERROR",
  LOADING = "LOADING",
}

// 사용자 상태 enum
export enum UserState {
  NORMAL = "정상",
  WARNING = "경고",
  DANGER = "위험",
}

// 배터리 상태
interface BatteryStatus {
  level: number; // 배터리 잔량 
  isCharging: boolean; // 충전 여부
}

// 전역 상태 인터페이스
interface UserStateStore {
  batteryStatus: BatteryStatus; // 배터리 상태
  screenStatus: ScreenStatus; // 화면 상태
  networkConnected: boolean; // 네트워크 연결 여부
  screenOffDuration: number; // 화면 꺼짐 지속 시간
  userState: UserState; // 사용자 상태
  code: string | null; // 상태 코드
  lastUpdated : string;

  // 상태 변경 메서드
  setBatteryStatus: (level: number, isCharging: boolean) => void;
  setScreenStatus: (status: ScreenStatus) => void;
  setNetworkConnected: (isConnected: boolean) => void;
  setScreenOffDuration: (duration: number) => void;
  setUserState: (state: UserState, code: string | null) => void;
  setLastUpdated: ()=> void;
}

const getFormattedTime = () => {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23", //24시간 형식
    timeZone: "Asia/Seoul", //한국 표준시(KST) 강제 적용
  }).format(new Date());
};

// Zustand 전역 상태 초기값
export const useUserStateStore = create<UserStateStore>((set) => ({
  batteryStatus: { level: 100, isCharging: false },
  screenStatus: ScreenStatus.LOADING,
  networkConnected: true,
  screenOffDuration: 0,
  userState: UserState.NORMAL,
  code: null,
  lastUpdated : new Date().toLocaleTimeString(),
  
  setLastUpdated: () =>
    set((prev) => {
      const newTime = getFormattedTime();
      return prev.lastUpdated !== newTime ? { lastUpdated: newTime } : prev;
    }),

  //배터리 상태 변경 시 이전 값과 비교 후 업데이트
  setBatteryStatus: (level, isCharging) =>
    set((prev) => {
      if (prev.batteryStatus.level === level && prev.batteryStatus.isCharging === isCharging) return prev;
      return {
        batteryStatus: { level, isCharging },
        lastUpdated: getFormattedTime(),
      };
    }),

  //화면 상태 변경 시 이전 값과 비교 후 업데이트
  setScreenStatus: (status) =>
    set((prev) => {
      if (prev.screenStatus === status) return prev;
      return {
        screenStatus: status,
        lastUpdated: getFormattedTime(),
      };
    }),

  // 네트워크 상태 변경 시 이전 값과 비교 후 업데이트
  setNetworkConnected: (isConnected) =>
    set((prev) => {
      if (prev.networkConnected === isConnected) return prev;
      return {
        networkConnected: isConnected,
        lastUpdated: getFormattedTime(),
      };
    }),

  // 화면 꺼짐 지속 시간 변경 시 이전 값과 비교 후 업데이트
  setScreenOffDuration: (duration) =>
    set((prev) => {
      if (prev.screenOffDuration === duration) return prev;
      return {
        screenOffDuration: duration,
        lastUpdated: getFormattedTime(),
      };
    }),

  // 사용자 상태 및 코드 변경 시 이전 값과 비교 후 업데이트
  setUserState: (state, code) =>
    set((prev) => {
      if (prev.userState === state && prev.code === code) return prev;
      return {
        userState: state,
        code,
        lastUpdated: getFormattedTime(),
      };
    }),
}));