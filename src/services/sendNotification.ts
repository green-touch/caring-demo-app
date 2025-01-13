import notifee,{AndroidImportance} from "@notifee/react-native";

export const sendNotification = async (code: string) => {
  let title = "";
  let body = "";

  switch (code) {
    case "NET-02": // 네트워크 경고
      title = "네트워크 연결 끊김";
      body = "네트워크에 연결해주세요.";
      break;

    case "NET-04": // 네트워크 위험
      title = "네트워크 위험 끊김";
      body = "네트워크에 연결해주세요.";
      break;

    case "BAT-01": // 배터리 경고
      title = "배터리 부족 경고";
      body = "배터리 잔량이 20% 이하입니다. 충전기를 연결해주세요.";
      break;

    case "BAT-02": // 배터리 위험
      title = "배터리 부족 위험";
      body = "배터리 잔량이 10% 이하입니다. 즉시 충전해주세요!";
      break;

    case "SCR-01": // 화면 꺼짐 경고
      title = "앱 장기간 미접속 경고";
      body = "화면이 N분 이상 꺼져 있습니다. 확인해주세요.";
      break;

    case "SCR-02": // 화면 꺼짐 위험
      title = "앱 장기간 미접속 위험";
      body = "화면이 N분 이상 꺼져 있으며, 위험 상태입니다!";
      break;

    default:
      console.log("Unknown code:", code);
      return;
  }

    console.log("Notification Detatils", {title,body});
    // 알림 전송
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
      console.log("Notification displayed successfully!"); // 디버깅용 로그
    } catch (error) {
      console.error("Error displaying notification:", error);
    }
  };