/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
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
  AppState,
  NativeModules,
  NativeEventEmitter,
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
import { useCodeNotification } from './src/hooks/useCodeNotification';
import { requestNotificationPermission } from './src/services/requestNotificationPermission';
import { registerNotificationChannel } from './src/services/registerChannel';
import { startTrackingService,stopTrackingService } from './src/services/TrackingService';
import { startForegroundService,stopForegroundService } from './src/services/forgroundService';
const {TrackingServiceModule}= NativeModules;
import notifee from '@notifee/react-native';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

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
  const { batteryStatus, screenStatus, networkConnected, userState, code } =
    useUserStateStore();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 초기 설정 (채널 등록 및 권한 요청)
  useEffect(() => {
    const initializeNotifications = async () => {
      await registerNotificationChannel();
      await requestNotificationPermission();
    };
    initializeNotifications();
  }, []);

  // 상태 업데이트를 위한 훅 호출
  useScreenStatus();
  useBatteryStatus();
  useNetworkStatus();

  useCodeNotification((title, body) => {
    console.log("알림이 발생했습니다:", title, body); // 추가 작업 처리
  });

// // NativeEventEmitter 추가
// useEffect(() => {
//   const eventEmitter = new NativeEventEmitter(TrackingServiceModule);

//   const subscription = eventEmitter.addListener('onBackgroundUpdate', (data) => {
//     console.log('Received event from TrackingService:', data);
//     // 여기서 Zustand 상태 업데이트 또는 추가 작업 수행
//     const parsedData = JSON.parse(data);
//     console.log('Parsed data:', parsedData);
//   });

//   return () => {
//     subscription.remove(); // 이벤트 리스너 정리
//   };
// }, []);

useEffect(() => {
  const handleAppStateChange = async (nextAppState :string) => {
    try {
      if (nextAppState === 'background') {
        console.log('앱이 백그라운드로 전환되었습니다.');
        await startForegroundService();
      } else if (nextAppState === 'active') {
        console.log('앱이 포그라운드로 전환되었습니다.');
        await notifee.stopForegroundService();
      }
    } catch (error) {
      console.error('AppState change error:', error);
    }
  };

  const subscription = AppState.addEventListener('change', handleAppStateChange);

  return () => {
    subscription.remove();
  };
}, []);


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

