import PlatformSpecificButton from '@_components/PlatformSpecificButton'
import React from 'react'
import { View, Text } from 'react-native'

type LoginButtonProps = {
    onPress: () => void;
}

const LoginButton = ({ onPress }: LoginButtonProps) => {
    return (
        <PlatformSpecificButton onPress={onPress} style='w-full mt-4 h-fit'>
            <View className="w-full bg-main900 rounded-lg py-4 flex items-center justify-center">
                <Text className="text-lg text-gray0 text-center font-bold">로그인</Text>
            </View>
        </PlatformSpecificButton>
    )
}

export default LoginButton