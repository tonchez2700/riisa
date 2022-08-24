import React, { useContext, useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions, ViewBase } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import SelectDropdown from 'react-native-select-dropdown';
import { View } from 'react-native-web';

const { width } = Dimensions.get('window');

const DropdownSelect = ({ data, type, fun }) => {

    const navigation = useNavigation();
    return (

        <SelectDropdown
            data={data}
            defaultValueByIndex={2}
            onSelect={(selectedItem, index) => {
                fun(selectedItem)
            }}
            defaultButtonText={type}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return (
                    isOpened
                        ?
                        <Icon name='chevron-up' type='font-awesome' color='black' size={10} />
                        :
                        <Icon name='chevron-down' type='font-awesome' color='black' size={10} />)

            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
        />
    )
}

export default DropdownSelect

const styles = StyleSheet.create({


    dropdown1BtnStyle: {
        width: '100%',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});
