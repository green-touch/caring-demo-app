import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { sendNotification } from './src/services/sendNotification';
import { fetchBatteryStatus } from './src/hooks/fetchBatteryStatus';
import { fetchScreenStatus } from './src/hooks/fetchScreenStatus';
import { fetchNetworkStatus } from './src/hooks/fetchNetworkStatus';
import { useUserStateStore } from './src/store/userStateStore';
const backgroundTask = async () => {
  console.log('[Headless JS] 백그라운드 작업 시작');
  const userStateStore = useUserStateStore.getState();
  // 상태 가져오기
  const screenStatus = await fetchScreenStatus();
  const batteryStatus = await fetchBatteryStatus();
  const networkStatus = await fetchNetworkStatus();
  // Zustand 상태 업데이트
  userStateStore.setScreenStatus(screenStatus);
  userStateStore.setBatteryStatus(batteryStatus.level, batteryStatus.isCharging);
  userStateStore.setNetworkConnected(networkStatus);

  // 사용자 상태 업데이트
  userStateStore.updateUserState();

  // 상태 코드 가져오기
  const code = userStateStore.getState().code;

  // 상태 코드별 알림 메시지 정의
  const notificationMessages={
    "NET-02": { title: "네트워크 연결 끊김", body: "네트워크에 연결해주세요. 즉시 네트워크를 연결하세요!" },
    "NET-04": { title: "네트워크 위험 끊김", body: "네트워크 연결이 필요합니다. 즉시 네트워크를 연결하세요!" },
    "BAT-01": { title: "배터리 부족 경고", body: "배터리 잔량이 20% 이하입니다. 즉시 충전기를 연결하세요!" },
    "BAT-02": { title: "배터리 부족 위험", body: "배터리 잔량이 10% 이하입니다. 즉시 충전기를 연결하세요!" },
    "SCR-01": { title: "앱 장기간 미접속 경고", body: "화면이 꺼진 지 1분 이상입니다. 즉시 앱을 이용하세요!" },
    "SCR-02": { title: "앱 장기간 미접속 위험", body: "화면이 꺼진 지 2분 이상입니다. 즉시 앱을 이용하세요!" },
  };

  // 상태 코드에 따른 알림 전송
  if (code && notificationMessages[code]) {
    const { title, body } = notificationMessages[code];
    sendNotification(title, body);
  } else {
    console.log("알 수 없는 상태 코드:", code);
  }

  console.log('[Headless JS] 백그라운드 작업 종료');
};

// Headless Task 등록
AppRegistry.registerHeadlessTask('BackgroundTask', () => backgroundTask);
AppRegistry.registerComponent(appName, () => App);