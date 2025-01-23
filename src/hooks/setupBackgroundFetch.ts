import BackgroundFetch from "react-native-background-fetch";
import DeviceInfo from "react-native-device-info";
import NetInfo from "@react-native-community/netinfo";
import { useUserStateStore, ScreenStatus } from "../store/userStateStore";
import { useCodeNotification } from "./useCodeNotification";

export const setupBackgroundFetch = () => {
  const { setBatteryStatus, setScreenStatus, setNetworkConnected, updateUserState, code } =
    useUserStateStore.getState();

  const fetchUpdates = async () => {
    try {
      // 배터리 상태 업데이트
      const isCharging = await DeviceInfo.isBatteryCharging();
      const level = await DeviceInfo.getBatteryLevel();
      const batteryLevel = Math.round(level * 100);

      console.log("Background Fetch - Battery Level:", batteryLevel, "Is Charging:", isCharging);
      setBatteryStatus(batteryLevel, isCharging);

      // 네트워크 상태 업데이트
      const networkState = await NetInfo.fetch();
      console.log("Background Fetch - Network Connected:", networkState.isConnected);
      setNetworkConnected(networkState.isConnected || false);

      // 화면 상태 업데이트 (여기선 true로 하드코딩된 부분을 변경해야 함)
      const isScreenOnNative = true; // ScreenReceiverModule에서 상태 가져오는 로직 추가 필요
      console.log("Background Fetch - Screen Status:", isScreenOnNative ? "ON" : "OFF");
      setScreenStatus(isScreenOnNative ? ScreenStatus.ON : ScreenStatus.OFF);

      // 사용자 상태 업데이트
      updateUserState();

      // 상태 코드에 따라 알림 처리 (useCodeNotification 호출)
      const onNotification = (title: string, body: string) => {
        console.log("Background Fetch - Sending Notification:", title, body);
      };
      useCodeNotification(onNotification); // 상태 코드를 기반으로 알림 트리거
    } catch (error) {
      console.error("Error during background fetch:", error);
    }
  };

  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // 15분 간격으로 실행
      stopOnTerminate: false, // 앱 종료 시에도 실행 유지
      startOnBoot: true, // 디바이스 부팅 시 시작
    },
    async () => {
      console.log("[BackgroundFetch] Fetch event triggered");
      await fetchUpdates();
      BackgroundFetch.finish("new-data"); // 작업 완료
    },
    (error) => {
      console.error("[BackgroundFetch] Failed to configure:", error);
    }
  );

  BackgroundFetch.start(); // BackgroundFetch 시작
  console.log("[BackgroundFetch] Background fetch service started");
};
