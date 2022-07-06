import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ImageBackground, FlatList, Platform, UIManager } from 'react-native';
import { Icon } from 'react-native-elements'
import InvitedListItem from '../components/Cards/InvitedListItem';
import Images from '@assets/images';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import { AccordionItem } from 'react-native-accordion-list-view';



const HomeScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);


    return (
        <ImageBackground source={Images.background} resizeMode="cover" style={tw`flex-1`}>
            <View style={[tw`flex-row mt-5 justify-between`]}>
                <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>Dashboard</Text>
                <Icon type='font-awesome' name='user' size={25} color='#002443' style={{ marginRight: 1 }} />
            </View>
            <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>-------------------------------------------</Text>


            <FlatList
                data={data}
                initialNumToRender={3}
                maxToRenderPerBatch={15}
                updateCellsBatchingPeriod={50}
                keyExtractor={item => `${item.id}`}
                onEndReachedThreshold={0.5}
                onEndReached={() => console.log('load more')}
                renderItem={({ item }) => {
                    return (

                        <AccordionItem
                            key={item.id}
                            containerStyle={tw`p-4 border border-gray-400 rounded`}
                            customTitle={() =>
                                <View style={[tw`flex-row`]}>
                                    <Icon type='font-awesome-5' name='money-bill' size={30} color='#002443' style={{ marginLeft: 10 }} />
                                    <Text style={[tw` ml-3 text-lg font-bold `, { color: '#23233C' }]} color>Autorización de anticipo</Text>
                                </View>
                            }
                            customBody={() =>
                                <InvitedListItem
                                    key={item}
                                    data={item}
                                    onPress={(data) => {
                                        const currentDate = new Date();
                                        const timestamp = currentDate.getTime();
                                    }}
                                />}
                            animationDuration={400}
                        />
                    )

                }}
            />

        </ImageBackground>
    )
}
const data =

    [
        info = [
            {
                id: '1',
                compania: 'peres',
                tipo: 'planta',
                cuenta: 'que cuenta',
                concepto: 'sandia'
            },
        ],
        info = [
            {
                id: '2',
                compania: 'Alonso',
                tipo: 'Fuego',
                cuenta: 'Pelota',
                concepto: 'Melon'
            },
        ]]


export default HomeScreen

const styles = StyleSheet.create({})
