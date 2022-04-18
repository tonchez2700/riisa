import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal, Dimensions, Picker } from 'react-native'
import React, { Component, useState } from 'react'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { Input, Button, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'tailwind-react-native-classnames';
import EntryList from './../components/EntryList'

const { width } = Dimensions.get("window");

const PointsListScreen = () => {
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={styles.title}>Listado de puntos</Text>

            <TouchableOpacity
                style={styles.btnIncident}
                onPress={() => navigation.navigate('CeateReportScreen')}>
                <Text style= {styles.btnText} >Reportar incidente</Text>
            </TouchableOpacity>

            <EntryList
                data={state}
            />

           
        </ScrollView>
    );


}

export default PointsListScreen

const state = [
    { name: 'Puerta principal' }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        color: '#ffad00',
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btnIncident: {
        marginBottom:20,
        height: 35,
        width: width - 60,
        backgroundColor: '#133C60',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white'
    }
})