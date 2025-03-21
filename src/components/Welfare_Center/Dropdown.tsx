import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SvgIcon from "@_components/SvgIcon";
import { WelfareCenter } from "@_types/findCenter";

interface DropdownProps {
  searchQuery: string;
  filteredCenters: WelfareCenter[];
  onSelect: (name: string) => void;
}

const Dropdown = ({ searchQuery, filteredCenters, onSelect }: DropdownProps) => {
  if (searchQuery.length === 0) return null;

  return (
    <View className="relative px-4 mt-4 bg-white max-h-[300px] overflow-y-auto z-50">
      {filteredCenters.length > 0 ? (
        filteredCenters.map((center) => (
          <TouchableOpacity
            key={center.id}
            className="flex-row items-center px-4 py-4 border-b border-gray-200"
            onPress={() => onSelect(center.name)}
          >
            <View className="flex-row items-start py-3">
              <View className="items-center mr-10">
                <SvgIcon name="MapFilled" size={24} color="#9E9E9E" />
                <Text className="text-gray70 text-[14px] ">{center.distance}m</Text>
              </View>

              {/* 복지관 정보 */}
              <View className="flex-1">
                <Text className="text-black text-[16px] font-bold mb-2">{center.name}</Text>
                <Text className="text-gray50 text-[14px]">{center.address}</Text>
              </View>
              <SvgIcon name="ChevronRightGray" size={32} color="gray" className="absolute right-4 top-1/2 -translate-y-1/2" />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="p-4">
          <Text className="text-gray-500">검색 결과가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
