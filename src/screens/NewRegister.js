import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, View, Image,
    Text, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native'
import { Context as RegisterContext } from '../context/RegisterContext';
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import PhotoTools from '../components/Modal/PhotoTools'
import PhotoINE from '../components/Modal/PhotoINE';
import PhotoCar from '../components/Modal/PhotoCar';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

const NewRegister = (props) => {
    const [flexWrapper, setFlexWrapper] = useState(true);
    const navigation = useNavigation();
    const { state,
        clearState,
        onChangeImagen,
        store,
        getImagensOutTools } = useContext(RegisterContext);

    useEffect(() => {
        getImagensOutTools(state.plate, state.car, state.ine)
    }, [state.plate, state.car, state.ine]);


    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <Image
                    accessible={true}
                    style={tw`h-60`}
                    resizeMode="contain"
                    source={{ uri: `${item}` }}
                />
            </View>
        );
    }

    return (

        <ScrollView
            nestedScrollEnabled
            style={{ flex: 1, backgroundColor: '#ECECEC' }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <View style={tw`mt-6 w-full`}>
                <View style={[{ color: '#133C60' }]}>
                    <PhotoTools
                        onCameraStart={(isVisible) => {
                            setFlexWrapper(isVisible)
                        }}
                        onTakePicture={(data) => {
                            onChangeImagen('plate', data)
                        }}
                    />

                </View>
                <View style={[{ color: '#133C60' }]}>
                    <PhotoCar
                        onCameraStart={(isVisible) => {
                            setFlexWrapper(isVisible)
                        }}
                        onTakePicture={(data) => {
                            onChangeImagen('car', data)
                        }}
                    />

                </View>
                <View style={[{ color: '#133C60' }]}>
                    <PhotoINE
                        onCameraStart={(isVisible) => {
                            setFlexWrapper(isVisible)
                        }}
                        onTakePicture={(data) => {
                            onChangeImagen('ine', data)
                        }}
                    />

                </View>

                <Carousel
                    data={state.dataImagen}
                    sliderWidth={300}
                    itemWidth={300}
                    renderItem={_renderItem}
                />
                <Button
                    onPress={() => {
                        store(state.plate, state.car, state.ine, props.route.params, state.orderNum)
                    }}
                    title={'Aceptar'}
                    style={{ alignItems: 'flex-end', justifyContent: "flex-end" }}
                />
            </View>
        </ScrollView>
    )
}

export default NewRegister

const styles = StyleSheet.create({})
