import { useEffect } from "react";
import { NativeModules } from "react-native";
import { useUserStateStore, ScreenStatus } from "../store/userStateStore"; // zustand 상태 가져오기

const { ScreenReceiverModule } = NativeModules;

export const useScreenStatus = () => {
  const { setScreenStatus } = useUserStateStore(); // zustand 상태 업데이트 함수 가져오기

  useEffect(() => {
    const checkScreenStatus = async () => {
      try {
        const isScreenOnNative = await ScreenReceiverModule.isScreenOn();
        setScreenStatus(isScreenOnNative ? ScreenStatus.ON : ScreenStatus.OFF); // zustand 상태 업데이트
      } catch (error) {
        console.error("Error checking screen status:", error);
        setScreenStatus(ScreenStatus.ERROR);
      }
    };

    checkScreenStatus();

    const interval = setInterval(checkScreenStatus, 10000); // 10초마다 상태 확인
    return () => clearInterval(interval);
  }, [setScreenStatus]); // zustand 함수가 의존성에 포함됨
};
