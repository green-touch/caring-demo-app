import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SvgIcon from '@_components/SvgIcon';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '@_types/authStack';

type HeaderProps = {
    title: string;
    navigateTo?: keyof AuthStackParamList;
}
const NavigationHeader = ({ title, navigateTo }: HeaderProps) => {

    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
        <View className="w-full h-16 bg-white shadow-md border-b-[1px] border-gray10">
            <TouchableOpacity className="absolute left-4 h-16 flex justify-center" onPress={() => navigateTo ? navigation.navigate(navigateTo) : navigation.goBack()}>
                <SvgIcon name="Back" />
            </TouchableOpacity>
            <Text className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-gray100">
                {title}
            </Text>
        </View>
    );
};

export default NavigationHeader