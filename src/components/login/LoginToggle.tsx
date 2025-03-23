import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import SvgIcon from '@_components/SvgIcon';

type LoginToggleProps = {
    //로그인 상태를 유지할 것인지 여부
    로그인유지: boolean;
    onPress: () => void;
}

const LoginToggle = ({ 로그인유지, onPress }: LoginToggleProps) => {
    return (
        <TouchableOpacity className='flex flex-row items-center mt-4 w-full justify-start gap-2' onPress={onPress}>
            <SvgIcon name={로그인유지 ? "RadioChecked" : "RadioDefault"} />
            <Text className='text-lg text-gray90'>로그인 상태 유지</Text>
        </TouchableOpacity>
    )
}

export default LoginToggle