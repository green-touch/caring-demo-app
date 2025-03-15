import { LoginScreenProps } from '@_types/bottomBar'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    return (
        <SafeAreaView className="flex flex-1 h-full w-full bg-gray">
            <Text>
                LoginScreen
            </Text>
        </SafeAreaView>
    )
}

export default LoginScreen