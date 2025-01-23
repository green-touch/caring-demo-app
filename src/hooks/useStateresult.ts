import { useEffect } from "react";
import { fetchBatteryStatus } from "./fetchBatteryStatus";
import { fetchScreenStatus } from "./fetchScreenStatus";
import { useNetworkStatus } from "./useNetworkStatus";
import { useUserStateStore,ScreenStatus } from "../store/userStateStore";

export const useUserStateUpdater = () => {
  const {
    setBatteryStatus,
    setScreenStatus,
    calculateScreenOffDuration,
    updateUserState,
  } = useUserStateStore(); //Zustand 상태 관리 함수 가져오기기

  // 네트워크 상태 구독
  useNetworkStatus();

  useEffect(() => {
    // 주기적으로 사용자 상태 업데이트
    const interval = setInterval(async () => {
      // 1. 배터리 상태 업데이트
      const batteryStatus = await fetchBatteryStatus();
      setBatteryStatus(batteryStatus.level, batteryStatus.isCharging);

      // 2. 화면 상태 업데이트
      const screenStatus = await fetchScreenStatus();
      setScreenStatus(screenStatus);
      calculateScreenOffDuration(); //화면 꺼짐 상태 계산

      updateUserState(); //사용자 상태 업데이트트
    }, 10000); // 10초마다 업데이트

    return () => {
      clearInterval(interval); // 정리
    };
  }, [setBatteryStatus, setScreenStatus, calculateScreenOffDuration, updateUserState]);
};
