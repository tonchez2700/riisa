import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Input, Icon } from 'react-native-elements';

const TextInputForm = ({ name, placeholder, ...otherProps }) => {


    return (
        <View>
            <Input
                placeholder={placeholder}
                name={name}
                autoautoCapitalize='characters'
                color='#4A4B4D'
                inputStyle={{ fontSize: 13 }}
                inputContainerStyle={styles.input}
                {...otherProps}
            />

        </View>

    )
}

export default TextInputForm

const styles = StyleSheet.create({
    //Text input style
    textInput: {
        backgroundColor: '#fff',
        padding: 15,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 10,
        borderRadius: 30,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingStart: 30,
        borderBottomWidth: 0,
        width: '80%',
        height: 50,
    },
});
