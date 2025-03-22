import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

import NavigationHeader from '@_components/common/NavigationHeader';
import InfoInput from '@_components/login/InfoInput';
import LoginButton from '@_components/login/LoginButton';
import LoginHelp from '@_components/login/LoginHelp';
import SvgIcon from '@_components/SvgIcon';

import { useResetPassword } from '@_hooks/login/useResetPassword';

const CautionList = [
    '• 최소 B8자리 이상B 입력해야 합니다.',
    '• B영문/숫자B를 사용해야 합니다.',
    '• B문자B는 B사용 불가B합니다.',
];

function ResetPassword() {
    const {
        password,
        confirm,
        passwordError,
        confirmError,
        showPw,
        showConfirmPw,
        handlePassword,
        handleConfirm,
        clearPassword,
        clearConfirm,
        togglePasswordView,
        toggleConfirmView,
        isDisabled,
        handleSubmit,
    } = useResetPassword();

    return (
        <SafeAreaView className="flex-1 w-full bg-white">
            <NavigationHeader title="비밀번호 변경" />
            <Text className="flex justify-start w-full font-bold text-gray90 text-2xl text-left whitespace-pre-wrap px-4 py-8">
                새롭게 사용할 비밀번호를 입력해주세요
            </Text>

            {CautionList.map((line, i) => {
                const parts = line.split(/B(.*?)B/);
                return (
                    <Text key={i} className="text-base text-gray90 flex flex-row flex-wrap px-4">
                        {parts.map((part, idx) => {
                            const isHighlighted = idx % 2 === 1;
                            return (
                                <Text
                                    key={idx}
                                    className={isHighlighted ? 'text-main700 font-bold' : 'text-gray90'}
                                >
                                    {part}
                                </Text>
                            );
                        })}
                    </Text>
                );
            })}

            <View className="relative px-4 mb-6 mt-10">
                <InfoInput
                    secureTextEntry={!showPw}
                    label="새 비밀번호"
                    placeholder="영문, 숫자 8자 이상 입력"
                    value={password}
                    handleInput={handlePassword}
                    error={passwordError}
                />
                <View className="absolute right-8 top-[48px] flex flex-row items-center gap-1">
                    <TouchableOpacity onPress={togglePasswordView}>
                        <SvgIcon name={showPw ? 'EyeRemove' : 'EyeRemove'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearPassword}>
                        <SvgIcon name="RemoveRound" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="relative px-4 mb-8">
                <InfoInput
                    secureTextEntry={!showConfirmPw}
                    label="새 비밀번호 확인"
                    placeholder="영문, 숫자 8자 이상 입력"
                    value={confirm}
                    handleInput={handleConfirm}
                    error={confirmError}
                />
                <View className="absolute right-8 top-[48px] flex flex-row items-center gap-1">
                    <TouchableOpacity onPress={toggleConfirmView}>
                        <SvgIcon name={showConfirmPw ? 'EyeRemove' : 'EyeRemove'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearConfirm}>
                        <SvgIcon name="RemoveRound" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="px-4">
                <LoginButton buttonTitle="확인" onPress={handleSubmit} disabled={!isDisabled} />
                <LoginHelp />
            </View>
        </SafeAreaView>
    );
}

export default ResetPassword;