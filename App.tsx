/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect ,useState} from 'react';
import type { PropsWithChildren } from 'react';
import './src/styles/global.css';
import tw from 'tailwind-react-native-classnames';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';
import { useUserStateStore } from './src/store/userStateStore';
import { useScreenStatus } from './src/hooks/useScreenStatus';
import { useBatteryStatus } from './src/hooks/useBatteryStatus';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useCodeNotification } from './src/hooks/useCodeNotification';
import PopupNotification from './src/test';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

const registerNotificationChannel = async () => {
  try {
    const channelId = await notifee.createChannel({
      id: 'network-alerts',
      name: '네트워크 알림',
      importance: AndroidImportance.HIGH,
    });
    console.log(`Notification channel registered: ${channelId}`);
  } catch (error) {
    console.error('Error registering notification channel:', error);
  }
};

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={tw`text-3xl font-black text-red-600`}>{title}</Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    batteryStatus,
    screenStatus,
    networkConnected,
    userState,
    code,
  } = useUserStateStore();

  // Zustand 상태 업데이트 훅 호출
  useScreenStatus();
  useBatteryStatus();
  useNetworkStatus();
  useCodeNotification();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 팝업 상태 관리
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', body: '' });

  // 앱 실행 시 알림 채널 등록
  useEffect(() => {
    console.log('Registering notification channel...');
    registerNotificationChannel();
  }, []);

  // 팝업 표시 함수
  const showPopup = (title: string, body: string) => {
    setPopupData({ title, body });
    setPopupVisible(true);

    // 10초 후 자동 닫기
    setTimeout(() => {
      setPopupVisible(false);
    }, 10000);
  };
// Zustand 상태 업데이트 훅 호출
useScreenStatus();
useBatteryStatus();
useNetworkStatus();

// useCodeNotification 훅 호출
useCodeNotification(showPopup);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Screen Status">
            <Text style={tw`text-xl font-bold text-blue-600`}>
              Screen Status: {screenStatus}
            </Text>
          </Section>

          {/* Battery Status */}
          <Section title="Battery Level">
            <Text style={tw`text-xl font-bold text-green-600`}>
              Battery Level: {batteryStatus.level}%
            </Text>
            <Text style={tw`text-lg text-gray-600`}>
              Charging: {batteryStatus.isCharging ? 'Yes' : 'No'}
            </Text>
          </Section>

          {/* Network Status */}
          <Section title="Network Status">
            <Text style={tw`text-xl font-bold text-red-600`}>
              Network Connected: {networkConnected ? 'Yes' : 'No'}
            </Text>
          </Section>

          {/* User State */}
          <Section title="User State">
            <Text style={tw`text-xl font-bold text-purple-600`}>
              Current User State: {userState}
            </Text>
            {code && (
              <Text style={tw`text-lg text-gray-600`}>
                , Status Code: {code}
              </Text>
            )}
          </Section>

          <LearnMoreLinks />
        </View>
      </ScrollView>

      {/* 팝업 컴포넌트 */}
      <PopupNotification
        title={popupData.title}
        body={popupData.body}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
