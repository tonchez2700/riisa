import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import InputForm from '../components/Forms/InputForm'
import ButtonFrom from '../components/Forms/ButtonFrom'
import { useFormik } from 'formik'
import { AuthSchema } from '../config/schemas'
import { Context as AuthContext} from '../context/AuthContext';
import SimpleNavBar from '../components/SimpleNavBar'

const AuthScreen = () => {
    const { state, signin, clearState } = useContext(AuthContext);
    const { 
        handleChange, 
        handleBlur, 
        handleSubmit, 
        values, 
        errors,
        touched 
    } = useFormik({
        validationSchema: AuthSchema,
        onSubmit: values => signin(values),
        initialValues: { 
            email: '',
            password: '' 
        }
    });
    
    return (
        <View style={tw`h-full items-center`}>
            <ScrollView contentContainerStyle={tw`items-center`}>
            <SimpleNavBar />
            <Text style={[ tw`text-xl mt-10 font-bold`, { color: '#133C60' } ]}>Sistema de registro de Rondines</Text>
            <Text style={[ tw`text-3xl mt-10 font-bold`, { color: '#faad00' } ]}>Bienvenido</Text>
            <Text style={[ tw`text-base mt-2 font-bold`, { color: '#000000' } ]}>Por favor inicie sesión para continuar</Text>
            <View style={tw`w-4/5 mt-8`}>
                <InputForm 
                    label='Correo Electrónico'
                    name='email' 
                    autoCapitalize='none'
                    keyboardType='email-address'
                    handleChange={handleChange}
                    handleBlur={handleBlur} 
                    errors={errors}
                    values={values}
                    touched={touched} />
                <InputForm 
                    label='Contraseña'
                    name='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    password={true}
                    handleChange={handleChange}
                    handleBlur={handleBlur} 
                    errors={errors}
                    values={values}
                    touched={touched} />
                <ButtonFrom handleSubmit={handleSubmit} loading={ state.fetchingData ? true : false } />
            </View>
            {
                state.error === true 
                    ?
                        Alert.alert(
                            "Error de Autentificacion",
                            state.message,
                            [{ 
                                text: "OK", 
                                onPress: clearState
                            }]
                        ) 
                    :
                    null
            }
            </ScrollView>
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
