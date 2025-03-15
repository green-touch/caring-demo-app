import { LoginScreenProps } from '@_types/bottomBar'
import React, { Fragment } from 'react'
import { SafeAreaView, Image, TextInput, Button, View, Text, TouchableOpacity } from 'react-native'
import SvgIcon from '@_components/SvgIcon';
import PlatformSpecificButton from '@_components/PlatformSpecificButton';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    return (
        <SafeAreaView className="flex flex-1 h-full w-full px-8 bg-gray1 items-center justify-center">

            <Image className="w-fit mb-10" source={require('@_assets/images/img_logo_header.png')} />
            <TextInput className="w-full h-fit px-3 py-5 border border-gray40 mt-4 rounded-lg text-lg" placeholder="회원번호" />
            <TextInput className="w-full h-fit px-3 py-5 border border-gray40 mt-4 rounded-lg text-lg" placeholder="비밀번호" />
            <View className='flex flex-row items-center mt-4 w-full justify-start gap-1'>
                <SvgIcon name="RadioChecked" />
                <Text className='text-lg text-gray90'>로그인 상태 유지</Text>
            </View>

            <PlatformSpecificButton onPress={() => { }} style='w-full mt-4 h-fit'>
                <View className="w-full bg-main900 rounded-lg py-4 flex items-center justify-center">
                    <Text className="text-lg text-gray0 text-center font-bold">로그인</Text>
                </View>
            </PlatformSpecificButton>

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
            <TouchableOpacity className='flex flex-row items-center justify-center bg-gray5 rounded-lg p-6 mt-8'>
                <View className='flex-1 flex-col items-center justify-start gap-1'>
                    <Text className='text-gray90 text-lg text-left w-full'>도움이 필요하신가요?</Text>
                    <View className='h-fit flex flex-row items-center justify-start gap-1 w-full'>
                        <Text className='text-main600 text-base text-left font-bold'>복지관에 문의하기</Text>
                        <SvgIcon name="ChevronRightBlue" />
                    </View>
                </View>
                <SvgIcon name="Contact" />
            </TouchableOpacity>

        </SafeAreaView >
    )
}

export default LoginScreen