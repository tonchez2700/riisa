import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const MenuItem = ({ title, icon, fontFamily, navigateScreen }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate(navigateScreen)} 
            style={tw`p-7 bg-white shadow-md rounded-md w-9/12 mt-3 mb-3`}>
                <Icon
                    name={icon}
                    type={fontFamily}
                    color='#fcad00' />
                <Text style={tw`text-black uppercase font-bold text-lg text-center mt-3`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MenuItem
