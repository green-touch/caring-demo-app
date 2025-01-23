import notifee, { AndroidImportance,AndroidVisibility } from "@notifee/react-native";

export const registerNotificationChannel = async () => {
  try {
    const channelId = await notifee.createChannel({
      id: "network-alerts", // 채널 ID
      name: "Network Alerts", // 채널 이름
      importance: AndroidImportance.HIGH, // 중요도 설정
      visibility: AndroidVisibility.PUBLIC, //잠금에서 알림 전체 표시
    });
    console.log(`Notification channel registered: ${channelId}`);
  } catch (error) {
    console.error("Failed to register notification channel:", error);
  }
};
