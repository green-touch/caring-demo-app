import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SvgIcon from '@_components/SvgIcon'

const LoginOptions = () => {
    return (
        <View className='w-full flex flex-row items-center justify-between mt-8'>
            <TouchableOpacity className='flex-1 flex flex-row items-center justify-center gap-2'>
                <SvgIcon name="Account" />
                <Text className='text-lg text-gray70'>회원번호 찾기</Text>
            </TouchableOpacity>
            <View className='h-full border-[0.5px] border-gray20 my-1'>

            </View>
            <TouchableOpacity className='flex-1 flex flex-row items-center justify-center gap-2'>
                <SvgIcon name="Lock" />
                <Text className='text-lg text-gray70'>비밀번호 찾기</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginOptions