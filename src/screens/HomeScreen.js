import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text, ImageBackground, FlatList, Platform, UIManager, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AccordionItem } from 'react-native-accordion-list-view';
import InvitedListItem from '../components/Cards/InvitedListItem';
import { Context as AdvanceContext } from './../context/AdvanceContext'
import Images from '@assets/images';
import tw from 'tailwind-react-native-classnames'


const HomeScreen = () => {

    const navigation = useNavigation();
    const { state, loadAdvance, getAdvanceById } = useContext(AdvanceContext);
    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    useEffect(() => {
        loadAdvance()
    }, []);
    console.log(state.listAdvance);
    const getContent = () => {
        return (
            <View>
                <View style={[tw`flex-row  justify-between`, styles.sheet]}>
                    <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>Dashboard</Text>
                    <Icon type='font-awesome' name='user' size={25} color='#002443' style={{ marginRight: 1 }} />
                </View>
                <FlatList
                    data={state.listAdvance}
                    initialNumToRender={3}
                    extraData={() => loadAdvance()}
                    maxToRenderPerBatch={15}
                    updateCellsBatchingPeriod={50}
                    keyExtractor={item => `${item.id}`}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => console.log('load more')}
                    renderItem={({ item }) => {
                        return (

                            <AccordionItem
                                isRTL={true}
                                containerStyle={[tw`p-2 border border-gray-400 rounded`, { elevation: 5 }]}
                                customTitle={() =>
                                    <View style={[tw`flex-row`]}>
                                        <Icon type='font-awesome-5' name='money-bill' size={30} color='#002443' style={{ marginLeft: 10 }} />
                                        <Text style={[tw` ml-3 text-lg font-bold `, { color: '#23233C' }]} color>Autorización de anticipo</Text>
                                    </View>
                                }
                                customBody={() =>
                                    <InvitedListItem
                                        key={item.id}
                                        data={item}

                                    />}
                                animationDuration={400}
                            />
                        )

                    }}
                />
            </View>
        )
    }
    return (
        <View style={tw`m-5`}>
            {
                !state.error
                    ?
                    getContent()
                    :

                    <View style={tw`justify-center items-center`}>
                        <Text style={tw`text-center text-lg `}>
                            {state.message}
                        </Text>
                        <Button
                            containerStyle={{ marginTop: 50, width: 100, height: 40 }}
                            buttonStyle={[{ backgroundColor: 'red' }]}
                            title="Actualizar"
                            onPress={() => console.log(state.error)}
                        />
                    </View>
            }
        </View>)
}

export default HomeScreen

const styles = StyleSheet.create({

    sheet: {
        borderRadius: 1,
        borderBottomWidth: 3,
        paddingBottom: 10,
        marginBottom: 15,
        borderStyle: 'dashed',
    },
})
