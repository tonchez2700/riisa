import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const EntryList = (data) => {
    const navigation = useNavigation();
    const pepe = '6545'
    return (
        data.data.map((item) =>
            <View key={item.id} style={tw`flex-col items-start`}>
                <Text style={tw`text-xs pl-2`}>DIPLOMADO-{item.campaign}</Text>

                <View style={tw`flex-row items-start`}>
                    <Text style={[tw` text-sm w-9/12 pl-2`]}>{item.educationalProgram}:</Text>
                    <Text style={[tw` text-sm w-60 pl-2`]}>${pepe}</Text>
                </View>
            </View>
        )

    )
}

export default EntryList

const styles = StyleSheet.create({})
