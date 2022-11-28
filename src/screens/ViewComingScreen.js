import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView,
    Text, Image
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as RegisterContext } from '../context/RegisterContext';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ViewComingScreen = (props) => {

    const { route: { params: { ticket, created_at, updated_at, buy_pictures } } } = props
    const navigation = useNavigation();
    const { state,
        clearState,
        setFetchingList,
        handleInputChange } = useContext(RegisterContext);

    return (

        <View style={{ flex: 1, backgroundColor: '#ECECEC' }}>
            <ScrollView>
                <Text style={{ fontSize: 50, fontWeight: 'bold', margin: 10, textAlign: 'center', color: '#2D5DA0' }}>Registro</Text>
                <View style={[tw`mx-2`, { alignItems: 'flex-start', width: '50%' }]}>
                    <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>
                    <Text style={{ fontWeight: '400' }}>{state.data[0]?.supplier_rom.name}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Teléfono:</Text>
                    <Text style={{ fontWeight: '400' }}>{state.data[0]?.supplier_rom.phone}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Contacto: </Text>
                    <Text style={{ fontWeight: '400' }}>{state.data[0]?.supplier_rom.contact}</Text>
                    <Text style={{ fontWeight: 'bold' }}>RFC: </Text>
                    <Text style={{ fontWeight: '400' }}>{state.data[0]?.supplier_rom.rfc}</Text>
                </View>
                <View style={[tw`my-6 flex-row`, { justifyContent: 'space-between', width: '100%' }]}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Entrada</Text>
                        <Text style={{ fontWeight: 'bold' }}>{moment(created_at).format('YYYY-MM-DD')}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Salida</Text>
                        <Text style={{ fontWeight: 'bold' }}>{moment(updated_at).format('YYYY-MM-DD')}</Text>
                    </View>
                </View>
                <View>
                    {
                        buy_pictures.map((e) => {
                            return (

                                <View key={e.id} style={[tw`flex-col my-2`, { borderBottomColor: 'gray', borderWidth: 1, backgroundColor: 'white' }]}>
                                    <Image
                                        accessible={true}
                                        style={tw`h-60`}
                                        resizeMode="contain"
                                        source={{ uri: `http://10.1.2.207/dev-suppliers/${e.url}` }}
                                    />
                                </View>

                            );
                        })
                    }
                </View>
            </ScrollView>
        </View >
    )
}

export default ViewComingScreen

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
        width: '25%',
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: '#2D5DA0',
        color: 'white',
        borderBottomWidth: 1
    },
    TextTableItems: {
        flex: 1,
        width: '25%',
        fontSize: 13,
        padding: 10,
        fontWeight: 'bold',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
