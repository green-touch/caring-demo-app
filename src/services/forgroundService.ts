import notifee, { AndroidImportance } from '@notifee/react-native';

// 포그라운드 서비스 시작
export const startForegroundService = async () => {
  try {
    console.log('포그라운드 서비스 시작 중...');

    // 알림 채널 생성
    const channelId = await notifee.createChannel({
      id: 'foreground-service', // 채널 ID
      name: 'Foreground Service', // 채널 이름
      importance: AndroidImportance.HIGH, // 알림 중요도 설정
    });

    console.log(`알림 채널 생성 완료: ${channelId}`);

    // 포그라운드 서비스 알림 표시
    await notifee.displayNotification({
      title: 'Tracking Service 실행 중',
      body: 'Tracking Service가 현재 실행 중입니다.',
      android: {
        channelId, // 생성된 채널 ID 사용
        asForegroundService: true, // 포그라운드 서비스 활성화
        smallIcon: 'ic_launcher', // 작은 아이콘
        color: '#4caf50', // 알림 색상
        ongoing: true, // 알림을 제거할 수 없도록 설정
      },
    });

    console.log('포그라운드 서비스가 성공적으로 시작되었습니다.');
  } catch (error) {
    console.error('포그라운드 서비스 시작 실패:', error);
  }
};

// 포그라운드 서비스 중지
export const stopForegroundService = async () => {
  try {
    console.log('포그라운드 서비스 중지 중...');
    await notifee.stopForegroundService(); // 포그라운드 서비스 중지
    console.log('포그라운드 서비스가 성공적으로 중지되었습니다.');
  } catch (error) {
    console.error('포그라운드 서비스 중지 실패:', error);
  }
};
