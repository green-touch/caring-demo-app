import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

export const useBatteryLevel = (): string => {
  const [batteryLevel, setBatteryLevel] = useState<string>('Loading...');
  //기본 값 loading 으로 설정

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      try {
        const level = await BatteryModule.getBatteryLevel();
        setBatteryLevel(`${level.toFixed(0)}%`);
      } catch (error) {
        console.error('Error fetching battery level:', error);
        setBatteryLevel('Error');
      }
    };

    fetchBatteryLevel();

    const interval = setInterval(fetchBatteryLevel, 5000); // 5초
    return () => clearInterval(interval);
  }, []);

  return batteryLevel;
};
