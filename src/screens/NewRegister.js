import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements'
import DateRange from '../components/DateRange';
import StepStatus from '../components/StepStatus';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import DropdownSelect from '../components/DropdownSelect';
import tw from 'tailwind-react-native-classnames'

import moment from 'moment'

const NewRegister = () => {

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
                <View style={tw`mb-7`}>
                    <StepStatus />
                </View>
                <Text style={tw`text-lg mb-5`}>Datos del Estudiante</Text>
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Email</Text>
                <Input
                    inputStyle={tw`text-left`}
                    disabled={true}
                    // value={state.data[0].initial_date}
                    labelStyle={{ color: '#133C60' }}
                    multiline={true}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Teléfono</Text>
                <Input
                    inputStyle={tw`text-left`}
                    disabled={true}
                    // value={state.data[0].initial_date}
                    labelStyle={{ color: '#133C60' }}
                    multiline={false}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Nombre(s)</Text>
                <Input
                    inputStyle={tw`text-left`}
                    disabled={true}
                    // value={state.data[0].initial_date}
                    labelStyle={{ color: '#133C60' }}
                    multiline={false}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Apedillo(s)</Text>
                <Input
                    inputStyle={tw`text-left`}
                    disabled={true}
                    // value={state.data[0].initial_date}
                    labelStyle={{ color: '#133C60' }}
                    multiline={false}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Cuidad</Text>
                <DropdownSelect
                    data={countries}
                    type={'Cuidad'}
                />
                <Text style={[tw` text-base my-5 font-bold`, { color: '#133C60' }]}>Fecha de nacimiento</Text>
                <DateRange
                    titleDate="Fecha de nacimiento"
                // onChangeDate={(date) => {
                //     handleInputChange(date, 'date')
                // }}
                // onChangeTime={(time) => {
                //     handleInputChange(time, 'time')
                // }}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Género</Text>
                <DropdownSelect
                    data={countries}
                    type={'Genero'}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Ocupación</Text>
                <DropdownSelect
                    data={countries}
                    type={'Ocupacion'}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Medio de Origen</Text>
                <DropdownSelect
                    data={countries}
                    type={'Medio de Origen'}
                />
                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold  `}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                    //onPress={() => toggleModalVisibility()}
                    /><Button
                        titleStyle={tw`text-base font-bold `}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Siguiente"
                        onPress={() => navigation.navigate('NewRegisterStep2')}
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

export default NewRegister

const styles = StyleSheet.create({})
