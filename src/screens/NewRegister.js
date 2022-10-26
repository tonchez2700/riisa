import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements'
import { Context as NewRegisterContext } from '../context/NewRegisterContext';
import PhotoTools from '../components/Modal/PhotoTools'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

const NewRegister = () => {
    const [flexWrapper, setFlexWrapper] = useState(true);
    const navigation = useNavigation();
    const { state,
        clearState } = useContext(NewRegisterContext);

    return (

        <ScrollView
            contentContainerStyle={{ flex: flexWrapper ? 1 : 0 }}
            showsVerticalScrollIndicator={false}>
            <View style={tw`mt-6 w-full`}>
                <PhotoTools
                    onCameraStart={(isVisible) => {
                        setFlexWrapper(isVisible)
                    }}
                    onTakePicture={(data) => {
                        // handeOnChangeImagen(data)

                    }}
                />
            </View>
        </ScrollView>
    )
}

export default NewRegister

const styles = StyleSheet.create({})
