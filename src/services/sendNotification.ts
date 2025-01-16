import notifee, { AndroidImportance } from "@notifee/react-native";

export const sendNotification = async (
  code: string,
  showPopup?: (title: string, body: string) => void
) => {
  // 상태 코드별 메시지 매핑
  const notificationMessages: Record<string, { title: string; body: string }> = {
    "NET-02": { title: "네트워크 연결 끊김", body: "네트워크에 연결해주세요." },
    "NET-04": { title: "네트워크 위험 끊김", body: "네트워크에 연결해주세요." },
    "BAT-01": { title: "배터리 부족 경고", body: "배터리 잔량이 20% 이하입니다. 충전기를 연결해주세요." },
    "BAT-02": { title: "배터리 부족 위험", body: "배터리 잔량이 10% 이하입니다. 즉시 충전해주세요!" },
    "SCR-01": { title: "앱 장기간 미접속 경고", body: "화면이 N분 이상 꺼져 있습니다. 확인해주세요." },
    "SCR-02": { title: "앱 장기간 미접속 위험", body: "화면이 N분 이상 꺼져 있으며, 위험 상태입니다!" },
  };

  const message = notificationMessages[code];

  if (!message) {
    console.log("Unknown code:", code);
    return;
  }

  const { title, body } = message;

  console.log("Notification Details", { title, body });

  // 팝업 표시
  if (showPopup) {
    showPopup(title, body);
  }

  // 상단 알림 전송
  try {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: "network-alerts", // 알림 채널 ID
        smallIcon: "logo_symbol",
        importance: AndroidImportance.HIGH, // 중요도
      },
    });
    console.log("Notification displayed successfully!");
  } catch (error) {
    console.error("Error displaying notification:", error);
  }
};
