import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, FlatList
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as RegisterContext } from '../context/RegisterContext';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {

    const navigation = useNavigation();
    const { state,
        clearState,
        setListOut,
        setFetchingList,
        ViewComing,
        handleInputChange } = useContext(RegisterContext);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (state.orderNum != null) {
                setListOut(state.orderNum)
            } 
        });
        return unsubscribe;
    }, [navigation]);


    console.log(state.orderNum);
    return (
        <View style={{ flex: 1, backgroundColor: '#ECECEC' }}>
            <View style={[tw`mt-3 flex-row`]}>
                <Input
                    rightIcon={
                        <TouchableOpacity onPress={() => setListOut(state.orderNum)}>
                            <Icon type='font-awesome-5' name='search' size={25} color='#2D5DA0' />
                        </TouchableOpacity>
                    }
                    inputStyle={[tw`ml-3 text-sm`, { width: '100%' }]}
                    inputContainerStyle={[tw`border pl-2 rounded-md`, { backgroundColor: 'white', width: '100%' }]}
                    containerStyle={{ backgroundColor: '#ECECEC' }}
                    onChangeText={(value) => handleInputChange(value, 'orderNum')}
                    labelStyle={{ color: '#133C60' }}
                    placeholder="BUSCAR ORDEN DE COMPRA"
                    value={state.orderNum}
                />
            </View>
            <View style={[tw`items-end mb-2`, { backgroundColor: 'white' }]}>
                {
                    state.data != ''
                        ?
                        <View style={tw`flex-col  justify-between p-5`}>

                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={{ width: '30%', color: '#23233C', fontWeight: 'bold' }}>Folio:</Text>
                                <Text style={{ textAlign: 'left', width: '70%' }}>{state.data[0]?.folio}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={{ width: '30%', color: '#23233C', fontWeight: 'bold' }}>Nombre:</Text>
                                <Text style={{ textAlign: 'left', width: '70%' }}>{state.data[0]?.supplier_rom.name}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={{ width: '30%', color: '#23233C', fontWeight: 'bold' }}>Teléfono:</Text>
                                <Text style={{ textAlign: 'left', width: '70%' }}>{state.data[0]?.supplier_rom.phone}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={{ width: '30%', color: '#23233C', fontWeight: 'bold' }}>Contacto:</Text>
                                <Text style={{ textAlign: 'left', width: '70%' }}>{state.data[0]?.supplier_rom.contact}</Text>
                            </View>
                            <View style={[tw`flex-row`, { marginVertical: 1 }]}>
                                <Text style={{ width: '30%', color: '#23233C', fontWeight: 'bold' }}>RFC:</Text>
                                <Text style={{ textAlign: 'left', width: '70%' }}>{state.data[0]?.supplier_rom.rfc}</Text>
                            </View>
                        </View>
                        :
                        null
                }
            </View>
            {
                state.data != ''
                    ?
                    <View style={[tw`flex-col p-2 `]}>
                        <View style={[tw` justify-between flex-row `]}>
                            <Button
                                titleStyle={tw`text-base font-bold  `}
                                containerStyle={{ width: '45%' }}
                                buttonStyle={[{ backgroundColor: '#2D5DA0' }]}
                                title="Ver Registros"
                                onPress={() => setFetchingList(state.orderNum)}
                            />
                            <Button
                                titleStyle={tw`text-base font-bold  `}
                                containerStyle={{ width: '45%' }}
                                buttonStyle={[{ backgroundColor: '#067A52' }]}
                                title="Nueva Entrada"
                                onPress={() => navigation.navigate('NewRegister', state.data[0].folio)}
                            />
                        </View>
                    </View>
                    :
                    null
            }
            <View style={[tw` flex-row justify-between`, { width: '100%', marginTop: 10 }]}>
                <Text style={[styles.TextTable, { width: '25%' }]}>Folio</Text>
                <Text style={[styles.TextTable, { width: '50%' }]}>Fecha</Text>
                <Text style={[styles.TextTable, { width: '25%' }]}>Accion</Text>
            </View>

            {state.data != ''
                ?
                <FlatList
                    data={state.data}
                    initialNumToRender={3}
                    updateCellsBatchingPeriod={50}
                    keyExtractor={item => item.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => console.log('load more')}
                    renderItem={({ item, index, separators }) =>
                    (
                        item.buy_comings.map((e) => {
                            return (
                                <View key={e.id} style={[tw`flex-row`, { backgroundColor: 'white' }]}>
                                    <Text style={[styles.TextTableItems, { width: '25%' }]}>{e.id}</Text>
                                    <Text style={[styles.TextTableItems, { width: '50%' }]}>{moment(e.created_at).format('DD-MM-YYYY / hh:mm')}</Text>
                                    <View style={[tw`flex-row `, {
                                        width: '25%', borderBottomColor: '#E6E6E6',
                                        borderBottomWidth: 1
                                    }]}>
                                        <TouchableOpacity onPress={() => ViewComing(e.id)}>
                                            <Icon type='font-awesome' name='camera' size={20} color='#2D5DA0' style={{ padding: 10, }} />
                                        </TouchableOpacity>
                                        {
                                            e.ticket != null
                                                ?
                                                null
                                                :
                                                <TouchableOpacity onPress={() => navigation.navigate('CheckOutScreen', e)}>
                                                    <Icon type='font-awesome-5' name='arrow-circle-right' size={20} color='#EE3232' style={{ padding: 10, }} />
                                                </TouchableOpacity>
                                        }
                                    </View>
                                </View>

                            );
                        })
                    )
                    }
                />
                :
                <Text style={tw`text-red-800 mb-3 text-center border border-red-300 bg-red-200 p-3`}>No hay entradas</Text>
            }
        </View >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    iconBtn: {
        backgroundColor: '#2D5DA0'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 20,
    },
    TextTable: {
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: '#2D5DA0',
        color: 'white',
        borderBottomWidth: 1
    },
    TextTableItems: {
        fontSize: 13,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
