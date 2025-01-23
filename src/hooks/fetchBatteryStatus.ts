import DeviceInfo from "react-native-device-info";

// 배터리 상태 가져오는 함수
export const fetchBatteryStatus = async () => {
  try {
    const isCharging = await DeviceInfo.isBatteryCharging();
    const level = await DeviceInfo.getBatteryLevel();
    const batteryLevel = Math.round(level * 100);

    console.log("Fetching Battery Status:", batteryLevel, isCharging);
    return { level: batteryLevel, isCharging };
  } catch (error) {
    console.error("Error fetching battery status:", error);
    return { level: 0, isCharging: false };
  }
};
