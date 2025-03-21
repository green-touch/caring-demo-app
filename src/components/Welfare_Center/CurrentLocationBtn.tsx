import React from "react";
import { TouchableOpacity, Text } from "react-native";
import SvgIcon from "@_components/SvgIcon";


const CurrentLocationBtn = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity
    className="w-full h-[50px] flex-row items-center justify-center bg-main900 mt-4 rounded-lg"
    onPress={onPress}>
          <SvgIcon name="CurrentLocation" size={20} color="white" />
          <Text className="ml-2 text-white text-[16px] font-semibold">
            현재 위치로 찾기
          </Text>
          </TouchableOpacity>
);




export default CurrentLocationBtn;