import React from 'react';
import {WelfareCenter} from "@_types/findCenter";
import SvgIcon from '@_components/SvgIcon';
import { View, Text, Image, TouchableOpacity,ScrollView } from "react-native";


const CenterList = ({ centers, navigation }: any) => (
    <ScrollView className="px-4 mt-7">
      {centers.map((center: WelfareCenter) => (
        <View key={center.id} className="w-full bg-white px-4 py-3 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-black text-[16px] font-bold">{center.name}</Text>
              <View className="flex-row items-center mt-1">
                <SvgIcon name="MapFilled" size={14} color="#9E9E9E" />
                <Text className="ml-2 text-gray-500 text-[14px]">{center.distance}m  {center.address}</Text>
              </View>
              <Text className="text-[#2D5F9F] text-[15px] mt-1">{center.phone}</Text>
            </View>
            <Image source={require("@_assets/images/img_center_list.png")} className="w-[64px] h-[64px]" />
          </View>
          <TouchableOpacity
            className="w-full h-[50px] flex-row items-center justify-center bg-main50 mt-4 rounded-lg"
            onPress={() => navigation.navigate("Detail")}
          >
            <SvgIcon name="PhoneFilledBlue" size={20} color="main900" />
            <Text className="ml-2 text-main900 text-[16px] font-semibold">전화걸기</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  export default CenterList;