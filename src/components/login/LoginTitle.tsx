import React from 'react'
import { Image } from 'react-native'

const LoginTitle = () => {
    return (
        <Image
            source={require('@_assets/images/img_logo_header.png')}
            className="h-16 w-full mt-16 mb-10"
            style={{ resizeMode: 'contain' }}
            accessibilityLabel="로그인 로고"
            accessibilityRole="image"
        />
    )
}

export default LoginTitle