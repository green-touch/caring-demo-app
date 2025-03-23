export interface WelfareCenter {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    distance: number;
    image: string;
  }

  export const dummyWelfareCenters: WelfareCenter[] = [
    {
      id: "1",
      name: "종로구 희망 사회 복지관",
      address: "서울 종로구 평창문",
      distance: 890,
      phone: "032-123-456",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      name: "서대문 사회 복지관",
      address: "서울 서대문구 충정로",
      distance: 1200,
      phone: "032-456-789",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      name: "강남 사회 복지관",
      address: "서울 강남구 테헤란로",
      distance: 2500,
      phone: "032-987-654",
      image: "https://via.placeholder.com/100",
    },
  ];
  
  export type StatusGPSAlertProps = {
    icon: string; 
    title: string; 
    description: string; 
  };
  