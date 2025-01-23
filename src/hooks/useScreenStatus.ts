import { useEffect } from "react";
import { fetchScreenStatus } from "./fetchScreenStatus";
import { useUserStateStore, ScreenStatus } from "../store/userStateStore"; // Zustand 상태 가져오기

export const useScreenStatus = () => {
  const { setScreenStatus, calculateScreenOffDuration, updateUserState } =
    useUserStateStore(); // Zustand 상태 관리 함수 가져오기

  useEffect(() => {
    const updateScreenStatus = async () => {
      const status = await fetchScreenStatus(); // 화면 상태 가져오기
      setScreenStatus(status); // Zustand 상태 업데이트
      calculateScreenOffDuration(); // 화면 꺼짐 지속 시간 계산
      updateUserState(); // 사용자 상태 업데이트
    };

    updateScreenStatus();

    const interval = setInterval(updateScreenStatus, 30000); // 30초마다 업데이트
    return () => clearInterval(interval);
  }, [setScreenStatus, calculateScreenOffDuration, updateUserState]);
};
