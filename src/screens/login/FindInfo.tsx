import React, { useCallback, useReducer } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

import useLoginNavigation from '@_hooks/login/useLoginNavigation';

import { InfoType } from '@_types/findInfo';

import NavigationHeader from '@_components/common/NavigationHeader';
import InfoInput from '@_components/login/InfoInput';
import LoginButton from '@_components/login/LoginButton';
import LoginHelp from '@_components/login/LoginHelp';

const infoTypeData: Record<InfoType, { title: string }> = {
    id: { title: "회원번호" },
    password: { title: "비밀번호" },
};

type State = {
    membershipNumber: string;
    name: string;
    birth: string;
    errors: {
        membershipNumber?: string;
        name?: string;
        birth?: string;
    };
};

type Action =
    | { type: 'SET_VALUE'; field: keyof Omit<State, 'errors'>; value: string }
    | { type: 'SET_ERROR'; field: keyof State['errors']; value: string | undefined };

const initialState: State = {
    membershipNumber: '',
    name: '',
    birth: '',
    errors: {},
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_VALUE':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.field]: action.value } };
        default:
            return state;
    }
};


const FindInfo = () => {
    const { navigation, mode } = useLoginNavigation();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = useCallback((field: keyof Omit<State, 'errors'>, value: string) => {
        dispatch({ type: 'SET_VALUE', field, value });
    }, []);

    const validateFields = useCallback(() => {
        let hasError = false;
        if (mode === 'password' && !state.membershipNumber.trim()) {
            dispatch({ type: 'SET_ERROR', field: 'membershipNumber', value: '회원번호를 입력해주세요.' });
            hasError = true;
        } else {
            dispatch({ type: 'SET_ERROR', field: 'membershipNumber', value: undefined });
        }
        if (!state.name.trim()) {
            dispatch({ type: 'SET_ERROR', field: 'name', value: '이름을 입력해주세요.' });
            hasError = true;
        } else {
            dispatch({ type: 'SET_ERROR', field: 'name', value: undefined });
        }
        if (!state.birth.trim()) {
            dispatch({ type: 'SET_ERROR', field: 'birth', value: '생년월일을 입력해주세요.' });
            hasError = true;
        } else {
            dispatch({ type: 'SET_ERROR', field: 'birth', value: undefined });
        }
        return !hasError;
    }, [mode, state]);

    const handleNext = useCallback(() => {
        if (validateFields()) {
            navigation.navigate('Verification', { mode });
        }
    }, [validateFields, navigation, mode]);

    return (
        <SafeAreaView className="flex h-full w-full bg-gray1 items-center justify-start">
            <NavigationHeader title="본인인증" />
            <View className="flex pt-8 px-4 items-center justify-start w-full bg-white h-full">
                <Text className="flex justify-start w-full font-bold text-gray90 text-2xl text-left">
                    {`${infoTypeData[mode].title}를 찾기 위해`}
                </Text>
                <Text className="flex justify-start w-full font-bold text-gray90 text-2xl text-left mb-10">
                    필요한 정보를 입력해주세요!
                </Text>
                {mode === 'password' && (
                    <InfoInput
                        label="회원번호"
                        placeholder="회원번호를 입력해주세요"
                        value={state.membershipNumber}
                        handleInput={(text) => handleInputChange('membershipNumber', text)}
                        error={state.errors.membershipNumber}
                    />
                )}
                {mode === 'password' && <View className="h-6" />}
                <InfoInput
                    label="이름"
                    placeholder="이름을 입력해주세요"
                    value={state.name}
                    handleInput={(text) => handleInputChange('name', text)}
                    error={state.errors.name}
                />
                <View className="h-6" />
                <InfoInput
                    label="생년월일"
                    placeholder="YYYY.MM.DD"
                    value={state.birth}
                    handleInput={(text) => handleInputChange('birth', text)}
                    sublabel="생년월일을 8자리로 입력해 주세요."
                    error={state.errors.birth}
                />
                <View className="h-8" />
                <LoginButton buttonTitle="다음" disabled={!(!state.name.trim() || !state.birth.trim() || (mode === 'password' && !state.membershipNumber.trim()))} onPress={handleNext} />
                <LoginHelp />
            </View>
        </SafeAreaView>
    );
};

export default FindInfo;