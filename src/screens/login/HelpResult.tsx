import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { InfoType } from '@_types/findInfo';

import NavigationHeader from '@_components/common/NavigationHeader'
import SvgIcon from '@_components/SvgIcon';
import LoginButton from '@_components/login/LoginButton';
import useLoginNavigation from '@_hooks/login/useLoginNavigation';

const resultConfig: Record<InfoType, any> = {
    'id': {
        title: '회원번호 찾기',
        subTitle: ['회원번호 찾기가', '완료되었습니다.'],
        resultDetail: ['의 회원번호'],
    },
    'password': {
        title: '비밀번호 찾기',
        subTitle: ['비밀번호가 성공적으로', '변경되었습니다.'],
        resultDetail: ['로그인 화면으로 돌아가', '새로운 비밀번호로 로그인해 주세요.']
    }
}

const 샘플회원번호 = '1234567890'

const HelpResult = () => {

    const { navigation, mode } = useLoginNavigation();

    return (
        <SafeAreaView className="flex-1 w-full bg-gray-100">
            <NavigationHeader title={resultConfig[mode].title} />
            <View className='w-full h-full flex bg-white items-center justify-start pt-[30px] px-4'>
                <SvgIcon name="CheckRoundBlue" />
                <Text className='text-2xl font-bold text-gray90 text-center mt-2'>{resultConfig[mode].subTitle.join('\n')}</Text>
                <View className={`flex flex-col w-full items-center justify-center mt-6 mb-8 bg-gray5 pt-6 ${mode === 'id' ? 'pb-6' : 'pb-0'}`}>
                    {/*추후 회원 조회 API로 회원번호 조회가 가능해지면 조회 추가*/}
                    <Text className='text-xl text-gray90 text-center w-full'>{resultConfig[mode].resultDetail.join('\n')}</Text>
                    {mode === 'id' && <Text className='text-main600 text-2xl font-bold'>{샘플회원번호}</Text>}
                    {
                        mode === 'id' &&
                        <View className='flex flex-row items-center justify-center mt-6 border-t-[1px] py-6 border-gray30 gap-1'>
                            <SvgIcon name='Copy' />
                            <Text className='text-base text-gray70 text-bold'>회원번호 복사하기</Text>
                        </View>
                    }
                </View>
                <LoginButton buttonTitle='로그인 하러가기' onPress={() => navigation.navigate('LoginMain')} />
            </View>
        </SafeAreaView>
    )
}

export default HelpResult