import React from 'react'
import { Text } from 'react-native'

type LoginErrorTextProps = {
    isVisible: boolean;
}

const LoginErrorText = ({ isVisible }: LoginErrorTextProps) => {
    return (
        <Text className={`text-red-700 text-lg ${isVisible ? 'block' : 'hidden'} text-left mt-4 w-full`}>
            회원번호 또는 비밀번호가 맞지 않습니다.{`\n`}
            회원번호와 비밀번호를 정확하게 입력해 주세요.
        </Text>
    )
}

export default LoginErrorText