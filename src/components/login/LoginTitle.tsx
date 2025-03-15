import React from 'react'
import { Image } from 'react-native'

const LoginTitle = () => {
    return (
        <Image
            source={require('@_assets/images/img_logo_header.png')}
            style={{ height: 64, width: '100%', resizeMode: 'contain', marginBottom: 40, marginTop: 64 }}
        />
    )
}

export default LoginTitle