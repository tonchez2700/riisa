import { Text, View, ScrollView, StyleSheet, } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import PatrolList from '../components/PatrolList';
import HeadTitleScreen from '../components/HeadTitleScreen';
import { Context as PatrolsListContext } from '../context/PatrolsListContext';
import { Input, Button, Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';


const PatrolListScreen = () => {

    const { state, fetchingData } = useContext(PatrolsListContext)
    const navigation = useNavigation();

    useEffect(() => {

        fetchingData()

    }, [])
    return (
        <ScrollView style={styles.container}>
            <HeadTitleScreen title='Listado de rondines' />
            <PatrolList
                data={state.rondines} />

        </ScrollView>
    )
}




const styles = StyleSheet.create({});

export default PatrolListScreen