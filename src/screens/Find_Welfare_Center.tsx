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
  Modal,
} from "react-native";



import GpsModal from "@_components/Welfare_Center/GpsModal";
import GpsStatus from "@_components/main/StatusBoxComponents/GpsStatus";
import SvgIcon from "@_components/SvgIcon";
import Dropdown from "@_components/Welfare_Center/Dropdown";
import CenterList from "@_components/Welfare_Center/CenterList";
import SearchBar from "@_components/Welfare_Center/SerachBar";
import CurrentLocationBtn from "@_components/Welfare_Center/CurrentLocationBtn";
import { WelfareCenter,dummyWelfareCenters,StatusGPSAlertProps} from "@_types/findCenter";  
import { useUserStateStore } from "@_store/userStateStore";



const WelfareCenterScreen = ({ navigation }: any): React.JSX.Element => {
  //const { gpsEnabled } = useUserStateStore();
  const gpsEnabled =true;
  const [centers, setCenters] = useState<WelfareCenter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isGpsPopupVisible, setGpsPopupVisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCenters(dummyWelfareCenters);
      setLoading(false);
    }, 1000);
  }, []);

  const openGPSSettings = () => {
    Linking.openSettings();
  };

  const navigateToDetail = (center: WelfareCenter) => {
    navigation.navigate("Detail");
  };
  const handleCurrentLocationSearch = () => {
    if (!gpsEnabled) {
    
      setGpsPopupVisible(false); 
      setTimeout(() => {
        setGpsPopupVisible(true); 
      }, 10); 
    } 
  };
useEffect(() => {
  if (!gpsEnabled) {
    setGpsPopupVisible(true); 
  }
}, [gpsEnabled]);

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

     
{!isSearching && (
  <View className="px-4 mt-4">
    <Text className="text-gray90 text-[21px] font-bold leading-[31.5px]">
      주민등록상 주소지의 읍·면·동 {"\n"}행정복지센터를 검색해주세요!
    </Text>
  </View>
)}
     
      <GpsModal 
  visible={isGpsPopupVisible} 
  onClose={() => setGpsPopupVisible(false)} 
  onOpenSettings={openGPSSettings} 
/>

<View className="px-4">
  <SearchBar
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    setIsSearching={setIsSearching}
    searchSubmitted={searchSubmitted}
    setSearchSubmitted={setSearchSubmitted}
  />
</View>

{isSearching && searchQuery.length > 0 && (

<Dropdown
  searchQuery={searchQuery}
  filteredCenters={filteredCenters}
  onSelect={(name) => setSearchQuery(name)}
/>
)}

   
   {!isSearching  && searchQuery.length === 0 && (
       <View className="px-4">
       <CurrentLocationBtn onPress={() => console.log("현재 위치 검색")} />
     </View>)}

    {!isSearching&&(
        <>
         
          {!searchSubmitted && (
            <View className="w-full px-4 mt-9 ">
              <Text className="text-black text-[21px] font-bold leading-[31.5px]">
                주변 복지관
              </Text>
            </View>
          )}

       
          {gpsEnabled ? (
            <CenterList centers={filteredCenters} navigation={navigation} />
          ) : (
            <View className="w-full px-4 min-h-[200px] mx-auto items-center justify-center">
              <GpsStatus
                icon="MapFilled"
                title="현재 주변 복지관 정보를 불러올 수 없습니다!"
                description="위치정보서비스(GPS)를 켜면 주변 복지관 정보를 불러올 수 있습니다!"
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default WelfareCenterScreen;