import React from 'react'
import { SafeAreaView, View, Text, ImageBackground, Dimensions } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as RegisterProvider } from '../context/RegisterContext';
import CheckOutScreen from './CheckOutScreen';
import ViewComingScreen from './ViewComingScreen';
import NewRegister from './NewRegister';
import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import NavBar from '../components/NavBar'
import HomeScreen from './HomeScreen';

const { width } = Dimensions.get("window");

const AppStack = createNativeStackNavigator();

const WrapperInnerScreens = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECECEC' }}>
            <NavBar />
            <View style={[tw`pl-8 pr-8`, { flex: 1 }]}>
                <RegisterProvider>
                    <AppStack.Navigator screenOptions={{ headerShown: false }}>
                        <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                        <AppStack.Screen name="NewRegister" component={NewRegister} />
                        <AppStack.Screen name="CheckOutScreen" component={CheckOutScreen} />
                        <AppStack.Screen name="ViewComingScreen" component={ViewComingScreen} />
                    </AppStack.Navigator>
                </RegisterProvider>
            </View>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

