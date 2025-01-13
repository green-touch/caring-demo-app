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

// Zustand 전역 상태
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
    WARNING_SCREEN_OFF_TIME: 60 * 1000, // 1분
    DANGER_SCREEN_OFF_TIME: 120 * 1000, // 2분
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

    // ⚠️ 경고 상태 계산
    if (
      (!networkConnected) || // 네트워크 연결 끊김
      (batteryStatus.level < WARNING_BATTERY_THRESHOLD && !batteryStatus.isCharging) || // 배터리 경고
      (screenStatus === ScreenStatus.OFF && screenOffDuration >= WARNING_SCREEN_OFF_TIME) // 화면 꺼짐 경고
    ) {
      newState = UserState.WARNING;
      if (!networkConnected) {
        newCode = "NET-02";
      } else if (batteryStatus.level < WARNING_BATTERY_THRESHOLD && !batteryStatus.isCharging) {
        newCode = "BAT-01";
      } else if (screenStatus === ScreenStatus.OFF && screenOffDuration >= WARNING_SCREEN_OFF_TIME) {
        newCode = "SCR-01";
      }
    }

    // 🚨 위험 상태 계산
    if (
      (!networkConnected && (
        batteryStatus.level < DANGER_BATTERY_THRESHOLD || // 네트워크 끊김과 배터리 위험
        (screenStatus === ScreenStatus.OFF && screenOffDuration >= DANGER_SCREEN_OFF_TIME) // 화면 꺼짐 위험
      )) ||
      (batteryStatus.level < DANGER_BATTERY_THRESHOLD && !batteryStatus.isCharging) ||
      (screenStatus === ScreenStatus.OFF && screenOffDuration >= DANGER_SCREEN_OFF_TIME)
    ) {
      newState = UserState.DANGER;
      if (!networkConnected) {
        newCode = "NET-04";
      } else if (batteryStatus.level < DANGER_BATTERY_THRESHOLD && !batteryStatus.isCharging) {
        newCode = "BAT-02";
      } else if (screenStatus === ScreenStatus.OFF && screenOffDuration >= DANGER_SCREEN_OFF_TIME) {
        newCode = "SCR-02";
      }
    }

    set({ userState: newState, code: newCode }); // 상태 및 코드 업데이트
  },
}));
