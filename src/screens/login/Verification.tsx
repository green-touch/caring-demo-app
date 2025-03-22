import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';


import NavigationHeader from '@_components/common/NavigationHeader';
import InfoInput from '@_components/login/InfoInput';
import LoginButton from '@_components/login/LoginButton';
import LoginHelp from '@_components/login/LoginHelp';

import { useVerificationForm, Gender, TelecomItem } from '@_hooks/login/useVerificationForm';
import useLoginNavigation from '@_hooks/login/useLoginNavigation';

const formDataGenders: Gender[] = ['남자', '여자'];
const formDataTelecom: TelecomItem[] = [
    { title: 'KT', hasDropdown: false },
    { title: 'SKT', hasDropdown: false },
    { title: 'LG U+', hasDropdown: false },
    { title: '알뜰폰', hasDropdown: true, dropDownTitle: ['KT', 'SKT', 'LG U+'] },
];

export default function Verification() {

    const { navigation, mode } = useLoginNavigation();

    const {
        genders,
        telecoms,
        selectedGender,
        selectedTelecom,
        showDropdown,
        phoneNumber,
        phoneNumberError,
        verificationCode,
        verificationCodeError,
        isCodeSent,
        isTimeExpired,
        isFormValid,
        handleGenderSelect,
        handleTelecomSelect,
        handleDropdownSelect,
        handlePhoneNumberChange,
        handleVerificationCodeChange,
        handleSendCode,
        handleSubmit,
        timeString,
    } = useVerificationForm({
        genders: formDataGenders,
        telecoms: formDataTelecom,
        correctCode: '123456',
        afterSubmit: () => mode == 'id' ? navigation.navigate('HelpResult', { mode }) : navigation.navigate('ResetPassword', { mode }),
    });

    const isSelected = (itemTitle: string) => {
        if (itemTitle === '알뜰폰') {
            return selectedTelecom?.startsWith('알뜰폰');
        }
        return selectedTelecom === itemTitle;
    };

    const onPressSendCode = () => {
        if (!selectedGender || !selectedTelecom || !phoneNumber || phoneNumberError) {
            Alert.alert('알림', '성별, 통신사, 올바른 전화번호를 입력해주세요.');
            return;
        }
        handleSendCode();
    };

    const onPressSubmit = () => {
        if (!isFormValid) {
            console.log('폼이 유효하지 않습니다.');
        }
        handleSubmit();
    };

    return (
        <SafeAreaView className="flex-1 w-full bg-gray-100">
            <NavigationHeader title="본인인증" />
            <ScrollView className="bg-white w-full h-full px-4 pt-4">
                <Text className="text-2xl font-bold text-gray-900">
                    본인 명의로 된 휴대전화 번호를
                </Text>
                <Text className="text-2xl font-bold text-gray-900 mb-6">
                    입력해주세요!
                </Text>

                <Text className="text-xl text-gray-900 mb-2">성별</Text>
                <View className="flex flex-row w-full gap-4 mb-4">
                    {genders.map((g) => (
                        <TouchableOpacity
                            key={g}
                            className={`px-4 py-3 rounded-lg border flex-1 items-center justify-center ${selectedGender === g ? 'border-main800' : 'border-gray-300'
                                }`}
                            onPress={() => handleGenderSelect(g)}
                        >
                            <Text
                                className={`text-base ${selectedGender === g ? 'text-main800' : 'text-gray-800'
                                    }`}
                            >
                                {g}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="text-xl text-gray-900 mb-2">통신사</Text>
                <View className="flex flex-row w-full gap-3 mb-4">
                    {telecoms.map((item) => (
                        <View key={item.title} className="flex-1 relative">
                            <TouchableOpacity
                                className={`px-4 py-3 rounded-lg border flex-row items-center justify-center ${isSelected(item.title) ? 'border-main800' : 'border-gray-300'
                                    }`}
                                onPress={() => handleTelecomSelect(item)}
                            >
                                <Text
                                    className={`flex-1 text-center text-base ${isSelected(item.title) ? 'text-main800' : 'text-gray-800'
                                        }`}
                                >
                                    {item.title === '알뜰폰' && selectedTelecom?.startsWith('알뜰폰(')
                                        ? selectedTelecom.replace('알뜰폰(', '').replace(')', '')
                                        : item.title}
                                </Text>
                                {item.hasDropdown && (
                                    <Text
                                        className={`${isSelected(item.title) ? 'text-main800' : 'text-gray-800'
                                            }`}
                                    >
                                        {showDropdown ? ' ▲' : ' ▼'}
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {item.hasDropdown && isSelected(item.title) && showDropdown && (
                                <View className="absolute top-full left-0 z-50 w-full border border-gray-300 bg-white rounded-md mt-2 shadow-lg">
                                    {item.dropDownTitle?.map((telOption) => (
                                        <TouchableOpacity
                                            key={telOption}
                                            className="py-2 px-4 border-b border-gray-200 last:border-b-0"
                                            onPress={() => handleDropdownSelect(telOption)}
                                        >
                                            <Text className="text-gray-800 text-center">
                                                {telOption}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View className="mb-4 w-full flex flex-row items-end">
                    <InfoInput
                        label="휴대전화"
                        placeholder="휴대전화 번호 입력"
                        value={phoneNumber}
                        handleInput={handlePhoneNumberChange}
                        error={phoneNumberError}
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                        className={`border-gray90 border-[1px] px-4 py-2 ml-2 h-[50px] rounded-lg items-center justify-center ${phoneNumberError ? 'mb-7' : ''}`}
                        onPress={onPressSendCode}
                    >
                        <Text className="text-gray90 text-lg">인증번호 받기</Text>
                    </TouchableOpacity>
                </View>

                {isCodeSent && (
                    <View className="mb-4">
                        <Text className="text-xl text-gray50 text-left mb-4">
                            인증번호를 발송했습니다. 인증 문자가 오지 않을 경우
                            이름/생년월일/통신사/전화번호 등 입력한 정보가
                            정확한지 또는 스팸문자함을 확인해 주세요.
                        </Text>

                        <View className="relative">
                            <InfoInput
                                label="인증번호"
                                placeholder="인증번호 숫자 6자리 입력"
                                value={verificationCode}
                                handleInput={handleVerificationCodeChange}
                                error={verificationCodeError}
                            />

                            {!isTimeExpired && (
                                <Text className="absolute right-3 top-[48px] text-red-400 text-xl">
                                    {timeString}
                                </Text>
                            )}
                        </View>

                        <Text className="text-red-600 text-xl mt-2 text-left">
                            인증번호를 3분 이내 입력해주세요.
                            제한시간이 지났을 경우 인증번호를 다시 받아 주세요.
                        </Text>
                    </View>
                )}

                <LoginButton
                    buttonTitle="다음"
                    onPress={onPressSubmit}
                    disabled={isFormValid}
                />

                <LoginHelp />
                <View className='h-10'></View>
            </ScrollView>
        </SafeAreaView>
    );
}