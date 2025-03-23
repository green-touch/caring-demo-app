import React from 'react';
import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';

interface LoginInputProps {
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    handleInput: (text: string) => void;
    label?: string;
    sublabel?: string;
    error?: string;
    style?: StyleProp<ViewStyle>;
}

const InfoInput: React.FC<LoginInputProps> = ({
    placeholder,
    value,
    handleInput,
    secureTextEntry = false,
    label,
    sublabel,
    error,
    style = {},
}) => {
    return (
        <View className="flex justify-start items-start w-full relative" style={style}>
            {label && <Text className="text-xl text-gray100 mb-2">{label}</Text>}
            {sublabel && <Text className="text-lg text-gray70 mb-1">{sublabel}</Text>}

            <TextInput
                className={`w-full h-fit p-3 text-gray100 mt-1 rounded-lg text-lg border ${error ? 'border-red-600' : 'border-gray40'
                    }`}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={handleInput}
                keyboardType="number-pad"
            />

            {error && (
                <Text className="text-red-600 mt-1 text-left text-base">
                    {error}
                </Text>
            )}
        </View>
    );
};

export default InfoInput;