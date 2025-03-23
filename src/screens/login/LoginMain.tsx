import React from 'react'
import { SafeAreaView } from 'react-native'
import { LoginScreenProps } from '@_types/bottomBar'

import { useLoginToggle } from '../../hooks/login/useLoginToggle';

import LoginTitle from '@_components/login/LoginTitle';
import LoginInput from '@_components/login/LoginInput';
import LoginToggle from '@_components/login/LoginToggle';
import LoginErrorText from '@_components/login/LoginErrorText';
import LoginButton from '@_components/login/LoginButton';
import LoginOptions from '@_components/login/LoginOptions';
import LoginHelp from '@_components/login/LoginHelp';
import { useLoginInput } from '@_hooks/login/useLoginInput';
import { useMockError } from '@_hooks/login/useMockError';

const LoginScreen = ({ navigation }: LoginScreenProps) => {

    const { 로그인유지, handleLoginToggle } = useLoginToggle();
    const { 회원번호, 비밀번호, handle회원번호, handle비밀번호 } = useLoginInput();
    const { isError, handleMockError } = useMockError();

    const handleLoginPress = () => {
        if (!회원번호.trim() || !비밀번호.trim()) {
            return;
        }
        if (handleMockError()) {
            return;
        }
        navigation.navigate("SampleHome");
    };

    return (
        <SafeAreaView className="flex flex-1 w-full px-8 bg-white items-center justify-start">
            <LoginTitle />
            <LoginInput placeholder='회원번호' value={회원번호} handleInput={handle회원번호} />
            <LoginInput placeholder='비밀번호' value={비밀번호} handleInput={handle비밀번호} secureTextEntry={true} />
            <LoginToggle 로그인유지={로그인유지} onPress={handleLoginToggle} />
            <LoginErrorText isVisible={isError} />
            <LoginButton buttonTitle='로그인' onPress={handleLoginPress} />
            <LoginOptions />
            <LoginHelp />
        </SafeAreaView >
    )
}

export default LoginScreen