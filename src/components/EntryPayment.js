import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const EntryPayment = ({ data, TotalCost }) => {
    const navigation = useNavigation();
    const pepe = 444

    return (

        <View>
            {
                data.map((item) =>
                    <View>
                        <View style={[tw`flex-row items-start py-2`, { borderBottomWidth: 1 }]}>
                            <Text style={[tw` text-sm w-5/12 pl-2`]}>{item.promess_date}</Text>
                            <Text style={[tw` text-sm  w-5/12 mr-2 mb-1`]}>Pago Inicial</Text>
                            <Text style={[tw` text-sm  w-1/3 mr-2 mb-1`]}>${item.amount}</Text>
                        </View>
                    </View>
                )}
            {
                TotalCost != ''
                ?
                <View style={tw`items-end flex-col`}>
                    <Text style={[tw`text-sm  text-right`]}>Subtotal: ${TotalCost}</Text>
                    <Text style={[tw`text-sm  text-right`]}>IVA: $0</Text>
                    <Text style={[tw`text-sm  text-right`]}>Total: ${TotalCost}</Text>
                </View>
                :
                null
            }
        </View>
    )
}

export default EntryPayment

const styles = StyleSheet.create({})
