import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, Alert, View,
    Text, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Context as RegisterContext } from '../context/RegisterContext';
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import PhotoTools from '../components/Modal/PhotoTools'
import PhotoINE from '../components/Modal/PhotoINE';
import PhotoCar from '../components/Modal/PhotoCar';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import DateRange from '../components/DateRange';

const CheckOutScreen = () => {
    const [flexWrapper, setFlexWrapper] = useState(true);
    const navigation = useNavigation();
    const { state,
        clearState,
        onChangeImagen,
        getImagensOutTools } = useContext(RegisterContext);


    return (

        <ScrollView
            nestedScrollEnabled
            style={{ flex: 1, backgroundColor: '#F5F5F5' }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <View style={tw`w-full`}>

                <View style={[styles.viewInput]}>
                    <DateRange
                        titleTime="Hora de salida"
                        onChangeTime={(time) => {
                            // handleInputChange(time, 'time')
                        }}
                    />
                </View>
                <View style={[styles.viewInput]}>
                    <Input
                        inputStyle={{fontSize: 20}}
                        inputContainerStyle={{
                            borderBottomColor: 'white',
                            borderRadius: 5,
                            marginTop: 5,
                            height: '4%',
                        }}
                        containerStyle={styles.containerInput}
                        label={'No. Ticket'}
                        labelStyle={{ color: '#005691', marginBottom: 10, }}
                        placeholder="No. Ticket"
                    // value={}
                    />
                </View>
                {/* <View>
                    <Input
                        rightIcon={<Icon type='font-awesome-5' name='search' size={25} color='black' />}
                        inputStyle={tw`ml-3 text-sm`}
                        inputContainerStyle={tw`border pl-2 rounded-md`}

                        labelStyle={{ color: '#133C60' }}
                        placeholder="BUSCAR ORDEN DE COMPRA"
                    // value={}
                    />
                </View> */}
                <Button
                    title={'Aceptar'}
                    style={{ alignItems: 'flex-end', justifyContent: "flex-end" }}
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
