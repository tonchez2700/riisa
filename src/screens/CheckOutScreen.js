import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, Alert, View,
    Text, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Context as RegisterContext } from '../context/RegisterContext';
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements';
import { CheckOutSchema } from '../config/schemas';
import useHandleOnChangeTextInput from '../hooks/useHandleOnChangeTextInput'
import tw from 'tailwind-react-native-classnames'
import DateRange from '../components/DateRange';

const CheckOutScreen = (props) => {
    const { route: { params: { id } } } = props

    const { state,
        clearState, storeOut } = useContext(RegisterContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(CheckOutSchema)

    return (

        <ScrollView
            nestedScrollEnabled
            style={{ flex: 1, backgroundColor: '#ECECEC'}}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <View style={tw`w-full`}>

                <View style={[styles.viewInput]}>
                    <DateRange
                        titleTime="Hora de salida"
                        onChangeTime={(time) => {
                            handleInputChange(time, 'time')
                        }}
                    />
                </View>
                <View style={[styles.viewInput]}>
                    <Input
                        inputStyle={{ fontSize: 20 }}
                        inputContainerStyle={{
                            borderBottomColor: 'white',
                            borderRadius: 5,
                            marginTop: 5,
                            height: '4%',
                        }}
                        onChangeText={(value) => handleInputChange(value, 'Ticket')}
                        containerStyle={styles.containerInput}
                        keyboardType='number-pad'
                        label={'No. Ticket'}
                        labelStyle={{ color: '#005691', marginBottom: 10, }}
                        placeholder="No. Ticket"
                        value={inputState.Ticket}
                    />
                </View>
                <Button
                    title={'Aceptar'}
                    disabled={inputState.Ticket != '' ? false : true}
                    style={{ alignItems: 'flex-end', justifyContent: "flex-end" }}
                    onPress={() => storeOut(id, inputState)}
                />
            </View>

        </ScrollView>
    )
}

export default CheckOutScreen

const styles = StyleSheet.create({

    viewInput: {
        marginVertical: 20,
        marginHorizontal: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
    },
    containerInput: {
        paddingLeft: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
})
