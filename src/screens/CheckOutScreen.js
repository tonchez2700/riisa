import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, Alert, View,
    Text, Image
} from 'react-native'
import { Context as RegisterContext } from '../context/RegisterContext';
import { Input, Button, Icon } from 'react-native-elements';
import { CheckOutSchema } from '../config/schemas';
import PhotoTicket from '../components/Modal/PhotoTicket';
import useHandleOnChangeTextInput from '../hooks/useHandleOnChangeTextInput'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';

const CheckOutScreen = (props) => {
    const { route: { params: { id } } } = props
    const [flexWrapper, setFlexWrapper] = useState(true);
    const { state,
        clearState,
        onChangeImagen,
        storeOut } = useContext(RegisterContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(CheckOutSchema)

    const today = new Date();
    const day = moment(today).format('HH:mm:ss')

    return (

        <ScrollView
            nestedScrollEnabled
            style={{ flex: 1, backgroundColor: '#ECECEC' }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <View style={tw`w-full`}>

                <View style={[styles.viewInput]}>
                    <Input
                        rightIcon={<Icon type='font-awesome' name='clock-o' size={25} color='#2D5DA0' />}
                        inputStyle={{ fontSize: 20 }}
                        inputContainerStyle={{
                            borderBottomColor: 'white',
                            borderRadius: 5,
                            paddingTop: 20,
                            height: '4%',
                        }}
                        onChangeText={(value) => handleInputChange(value, 'Ticket')}
                        containerStyle={styles.containerInput}
                        keyboardType='number-pad'
                        label={'Hora'}
                        labelStyle={{ color: '#005691' }}
                        value={day}
                    />
                </View>
                <View style={[styles.viewInput]}>
                    <Input
                        inputStyle={{ fontSize: 20 }}
                        inputContainerStyle={{
                            borderBottomColor: 'white',
                            borderRadius: 5,
                            paddingTop: 20,
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

                <PhotoTicket
                    onCameraStart={(isVisible) => {
                        setFlexWrapper(isVisible)
                    }}
                    onTakePicture={(data) => {
                        onChangeImagen('ticket', data)
                    }}
                />
                <Image
                    source={{ uri: `${state.ticket}` }}
                    accessible={true}
                    style={tw`h-60 my-5`}
                    resizeMode="contain"
                />
                <Button
                    title={'Aceptar'}
                    disabled={inputState.Ticket != '' ? false : true}
                    style={{ alignItems: 'flex-end', justifyContent: "flex-end" }}
                    onPress={() => storeOut(id, inputState, state.ticket)}
                />
            </View>

        </ScrollView>
    )
}

export default CheckOutScreen

const styles = StyleSheet.create({

    viewInput: {
        marginVertical: 16,
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
