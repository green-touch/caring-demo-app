import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useUserStateStore } from "../store/userStateStore";

export const useNetworkStatus = () => {
  const { setNetworkConnected } = useUserStateStore(); // Zustand 상태 업데이트 함수

  useEffect(() => {
    // 네트워크 상태 초기화
    const fetchNetworkStatus = async () => {
      const state = await NetInfo.fetch();
      setNetworkConnected(state.isConnected || false); // Zustand 상태 업데이트
    };

    // 주기적으로 상태 업데이트
    const interval = setInterval(fetchNetworkStatus, 5000); // 5초마다 확인

    // 초기 상태 가져오기
    fetchNetworkStatus();

    // 클린업 함수
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [setNetworkConnected]); // 의존성에 setNetworkConnected 포함
};
