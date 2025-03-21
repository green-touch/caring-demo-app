import PlatformSpecificButton from '@_components/PlatformSpecificButton'
import React from 'react'
import { View, Text } from 'react-native'

type LoginButtonProps = {
    buttonTitle: string;
    disabled?: boolean;
    onPress: () => void;
}

const LoginButton = ({ buttonTitle, disabled = true, onPress }: LoginButtonProps) => {
    return (
        <PlatformSpecificButton onPress={onPress} style='w-full mt-4 h-fit'>
            <View className={`w-full ${disabled ? "bg-main900" : "bg-gray10"} rounded-lg py-4 flex items-center justify-center`}>
                <Text className="text-lg text-gray0 text-center font-bold">{buttonTitle}</Text>
            </View>
        </PlatformSpecificButton>
    )
}

export default LoginButton