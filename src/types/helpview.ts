export type RootStackParamList = {
  HelpStatusInfo: undefined;
  HelpSOSInfo: undefined;
  HelpPrivacyPolicy: undefined;
  HelpUsageStopGuide: undefined;
};

export type HelpItem = {
    title: string;
    bg: string;
    screen: keyof RootStackParamList;
  };
  
  

  export const serviceItems : HelpItem[] = [
    {
      title: '안전한 상태, 경고 상태,\n위험 상태가 무엇인가요?',
      bg: 'bg-main50',
      screen: 'HelpStatusInfo',
    },
    {
      title: 'SOS 구조 요청 버튼을 누르면 \n 어떻게 되나요?',
      bg: 'bg-[#FFF5EA]',
      screen: 'HelpSOSInfo',
    },
  ];

  export const privacyItems : HelpItem[] = [
    {
      title: '개인정보를 어떻게 바꾸나요?',
      bg: 'bg-yellow-100',
      screen: 'HelpPrivacyPolicy',
    },
    {
      title: '앱 사용을 중지하고 싶어요!',
      bg: 'bg-red-100',
      screen: 'HelpUsageStopGuide',
    },
  ];
