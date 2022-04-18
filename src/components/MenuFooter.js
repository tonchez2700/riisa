import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const MenuFooter = () => {

    const navigation = useNavigation();

    return (
        <View style={tw`flex-row pl-6 pr-6 border-gray-200 border-t bg-white`}>
            <TouchableOpacity 
                style={tw`flex-row flex-grow p-4`} 
                onPress={() => navigation.navigate('QRScannerScreen')}>
                <Icon
                    name='camera'
                    type='font-awesome'
                    color='#808080' />
                <Text style={tw`pl-3`}>Escaner</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={tw`flex-row flex-grow p-4 border-gray-200 border-l`}
                onPress={() => navigation.navigate('ScheduleListScreen')}>
                <Icon
                    name='book'
                    type='font-awesome'
                    color='#808080' />
                <Text style={tw`pl-3`}>Agenda</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuFooter

const styles = StyleSheet.create({})
