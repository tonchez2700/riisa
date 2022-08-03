import React from 'react'
import { SafeAreaView, View, Text, ImageBackground } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as StatusFormProvider } from '../context/StatusFormContext';
import { Provider as AdvanceProvider } from '../context/AdvanceContext';
import LayoffPersonalScreen from './LayoffPersonalScreen';
import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import StatusScreen from './StatusScreen';
import MenuFooter from '../components/MenuFooter';
import NavBar from '../components/NavBar'
import HomeScreen from './HomeScreen';




const AppStack = createNativeStackNavigator();

const WrapperInnerScreens = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.background} resizeMode="cover" style={[tw`flex-1`]}>
                <NavBar />
                <View style={[tw`mb-3`, { flex: 1 }]}>
                    <AdvanceProvider>
                        <StatusFormProvider>
                            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                                <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                                <AppStack.Screen name="StatusScreen" component={StatusScreen} />
                                <AppStack.Screen name="LayoffPersonalScreen" component={LayoffPersonalScreen} />
                            </AppStack.Navigator>
                        </StatusFormProvider>
                    </AdvanceProvider>
                </View>
                <MenuFooter />
            </ImageBackground>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

