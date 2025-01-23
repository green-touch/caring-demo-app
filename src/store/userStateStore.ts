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
  level: number; // 배터리 잔량 (0~100)
  isCharging: boolean; // 충전 여부
}

// 상태 전환 임계값
interface Thresholds {
  WARNING_BATTERY_THRESHOLD: number; 
  DANGER_BATTERY_THRESHOLD: number;
  WARNING_SCREEN_OFF_TIME: number;
  DANGER_SCREEN_OFF_TIME: number;
}

// 전역 상태 인터페이스
interface UserStateStore {
  batteryStatus: BatteryStatus; // 배터리 상태
  screenStatus: ScreenStatus; // 화면 상태
  networkConnected: boolean; // 네트워크 연결 여부
  lastScreenOffTime: number; // 마지막 화면 OFF 시간
  screenOffDuration: number; // 화면 꺼짐 지속 시간
  userState: UserState; // 사용자 상태
  code: string | null; // 상태 코드
  thresholds: Thresholds; // 상태 전환 임계값

  // 상태 변경 메서드
  setBatteryStatus: (level: number, isCharging: boolean) => void;
  setScreenStatus: (status: ScreenStatus) => void;
  setNetworkConnected: (isConnected: boolean) => void;
  calculateScreenOffDuration: () => void; // 화면 꺼짐 시간 계산
  updateUserState: () => void; // 사용자 상태 업데이트
}

// Zustand 전역 상태 초기값값
export const useUserStateStore = create<UserStateStore>((set, get) => ({
  batteryStatus: { level: 100, isCharging: false },
  screenStatus: ScreenStatus.ROADING,
  networkConnected: true,
  lastScreenOffTime: 0,
  screenOffDuration: 0,
  userState: UserState.NORMAL,
  code: null,
  thresholds: {
    WARNING_BATTERY_THRESHOLD: 20, // 경고로 전환되는 배터리 값
    DANGER_BATTERY_THRESHOLD: 10, // 위험 배터리 임계값
    WARNING_SCREEN_OFF_TIME: 60 * 1000, // 1분 (임의로 설정, 사용자한테 받아야 하는 값)
    DANGER_SCREEN_OFF_TIME: 120 * 1000, // 2분(임의로 설정, 사용자한테 받아야 하는 값)
  },

  // 배터리 상태 설정
  setBatteryStatus: (level, isCharging) =>
    set({ batteryStatus: { level, isCharging } }),

  // 화면 상태 설정
  setScreenStatus: (status) =>
    set((state) => {
      if (status === ScreenStatus.OFF) {
        return { screenStatus: status, lastScreenOffTime: Date.now() };
      } else if (status === ScreenStatus.ON) {
        return { screenStatus: status, lastScreenOffTime: 0, screenOffDuration: 0 };
      }
      return { screenStatus: status };
    }),

  // 네트워크 상태 설정
  setNetworkConnected: (isConnected) => set({ networkConnected: isConnected }),

  // 화면 꺼짐 지속 시간 계산
  calculateScreenOffDuration: () => {
    const { screenStatus, lastScreenOffTime } = get();
    if (screenStatus === ScreenStatus.OFF && lastScreenOffTime) {
      const now = Date.now();
      set({ screenOffDuration: now - lastScreenOffTime });
    } else {
      set({ screenOffDuration: 0 });
    }
  },

  // 사용자 상태 업데이트
  updateUserState: () => {
    const {
      batteryStatus,
      screenStatus,
      networkConnected,
      screenOffDuration,
      thresholds,
    } = get();
  
    const {
      WARNING_BATTERY_THRESHOLD,
      DANGER_BATTERY_THRESHOLD,
      WARNING_SCREEN_OFF_TIME,
      DANGER_SCREEN_OFF_TIME,
    } = thresholds;
  
    let newState = UserState.NORMAL;
    let newCode = null; // 상태 코드 초기화
  
    // ✅ 1. 네트워크 상태 우선 평가
    if (!networkConnected) {
      if (batteryStatus.level < DANGER_BATTERY_THRESHOLD || screenOffDuration >= DANGER_SCREEN_OFF_TIME) {
        newState = UserState.DANGER;
        newCode = "NET-04"; // 네트워크 위험 끊김
      } else {
        newState = UserState.WARNING;
        newCode = "NET-02"; // 네트워크 연결 끊김
      }
    }
  
    // ✅ 2. 배터리 상태 평가 (네트워크 연결이 된 경우만)
    if (!newCode) { // 네트워크 관련 코드가 설정되지 않은 경우
      if (batteryStatus.level < DANGER_BATTERY_THRESHOLD && !batteryStatus.isCharging) {
        newState = UserState.DANGER;
        newCode = "BAT-02"; // 배터리 부족 위험
      } else if (batteryStatus.level < WARNING_BATTERY_THRESHOLD && !batteryStatus.isCharging) {
        newState = UserState.WARNING;
        newCode = "BAT-01"; // 배터리 부족 경고
      }
    }
  
    // ✅ 3. 화면 상태 평가 (네트워크와 배터리 관련 코드가 설정되지 않은 경우만)
    if (!newCode) {
      if (screenStatus === ScreenStatus.OFF) {
        if (screenOffDuration >= DANGER_SCREEN_OFF_TIME) {
          newState = UserState.DANGER;
          newCode = "SCR-02"; // 화면 꺼짐 위험
        } else if (screenOffDuration >= WARNING_SCREEN_OFF_TIME) {
          newState = UserState.WARNING;
          newCode = "SCR-01"; // 화면 꺼짐 경고
        }
      }
    }
  
    // 최종 상태 업데이트
    set({ userState: newState, code: newCode });
  },
}));
