import { useEffect } from "react";
import { fetchBatteryStatus } from "./fetchBatteryStatus";
import { useUserStateStore } from "../store/userStateStore";

export const useBatteryStatus = () => {
  const { setBatteryStatus, updateUserState } = useUserStateStore();

  useEffect(() => {
    const updateBatteryStatus = async () => {
      const { level, isCharging } = await fetchBatteryStatus();
      setBatteryStatus(level, isCharging);
      updateUserState();
    };

    updateBatteryStatus();
    const interval = setInterval(updateBatteryStatus, 10000); // 10초마다 업데이트
    return () => clearInterval(interval);
  }, [setBatteryStatus, updateUserState]);
};
