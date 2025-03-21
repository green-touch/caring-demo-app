import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import SvgIcon from "@_components/SvgIcon";
import { WelfareCenter } from "@_types/findCenter";  


const WelfareCenterDetail = ({ route, navigation }: any): React.JSX.Element => {
  const { name, address, phone, distance } = route.params || {
    name: "종로 희망 사회 복지관",
    address: "서울 종로구 희망로 희망빌딩",
    phone: "032-123-456",
    distance: 80,
  };

  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <View className="flex-1 bg-white">
 
      <View className="w-full h-[56px] flex-row items-center justify-between px-4 bg-white border-b border-gray-300">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="Back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg text-black">{name}</Text>
        <View className="w-6" />
      </View>

 
      <View className="w-full h-[260px] mx-auto overflow-hidden">
        <Image
          source={require("@_assets/images/img_center_detail.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="w-[328px] h-[64px] bg-white px-4 py-2 flex justify-center">
        <Text className="text-[21px] font-bold text-gray-900">{name}</Text>
      </View>

      {/* 구분선 */}
      <View className="border-b border-gray10 mx-4 mb-1 " />

      {/* 복지관 정보 */}
      <View className="px-4 py-4">
        <View className="flex-row items-start">
  
          <SvgIcon name="MapFilled" size={24} color="gray50"  />
          <View className="flex-1 ml-2">
       
            <Text className="text-[17px] text-gray-900 font-normal leading-[150%]">{address}</Text>
       
            <Text className="text-gray-500 text-[14px] mt-1">현재 위치에서 {distance}m</Text>
          </View>
        </View>
      </View>

      
 
      <View className="flex-row items-center px-4 py-4 mb-4">
        
        <SvgIcon name="PhoneFilled" size={24}  color="main900" />
        <Text className="ml-2 text-black text-[16px]">{phone}</Text>
      </View>
   
      <View className="border-t border-gray-200 mx-4 mt-12" />

      <TouchableOpacity 
        className="w-full max-w-[345px] mx-auto h-[58px] bg-main900 rounded-[8px] mt-6 flex items-center justify-center px-12 py-[16px]" 
        onPress={handleCall} 
      >
        <Text className="text-white text-center text-lg font-semibold">전화걸기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelfareCenterDetail;
