import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements'
import { Context as NewRegisterContext } from '../context/NewRegisterContext';
import DateRange from '../components/DateRange';
import StepStatus from '../components/StepStatus';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import DropD from '../components/DropD';
import DropdownSelect from '../components/DropdownSelect';
import tw from 'tailwind-react-native-classnames'

import moment from 'moment'

const NewRegister = () => {

    const navigation = useNavigation();
    const { state, handleInputChange, getStudentbyEmail } = useContext(NewRegisterContext);
    console.log(state.dataFrom);
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
                    rightIcon={
                        <TouchableOpacity
                            onPress={() => getStudentbyEmail(state.dataFrom.email)}>
                            {state.fetchingData
                                ?
                                <ActivityIndicator size="small" color="#0000ff" />
                                :
                                <Icon type='font-awesome' name='search' size={25} color='#133C60' style={{
                                    marginRight: 15
                                }} />}
                        </TouchableOpacity>
                    }
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'email')}
                    value={state.dataFrom?.email}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Teléfono</Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'phone')}
                    value={state.dataFrom?.phone}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Nombre(s)</Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'name')}
                    value={state.dataFrom?.name}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Apedillo(P)</Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'paternal_surname')}
                    value={state.dataFrom?.paternal_surname}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Apedillo(M)</Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'maternal_surname')}
                    value={state.dataFrom?.maternal_surname}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Cuidad</Text>
                <DropD
                    data={state.countries}
                    type={'Cuidad'}
                    value={state.dataFrom?.city}
                    fun={(item) => handleInputChange(item, 'city')}
                />
                <Text style={[tw` text-base my-5 font-bold`, { color: '#133C60' }]}>Fecha de nacimiento</Text>
                <DateRange
                    titleDate="Fecha de nacimiento"
                    onChangeDate={(date) => {
                        console.log(date);
                        handleInputChange(date, 'birthdate')
                    }}
                />
                <Text style={[tw` text-base my-1 font-bold`, { color: '#133C60' }]}>Género</Text>
                <DropD
                    data={state.genders}
                    type={'Genero'}
                    value={state.dataFrom?.gender}
                    fun={(item) => handleInputChange(item, 'gender')}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Ocupación</Text>
                <DropD
                    data={state.jobs}
                    type={'Ocupacion'}
                    value={state.dataFrom?.job}
                    fun={(item) => handleInputChange(item, 'job')}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Medio de Origen</Text>
                <DropD
                    data={state.genders}
                    type={'Medio de Origen'}
                    value={state.dataFrom?.media_origin}
                    fun={(item) => handleInputChange(item, 'media_origin')}
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
                        onPress={() => navigation.navigate('NewRegisterStep2',state.dataFrom )}
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
