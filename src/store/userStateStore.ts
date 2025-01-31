import { create } from "zustand";

// 화면 상태 enum
export enum ScreenStatus {
  ON = "ON",
  OFF = "OFF",
  ERROR = "ERROR",
  ROADING = "ROADING",
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

  // 상태 변경 메서드
  setBatteryStatus: (level: number, isCharging: boolean) => void;
  setScreenStatus: (status: ScreenStatus) => void;
  setNetworkConnected: (isConnected: boolean) => void;
  setScreenOffDuration: (duration: number) => void;
  setUserState: (state: UserState, code: string | null) => void;
}

// Zustand 전역 상태 초기값
export const useUserStateStore = create<UserStateStore>((set) => ({
  batteryStatus: { level: 100, isCharging: false },
  screenStatus: ScreenStatus.ROADING,
  networkConnected: true,
  screenOffDuration: 0,
  userState: UserState.NORMAL,
  code: null,

 // 배터리 상태 설정 (기존 상태를 유지하면서 업데이트)
 setBatteryStatus: (level, isCharging) =>
  set((prev) => ({
    batteryStatus: {
      level: level ?? prev.batteryStatus.level,
      isCharging: isCharging ?? prev.batteryStatus.isCharging,
    },
  })),

// 화면 상태 설정
setScreenStatus: (status) =>
  set((prev) => ({ screenStatus: status ?? prev.screenStatus })),

// 네트워크 상태 설정
setNetworkConnected: (isConnected) =>
  set((prev) => ({ networkConnected: isConnected ?? prev.networkConnected })),

// 화면 꺼짐 지속 시간 설정
setScreenOffDuration: (duration) =>
  set((prev) => ({ screenOffDuration: duration ?? prev.screenOffDuration })),

// 사용자 상태 및 코드 설정
setUserState: (state, code) =>
  set((prev) => ({
    userState: state ?? prev.userState,
    code: code ?? prev.code,
  })),
}));
