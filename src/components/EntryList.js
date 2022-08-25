import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const EntryList = ({ data, TotalCost }) => {
    const navigation = useNavigation();
   
    return (

        <View>
            {
                data.map((item) =>
                    <View key={item.campaignSelection.id}>
                        {item.reg_product_type_id == 2
                            ?
                            <View style={[tw`flex-col items-start pb-1`, { borderBottomWidth: .8 }]}>
                                <Text style={tw`text-xs pl-2`}>BENEFICIO-{item.campaignSelection.title}</Text>
                                <View style={tw`flex-row items-center`}>
                                    <View style={tw`flex-row items-start`}>
                                        <Text style={[tw` text-sm w-9/12 pl-2`]}>{item.benefit.title}:</Text>
                                        <Text style={[tw` text-sm  pl-2 mr-2 mb-1`]}>${item.benefit.cost}</Text>
                                    </View>
                                    <Icon type='font-awesome-5' name='trash' size={18} color='red' style={tw`mr-2 mb-2`} />
                                </View>
                            </View>
                            :
                            <View style={[tw`flex-col items-start pb-1`, { borderBottomWidth: .8 }]}>
                                <Text style={tw`text-xs pl-2`}>DIPLOMADO-{item.campaignSelection.title}</Text>
                                <View style={tw`flex-row items-center`}>
                                    <View style={tw`flex-row items-start`}>
                                        <Text style={[tw` text-sm w-9/12 pl-2`]}>{item.educationalProgram.title}:</Text>
                                        <Text style={[tw` text-sm  pl-2 mr-2 mb-1`]}>${item.educationalProgram.cost}</Text>
                                    </View>
                                    <Icon type='font-awesome-5' name='trash' size={18} color='red' style={tw`mr-2 mb-2`} />
                                </View>
                            </View>}
                    </View>
                )}
            {
                TotalCost != ''
                    ?
                    <View style={tw`items-end`}>
                        <Text style={[tw`text-sm w-9/12 pl-2 text-right`]}>Total: ${TotalCost}</Text>

                    </View>
                    :
                    null
            }
        </View>
    )
}

export default EntryList

const styles = StyleSheet.create({})
