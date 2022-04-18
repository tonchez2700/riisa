import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const HeadTitleScreen = ({ title }) => {
    return (
        <View>
            <Text style={[ tw`font-bold text-2xl text-center mt-3 mb-7`, { color: '#FFAD00' } ]}>{title}</Text>
        </View>
    )
}

export default HeadTitleScreen

