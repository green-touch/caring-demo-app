import { PermissionsAndroid, Platform } from 'react-native';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: '알림 권한 요청',
          message: '앱에서 알림을 보내려면 권한이 필요합니다.',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('알림 권한이 허용되었습니다.');
      } else {
        console.log('알림 권한이 거부되었습니다.');
      }
    } catch (err) {
      console.warn('알림 권한 요청 중 오류 발생:', err);
    }
  }
};
