import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements'
import DateRange from '../components/DateRange';
import StepStatus from '../components/StepStatus';
import ModalPayment from '../components/Modal/ModalPayment';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import DropdownSelect from '../components/DropdownSelect';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

const NewRegisterStep4 = () => {

    const navigation = useNavigation();
    const countries = [
        'Egypt',
        'Canada',
        'Australia',
        'Ireland',
        'Brazil',
        'England',
        'Dubai',
        'France',
        'Germany',
        'Saudi Arabia',
        'Argentina',
        'India',
    ];


    const getContent = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <HeadTitleScreen title='Nuevo Registro' />
                <View style={tw`mb-4`}>
                    <StepStatus />
                </View>
                <Text style={[tw`text-lg`]}>Datos generales</Text>
                <View  style={[tw`my-2`]}>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Nombre: <Text style={[tw` text-xs font-medium`, { color: 'black' }]}>Miguel Zuniga</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Email: <Text style={[tw` text-xs font-medium`, { color: 'black' }]}>miguel@zunit.mx</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Telefono: <Text style={[tw` text-xs font-medium`, { color: 'black' }]}>8121213828</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Campaña: <Text style={[tw` text-xs font-medium`, { color: 'black' }]}>12</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Cuidad: <Text style={[tw` text-xs font-medium`, { color: 'black' }]}>Monterrey</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Fecha de nacimiento: <Text style={[tw` text-xs font-medium`, { color: 'black' }]}>12\12\2012</Text></Text>
                </View>

                <Text style={[tw`text-xl my-2 py-4`,{borderColor: '#2D5DA0', borderTopWidth : 1.5}]}>Programas Educativos</Text>

                <View style={tw`flex-row items-start my-2`}>
                    <Text style={[tw` text-sm w-9/12 text-white pl-2`, styles.itemsT]}>Items:</Text>
                    <Text style={[tw` text-sm w-60 text-white pl-2`, styles.itemsT]}>Monto</Text>
                </View>

                <Text style={tw`text-xl my-2`}>Desglose de Pagos</Text>
                <View style={tw`flex-row items-start my-2`}>
                    <Text style={[tw` text-sm w-9/12 text-white pl-2`, styles.itemsT]}>Items:</Text>
                    <Text style={[tw` text-sm w-60 text-white pl-2`, styles.itemsT]}>Monto</Text>
                </View>
                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold`}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                    //onPress={() => toggleModalVisibility()}
                    /><Button
                        titleStyle={tw`text-base font-bold `}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Confirmar"
                    //onPress={() => navigation.navigate('NewRegisterStep2')}
                    />

                </View>
            </ScrollView>
        );
    }
    return (
        <View>
            {

                getContent()

            }
        </View>
    )
}

export default NewRegisterStep4

const styles = StyleSheet.create({

    itemsT: {
        backgroundColor: '#2D5DA0',
        color: 'white'
    },

})
