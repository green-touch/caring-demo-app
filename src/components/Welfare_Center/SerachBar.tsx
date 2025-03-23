import React from 'react';
import SvgIcon from '@_components/SvgIcon';
import { View, Text, Image, TouchableOpacity,ScrollView ,TextInput} from "react-native";


const SearchBar = ({
    searchQuery,
    setSearchQuery,
    setIsSearching,
    searchSubmitted,
    setSearchSubmitted,
    onPressCurrentLocation,
  }: any) => (
    <View className="mt-10">  
      <Text className="text-gray90 text-[19px] font-normal  mb-2">복지관 검색</Text>
      <View className="flex-row items-center border border-[#C6C6C6] rounded-lg px-3 py-2 bg-white h-[55px]">
        <SvgIcon name="Search" size={20} color="gray" />
        <TextInput
          placeholder="주소 또는 복지관 이름 검색"
          className="ml-2 flex-1 text-[15px]"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
          onBlur={() => { if (!searchSubmitted) setIsSearching(false); }}
          onSubmitEditing={() => { 
            if (searchQuery.trim().length === 0) {
              setSearchSubmitted(false);
            } else {
              setSearchSubmitted(true);
            }
            setIsSearching(false); }}
        />
      </View>
      
    </View>
  );
  export default SearchBar;
  