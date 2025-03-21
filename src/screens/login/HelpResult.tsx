import NavigationHeader from '@_components/common/NavigationHeader'
import React from 'react'
import { SafeAreaView } from 'react-native'

type Props = {}

const HelpResult = (props: Props) => {
    return (
        <SafeAreaView className="flex-1 w-full bg-gray-100">
            <NavigationHeader title="본인인증" />
        </SafeAreaView>
    )
}

export default HelpResult