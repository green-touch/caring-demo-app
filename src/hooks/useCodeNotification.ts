import { useEffect } from "react";
import { useUserStateStore } from "../store/userStateStore";
import { sendNotification } from "../services/sendNotification";

let lastCode: string | null = null; // 마지막 상태 코드
let notificationTimer: NodeJS.Timeout | null = null; // 5분 타이머

export const useCodeNotification = (
  onNotification: (title: string, body: string) => void
) => {
  const { code } = useUserStateStore();

  useEffect(() => {
    const handleNotification = () => {
      // 상태 코드별 메시지 정의
      const notificationMessages: Record<string, { title: string; body: string }> = {
        "NET-02": { title: "네트워크 연결 끊김", body: "네트워크에 연결해주세요. 즉시 네트워크를 연결하세요!" },
        "NET-04": { title: "네트워크 위험 끊김", body: "네트워크 연결이 필요합니다. 즉시 네트워크를 연결하세요!" },
        "BAT-01": { title: "배터리 부족 경고", body: "배터리 잔량이 20% 이하입니다. 즉시 충전기를 연결하세요!" },
        "BAT-02": { title: "배터리 부족 위험", body: "배터리 잔량이 10% 이하입니다. 즉시 충전기를 연결하세요!" },
        "SCR-01": { title: "앱 장기간 미접속 경고", body: "화면이 꺼진 지 1분 이상입니다. 즉시 앱을 이용하세요!" },
        "SCR-02": { title: "앱 장기간 미접속 위험", body: "화면이 꺼진 지 2분 이상입니다. 즉시 앱을 이용하세요!" },
      };

      const message = notificationMessages[code || ""];

      if (message) {
        // Notifee 알림 발송
        sendNotification(message.title, message.body);
      } else {
        console.log("알 수 없는 상태 코드:", code);
      }
    };

    if (code && code !== lastCode) {
      console.log("새로운 코드가 감지되었습니다:", code);
      lastCode = code; // 현재 코드 저장

      // 중복 방지 및 알림 발송
      handleNotification();

      // 이전 타이머 제거
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }

      // 동일 코드 알림 반복 설정 (5분 간격)
      notificationTimer = setInterval(() => {
        console.log("5분 경과: 동일 코드로 알림 다시 발송");
        handleNotification();
      }, 5 * 60 * 1000); // 5분
    } else if (!code) {
      console.log("코드가 null로 초기화되었습니다.");
      lastCode = null;

      // 타이머 제거
      if (notificationTimer) {
        clearInterval(notificationTimer);
        notificationTimer = null;
      }
    }
  }, [code, onNotification]);
};
