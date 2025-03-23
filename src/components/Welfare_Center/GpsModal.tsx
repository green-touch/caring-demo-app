import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import SvgIcon from "@_components/SvgIcon";

const GpsModal = ({ visible, onClose, onOpenSettings }: any) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-[328px] h-[376px] bg-white px-[12px] py-[16px] items-center justify-center">
      
          <TouchableOpacity className="absolute top-4 right-4" onPress={onClose}>
            <SvgIcon name="Close" size={24} color="black" />
          </TouchableOpacity>

    
          <Text className="text-black text-[25px] font-bold text-center">
            현재 주변 복지관 정보를{"\n"}불러올 수 없습니다!
          </Text>
          <View className="w-[296px] h-[139px] bg-gray5 rounded-lg px-[17px] py-[24px] mt-4">
            <Text className="text-main900 text-[19px] text-center mt-4">
              위치정보서비스(GPS)를 켜면{"\n"}주변 복지관 정보를 불러올 수 있습니다!
            </Text>
          </View>

      
          <TouchableOpacity
            className="w-full h-[50px] flex-row items-center justify-center bg-main900 mt-6 rounded-lg"
            onPress={onOpenSettings}
          >
            <Text className="text-white text-[16px] font-semibold">GPS 켜러 가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GpsModal;
