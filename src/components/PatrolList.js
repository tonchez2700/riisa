import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Context as PatrolsListContext } from '../context/PatrolsListContext';
import { Context as PointsListContext } from '../context/PointsListContext';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';


const PatrolList = ({ data }) => {

    const { state: statePatrol, setRonda } = useContext(PatrolsListContext)
    const { state, setPatrol } = useContext(PointsListContext)
    const navigation = useNavigation();

    return (
        <View style={tw`mt-1`}>

            <View style={tw`flex-row`}>

                <Text style={[tw` flex-auto w-64 text-lg text-center border `, { backgroundColor: "#001F42", color: "white" }]}>NOMBRE</Text>
                <Text style={[tw`flex-auto w-32 text-lg text-center  border`, { backgroundColor: "#001F42", color: "white" }]}>ACCIONES</Text>
            </View>
            {
                data.map((item) => {
                
                    return (
                        <View
                            key={item.id}
                            style={[tw`flex-row bg-gray-200`, {
                                borderColor: 'gray',
                                borderTopWidth: 0.2,
                                backgroundColor: "#E2F0FF",
                                color: "white"
                            }]} >
                            <View style={tw`flex-row  `}>
                                <Text style={[tw`flex-auto w-64 text-lg text-center p-2`, {
                                    borderColor: 'gray',
                                    borderRightWidth: 0.2,
                                    color: "black"
                                }]}>{item.nombre}</Text>
                                <TouchableOpacity
                                    style={tw`p-2`}
                                    onPress={() =>  setRonda(item.id) }>
                                    <Icon
                                        style={{paddingLeft: 22}}
                                        size={35}
                                        name='directions-run'
                                        type='material'
                                        color='#000000' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            }
        </View >
    )
}

export default PatrolList

const styles = StyleSheet.create({});