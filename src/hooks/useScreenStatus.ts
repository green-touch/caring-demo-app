import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';

enum ScreenStatus {
  ON = "ON",
  OFF = "OFF",
  ERROR = "Error",
}

const { ScreenReceiverModule } = NativeModules;

export const useScreenStatus = (): ScreenStatus | null => {
  const [screenStatus, setScreenStatus] = useState<ScreenStatus>(ScreenStatus.OFF);
  //기본값 스크린 OFF설정

  useEffect(() => {
    const checkScreenStatus = async () => {
      try {
        const isScreenOnNative = await ScreenReceiverModule.isScreenOn();
        setScreenStatus(isScreenOnNative ? ScreenStatus.ON : ScreenStatus.OFF);
      } catch (error) {
        console.error('Error checking screen status:', error);
        setScreenStatus(ScreenStatus.ERROR);
      }
    };

    checkScreenStatus();

    const interval = setInterval(checkScreenStatus, 10000); // 10초마다 
    return () => clearInterval(interval);
  }, []);

  return screenStatus;
};
