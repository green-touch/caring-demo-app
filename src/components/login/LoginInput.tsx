import React from 'react'
import { TextInput, TextInputProps } from 'react-native';


type LoginInputProps = {
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    handleInput: (text: string) => void;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
    testID?: string;
} & Omit<TextInputProps, 'placeholder' | 'value' | 'secureTextEntry' | 'onChangeText' | 'keyboardType'>;

const LoginInput = ({ placeholder, value, handleInput, secureTextEntry = false, keyboardType = 'default', testID, ...rest }: LoginInputProps) => {
    return (
        <TextInput
            className="w-full h-fit px-3 py-5 border border-gray40 mt-4 rounded-lg text-lg"
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={handleInput}
            keyboardType={keyboardType}
            testID={testID || `input-${placeholder}`}
            accessibilityLabel={placeholder}
            {...rest}
        />
    )
}

export default LoginInput