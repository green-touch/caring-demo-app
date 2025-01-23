import { NativeModules } from "react-native";

const { TrackingServiceModule } = NativeModules;

// Foreground Service 시작
export const startTrackingService = () => {
  TrackingServiceModule.startService();
};

// Foreground Service 중지
export const stopTrackingService = () => {
  TrackingServiceModule.stopService();
};
