import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, ImageBackground,
    Alert, View, Text,
    TouchableOpacity,
    Modal, Dimensions,
    Image
} from 'react-native';
import Images from '@assets/images';
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

import moment from 'moment'

const { width } = Dimensions.get("window");

const StatusScreen = (props) => {
    return (
        <ScrollView source={Images.background} resizeMode="cover" style={tw`flex-1`}>
            <View style={[tw`flex-row mt-5 justify-between`]}>
                <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>Dashboard</Text>
                <Icon type='font-awesome' name='user' size={25} color='#002443' style={{ marginRight: 1 }} />
            </View>
            <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>-------------------------------------------</Text>
        </ScrollView>
    )
}

export default StatusScreen

const styles = StyleSheet.create({

});