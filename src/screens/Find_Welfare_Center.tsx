import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";


import { WelfareCenter } from "@_types/findCenter";  
import { useUserStateStore } from "@_store/userStateStore";

import GpsStatus from "../components/main/StatusBoxComponents/GpsStatus";
import SvgIcon from "@_components/SvgIcon";



// 임시 데이터
const dummyWelfareCenters: WelfareCenter[] = [
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

const WelfareCenterScreen = ({ navigation }: any): React.JSX.Element => {
  const { gpsEnabled } = useUserStateStore();
  const [centers, setCenters] = useState<WelfareCenter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCenters(dummyWelfareCenters);
      setLoading(false);
    }, 1000);
  }, []);

  const navigateToDetail = (center: WelfareCenter) => {
    navigation.navigate("Detail");
  };

  const filteredCenters = centers.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <View className="w-full h-[56px] flex-row items-center justify-between px-4 bg-white border-b border-gray-300">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon name="Back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg text-black">복지관 찾기</Text>
        <View className="w-6" />
      </View>

     {/* 안내 문구 - 검색 중이 아닐 때만 표시 */}
{!isSearching && (
  <View className="px-4 mt-4 mb-10">
    <Text className="text-gray90 text-[21px] font-bold leading-[31.5px]">
      주민등록상 주소지의 읍·면·동 {"\n"}행정복지센터를 검색해주세요!
    </Text>
  </View>
)}
      {/* 검색창 */}
      <View className={`p-4 relative ${isSearching ? "absolute top-0 left-0 right-0 bg-white z-50" : ""}`}>
  <Text className="text-gray90 text-[19px] font-normal leading-[28.5px] mb-2">
    복지관 검색
  </Text>
        <View className="flex-row items-center border border-[#C6C6C6] rounded-lg px-3 py-2 mt-2 bg-white">
          <SvgIcon name="Search" size={20} color="gray" />
          <TextInput
            placeholder="주소 또는 복지관 이름 검색"
            className="ml-2 flex-1 text-[15px]"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)}  
            onBlur={() => {
              if (!searchSubmitted) {
                setIsSearching(false);
              }
            }}
            onSubmitEditing={() => {
              setSearchSubmitted(true);
              setIsSearching(false); 
            }}
          />      
        </View>

        {/* 드롭다운 */}
        {searchQuery.length > 0 && (
  <View className="relative mt-4 bg-white max-h-[300px] overflow-y-auto z-50">
    {filteredCenters.length > 0 ? (
      filteredCenters.map((center) => (
        <TouchableOpacity
          key={center.id}
          className="flex-row items-center px-4 py-4 border-b border-gray-200"
          onPress={() => setSearchQuery(center.name)} 
        >
<View className="flex-row items-start py-3">
  <View className="items-center mr-10">
    <SvgIcon name="MapFilled" size={24} color="#9E9E9E" />
    <Text className="text-gray40 text-[14px] mt-1">{center.distance}m</Text>
  </View>

  {/* 복지관 정보 */}
  <View className="flex-1">
    <Text className="text-black text-[16px] font-bold mb-2">
      {center.name}
    </Text>
    <Text className="text-gray-500 text-[14px]">{center.address}</Text>
  </View>
  <SvgIcon
    name="ChevronRightGray"
    size={32}
    color="gray"
    className="absolute right-4 top-1/2 -translate-y-1/2"
  />
</View>   
                </TouchableOpacity>
              ))
            ) : (
              <View className="p-4">
                <Text className="text-gray-500">검색 결과가 없습니다.</Text>
              </View>
            )}
          </View>
        )}
      </View>
{!isSearching && !searchSubmitted && (
  <View className="w-full px-4 mt-9 mb-7">
    <Text className="text-black text-[21px] font-bold leading-[31.5px]">
      주변 복지관
    </Text>
  </View>
)}
      {/* 복지관 리스트 */}
      <ScrollView className="px-4">
        {filteredCenters.map((center) => (
          <View key={center.id} className="w-full bg-white px-4 py-3 mb-4 ">
            <View className="flex-row items-center justify-between">
  
        <View className="flex-1">
          <Text className="text-black text-[16px] font-bold">{center.name}</Text>
          <View className="flex-row items-center mt-1">
            <SvgIcon name="MapFilled" size={14} color="#9E9E9E" />
            <Text className="ml-1 text-gray-500 text-[14px]">{center.distance}m  {center.address}</Text>
          </View>
          <Text className="text-[#2D5F9F] text-[15px] mt-1">{center.phone}</Text>
        </View>

          
              <Image
                source={require("@_assets/images/img_center_list.png")}
                className="w-[64px] h-[64px] "
              />
            </View>

          
            <TouchableOpacity
              className="w-full h-[50px] flex-row items-center justify-center bg-main50 mt-4 rounded-lg"
            onPress={() => navigation.navigate("Detail")}
            >
              <SvgIcon name="PhoneFilledBlue" size={20} color="main900" />
              <Text className="ml-2 text-main900 text-[16px] font-semibold">
                전화걸기
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WelfareCenterScreen;