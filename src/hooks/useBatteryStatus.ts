import { useEffect } from "react";
import { NativeModules } from "react-native";
import { useUserStateStore } from "../store/userStateStore";

const { BatteryModule } = NativeModules;

export const useBatteryStatus = () => {
  const { setBatteryStatus, updateUserState } = useUserStateStore(); // Zustand 상태 업데이트 함수

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        // 디버깅용 로그
        console.log("BatteryModule:", BatteryModule);
        if (!BatteryModule.isCharging) {
          console.error("isCharging method is missing in BatteryModule");
        } else {
          console.log("isCharging method is available");
        }

        // 네이티브 모듈에서 배터리 잔량과 충전 상태 가져오기
        const level = BatteryModule.getBatteryLevel
          ? await BatteryModule.getBatteryLevel()
          : 0;

        const isCharging = BatteryModule.isCharging
          ? await BatteryModule.isCharging()
          : false;

        console.log("Battery Level:", level, "Is Charging:", isCharging);

        // 상태 업데이트
        setBatteryStatus(level, isCharging);

        // User State 업데이트
        updateUserState();
      } catch (error) {
        console.error("Error fetching battery status:", error);
        setBatteryStatus(0, false);

        // User State를 안전 상태로 설정 (fallback)
        updateUserState();
      }
    };

    fetchBatteryStatus();

    // 5초마다 배터리 상태 업데이트
    const interval = setInterval(fetchBatteryStatus, 5000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [setBatteryStatus, updateUserState]); // 상태 업데이트 의존성 포함
};
