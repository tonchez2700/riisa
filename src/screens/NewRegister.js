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
    const { state, clearState, handleInputChange, getStudentbyEmail, getCatalog, store } = useContext(NewRegisterContext);

    useEffect(() => {
        getCatalog()
        clearState()
    }, []);
    const getContent = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <HeadTitleScreen title='Nuevo Registro' />
                <View style={tw`mb-7`}>
                    <StepStatus
                        number={0}
                    />
                </View>
                <Text style={tw`text-lg mb-5`}>Datos del Estudiante</Text>
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Email<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
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
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Teléfono<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'phone')}
                    value={state.dataFrom?.phone}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Nombre(s)<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'name')}
                    value={state.dataFrom?.name}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Apedillo(P)<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'paternal_surname')}
                    value={state.dataFrom?.paternal_surname}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Apedillo(M)<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <Input
                    inputStyle={tw`text-left`}
                    onChangeText={(value) => handleInputChange(value, 'maternal_surname')}
                    value={state.dataFrom?.maternal_surname}
                    labelStyle={{ color: '#133C60' }}
                />
                <Text style={[tw` text-base mb-1 font-bold`, { color: '#133C60' }]}>Cuidad<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <DropD
                    data={state.cities}
                    type={'Cuidad'}
                    value={state.dataFrom?.city_id}
                    fun={(item) =>
                        handleInputChange(item, 'city_id')}
                />
                <Text style={[tw` text-base my-5 font-bold`, { color: '#133C60' }]}>Fecha de nacimiento<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <DateRange
                    titleDate="Fecha de nacimiento"
                    placeholder={'Fecha de nacimiento'}
                    onChangeDate={(date) => {
                        handleInputChange(moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'), 'birthdate')
                    }}
                />
                <Text style={[tw` text-base my-1 font-bold`, { color: '#133C60' }]}>Género<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <DropD
                    data={state.genders}
                    type={'Género'}
                    value={state.dataFrom?.gender_id}
                    fun={(item) => handleInputChange(item, 'gender_id')}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Ocupación<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <DropD
                    data={state.jobs}
                    type={'Ocupación'}
                    value={state.dataFrom?.job_id}
                    fun={(item) => handleInputChange(item, 'job_id')}
                />
                <Text style={[tw` text-base my-2 font-bold`, { color: '#133C60' }]}>Medio de Origen<Text style={[tw` text-sm`, { color: 'red' }]}>*</Text></Text>
                <DropD
                    data={state.media_origins}
                    type={'Medio de Origen'}
                    value={state.dataFrom?.media_origin_id}
                    fun={(item) => handleInputChange(item, 'media_origin_id')}
                />
                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold  `}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                        onPress={() => {
                            navigation.navigate('HomeScreen')
                        }
                        }
                    /><Button
                        titleStyle={tw`text-base font-bold `}
                        loading={state.fetchingData ? true : false}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Siguiente"
                        onPress={() => store(state.dataFrom)}
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