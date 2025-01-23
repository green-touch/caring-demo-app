import { NativeModules } from "react-native";
import { ScreenStatus } from "../store/userStateStore"; // Zustand 상태 가져오기

const { ScreenReceiverModule } = NativeModules;

// 화면 상태 가져오는 함수
export const fetchScreenStatus = async (): Promise<ScreenStatus> => {
  try {
    const isScreenOnNative = await ScreenReceiverModule.isScreenOn();
    return isScreenOnNative ? ScreenStatus.ON : ScreenStatus.OFF;
  } catch (error) {
    console.error("Error fetching screen status:", error);
    return ScreenStatus.ERROR;
  }
};
