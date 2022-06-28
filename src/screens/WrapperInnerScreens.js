import React from 'react'
import { SafeAreaView, View, Text, ImageBackground } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import MenuFooter from '../components/MenuFooter';
import NavBar from '../components/NavBar'
import HomeScreen from './HomeScreen';




const AppStack = createNativeStackNavigator();

const WrapperInnerScreens = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavBar />
            <View style={[tw`pl-8 pr-8`, { flex: 1 }]}>

                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                </AppStack.Navigator>

            </View>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

