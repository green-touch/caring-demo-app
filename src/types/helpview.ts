export type RootStackParamList = {
    HelpView1: undefined;
    HelpView2: undefined;
    HelpView3: undefined;
    HelpView4: undefined;
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
      screen:'HelpView1'
    },
    {
      title: 'SOS 구조 요청 버튼을 누르면 \n 어떻게 되나요?',
      bg: 'bg-[#FFF5EA]',
      screen:'HelpView2'
    },
  ];

  export const privacyItems : HelpItem[] = [
    {
      title: '개인정보를 어떻게 바꾸나요?',
      bg: 'bg-yellow-100',
      screen:'HelpView3'
    },
    {
      title: '앱 사용을 중지하고 싶어요!',
      bg: 'bg-red-100',
      screen:'HelpView4'
    },
  ];
