import notifee, { AndroidImportance,AndroidVisibility } from "@notifee/react-native";

export const registerNotificationChannel = async () => {
  try {
    const channelId = await notifee.createChannel({
      id: "network-alerts", // 채널 ID
      name: "Network Alerts", // 채널 이름
      importance: AndroidImportance.HIGH, // 중요도 설정
      visibility: AndroidVisibility.PUBLIC, //잠금에서 알림 전체 표시
    });
    console.log(`알림 채널이 등록: ${channelId}`);
  } catch (error) {
    console.error("알림 채널 등록 실패:", error);
  }
};
