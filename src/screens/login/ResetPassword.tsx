import React from 'react'
import { SafeAreaView } from 'react-native'

import NavigationHeader from '@_components/common/NavigationHeader'
type Props = {}

const ResetPassword = (props: Props) => {
    return (
        <SafeAreaView className="flex-1 w-full bg-gray-100">
            <NavigationHeader title="본인인증" />
        </SafeAreaView>
    )
}

export default ResetPassword