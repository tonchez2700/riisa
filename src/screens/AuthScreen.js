import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import InputForm from '../components/forms/InputForm'
import ButtonFrom from '../components/forms/ButtonFrom'
import { useFormik } from 'formik'
import { AuthSchema } from '../config/schemas'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
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

    const renderContent = () => {
        return (
            <Svg
                width={500}
                height={324}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
                    fill="url(#prefix__paint0_linear_103:6)"
                    fillOpacity={0.5}
                />
                <Path
                    d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
                    fill="url(#prefix__paint1_linear_103:6)"
                />
                <Defs>
                    <LinearGradient
                        id="prefix__paint0_linear_103:6"
                        x1={492.715}
                        y1={231.205}
                        x2={480.057}
                        y2={364.215}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#133C60" />
                        <Stop offset={1} stopColor="#133C60" />
                    </LinearGradient>
                    <LinearGradient
                        id="prefix__paint1_linear_103:6"
                        x1={7.304}
                        y1={4.155}
                        x2={144.016}
                        y2={422.041}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#FFB677" />
                        <Stop offset={1} stopColor="#133C60" />
                    </LinearGradient>
                </Defs>
            </Svg>
        )
    }
    return (
        <View style={tw`p-5`}>
            <View style={tw`h-full items-center`}>
                <View style={styles.containerSVG}>
                    {renderContent()}
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>AAM Rondines</Text>
                    <Text style={styles.subtitle}>Iniciar sesión</Text>

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
                    <ButtonFrom handleSubmit={handleSubmit} loading={state.fetchingData ? true : false} />

                    <StatusBar style="auto" />
                </View>
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
        </View >
    )
}

export default AuthScreen


const styles = StyleSheet.create({
    //Estilo del main
    mainContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1,
    },
    //contenedor
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    //SVG
    containerSVG: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    //titulo
    title: {
        fontSize: 50,
        color: '#34434D',
        fontWeight: 'bold'
    },
    //subtitulos
    subtitle: {
        fontSize: 20,
        color: 'gray',
    },
    button: {
        marginTop: 60,
        padding: 15,
        width: '50%',
        height: 50,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#FF3CBD'
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    }
});
