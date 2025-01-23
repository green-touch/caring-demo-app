import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useUserStateStore } from "../store/userStateStore";

export const useNetworkStatus = () => {
  const { setNetworkConnected } = useUserStateStore(); // Zustand 상태 업데이트 함수

  useEffect(() => {
    // 네트워크 상태 변경 이벤트구 독
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnected(state.isConnected || false);
    });

    return () => {
      // 이벤트 리스너 정리
      unsubscribe();
    };
  }, [setNetworkConnected]);
};
