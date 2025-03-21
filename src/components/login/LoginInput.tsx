import React from 'react'
import { TextInput } from 'react-native';

type LoginInputProps = {
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    handleInput: (text: string) => void;
}

const LoginInput = ({ placeholder, value, handleInput, secureTextEntry = false }: LoginInputProps) => {
    return (
        <TextInput className="w-full h-fit px-3 py-5 border border-gray40 mt-4 rounded-lg text-lg" placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} onChangeText={handleInput} />
    )
}

export default LoginInput