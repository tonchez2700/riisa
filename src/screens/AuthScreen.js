import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, ImageBackground } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Images from '@assets/images';
import InputForm from '../components/Forms/InputForm'
import { Icon } from 'react-native-elements'
import ButtonFrom from '../components/Forms/ButtonFrom'
import { useFormik } from 'formik'
import { AuthSchema } from '../config/schemas'
import { Context as AuthContext } from '../context/AuthContext';
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
        <ImageBackground source={Images.background} resizeMode="cover" style={tw`flex-1 items-end flex-row`}>
            <View style={tw`h-full items-center`}>

                <ScrollView contentContainerStyle={tw`items-center`}>

                    <SimpleNavBar />
                    <Text style={[tw`text-3xl mt-10 font-bold`, { color: '#292929' }]}>Bienvenido</Text>
                    <View style={tw`w-4/5 mt-8`}>
                        <InputForm
                            placeholder={'Correo'}
                            name='email'
                            leftIcon={<Icon type='font-awesome' name='envelope' size={25} color='black' style={{ marginRight: 15 }} />}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors}
                            values={values}
                            touched={touched} />
                        <InputForm
                            placeholder={'Contraseña'}
                            name='password'
                            leftIcon={<Icon type='font-awesome' name='lock' size={25} color='black' style={{ marginRight: 26 }} />}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            password={true}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors}
                            values={values}
                            touched={touched} />
                        <ButtonFrom handleSubmit={handleSubmit} loading={state.fetchingData ? true : false} />
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
        </ImageBackground>
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
