import { useEffect } from "react";
import { useUserStateStore } from "../store/userStateStore";
import { sendNotification } from "../services/sendNotification";

export const useCodeNotification = (showPopup: (title: string, body: string) => void) => {
  const { code } = useUserStateStore(); // Zustand에서 상태 코드 가져오기

  useEffect(() => {
    console.log("Current code in useCodeNotification:", code); // 디버깅용 로그

    if (code) {
      console.log("Sending notification for code:", code);

      // 상태 코드에 따라 상단 알림과 팝업 처리
      sendNotification(code, showPopup); // 팝업 표시 함수 전달
    }
  }, [code]); // code 변경 감지
};
