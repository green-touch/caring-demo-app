import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import { ScreenStatus, useUserStateStore } from '../store/userStateStore'; // Zustand 상태 가져오기
import type { EmitterSubscription } from 'react-native';
import { requestNotificationPermission } from '../services/requestNotificationPermission';

const { ForegroundServiceModule } = NativeModules;

function TestScreen(): React.JSX.Element {
  const {
    batteryStatus,
    screenStatus,
    networkConnected,
    screenOffDuration,
    userState,
    code,
    setBatteryStatus,
    setScreenStatus,
    setNetworkConnected,
    setScreenOffDuration,
    setUserState,
  } = useUserStateStore();

  const [wasDisconnected, setWasDisconnected] = useState(false); // 네트워크 연결 상태 추적

  // Foreground Service 자동 시작
  useEffect(() => {
    const startForegroundService = async () => {
      try {
        await ForegroundServiceModule.startService();
        console.log('Foreground Service has started!');
      } catch (error) {
        console.error('Error starting service:', error);
      }
    };

    const stopForegroundService = async () => {
      try {
        await ForegroundServiceModule.stopService();
        console.log('Foreground Service has stopped!');
      } catch (error) {
        console.error('Error stopping service:', error);
      }
    };
    requestNotificationPermission();
    startForegroundService();

    return () => {
      stopForegroundService();
    };
  }, []);

  // 이벤트 리스너 등록 및 재설정..콘솔뜨게해보려고 해본 시도
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(ForegroundServiceModule);
    let subscription: EmitterSubscription | null = null;

    const setupListener = () => {
      // 기존 리스너 제거 후 재등록
      if (subscription) {
        subscription.remove();
      }

      subscription = eventEmitter.addListener('UserStateUpdate', (data) => {
        console.log('UserStateUpdate event received:', data);

        // 상태 업데이트 prevState 활용
        setBatteryStatus(
          data.batteryLevel ?? batteryStatus.level,
          data.isCharging ?? batteryStatus.isCharging
        );
  
        setScreenStatus(data.screenStatus ?? screenStatus);
  
        setNetworkConnected(data.networkStatus ?? networkConnected);
  
        setScreenOffDuration(data.screenOffDuration ?? screenOffDuration);
  
        setUserState(
          data.userState ?? userState,
          data.code ?? code
        );

        // 네트워크 상태 변화 로직
        if (!data.networkStatus) {
          if (!wasDisconnected) {
            console.log('Network disconnected, waiting for reconnection...');
            setWasDisconnected(true);
          }
        } else if (wasDisconnected) {
          console.log('Network reconnected! Resuming console logs...');
          setWasDisconnected(false);
        }
      });
    };

    setupListener();

    return () => {
      if (subscription) subscription.remove(); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [
    setBatteryStatus,
    setScreenStatus,
    setNetworkConnected,
    setScreenOffDuration,
    setUserState,
    wasDisconnected,
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foreground Service Demo</Text>
      <View style={styles.statusContainer}>
        <Text>Battery Level: {batteryStatus.level}%</Text>
        <Text>Charging: {batteryStatus.isCharging ? 'Yes' : 'No'}</Text>
        <Text>Screen Status: {screenStatus ? 'Yes' : 'No'}</Text>
        <Text>Network Connected: {networkConnected ? 'Yes' : 'No'}</Text>
        <Text>Screen Off Duration: {Math.floor(screenOffDuration / 1000)}s</Text>
        <Text>User State: {userState}</Text>
        <Text>Code: {code || 'None'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
export default TestScreen;
