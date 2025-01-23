import NetInfo from "@react-native-community/netinfo";

// 단발성 네트워크 상태 가져오는 함수
export const fetchNetworkStatus = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch(); // 네트워크 상태 가져오기
    console.log("Fetching Network Status:", state.isConnected ? "Connected" : "Disconnected");
    return state.isConnected || false;
  } catch (error) {
    console.error("Error fetching network status:", error);
    return false;
  }
};
