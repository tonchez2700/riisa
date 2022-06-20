import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from 'tailwind-react-native-classnames';
import MenuFooter from '../components/MenuFooter';
import NavBar from '../components/NavBar'
import HomeScreen from './HomeScreen';
import { Provider as LocationProvider } from '../context/LocationContext';
import { Provider as PointsListProvider } from '../context/PointsListContext';
import { Provider as PatrolsListProvider } from '../context/PatrolsListContext';
import { Provider as IncidentProvider } from '../context/IncidentContext';
import CeateReportScreen from './CeateReportScreen';
import PatrolListScreen from './PatrolListScreen';
import PointsListScreen from './PointsListScreen';



const AppStack = createNativeStackNavigator();

const WrapperInnerScreens = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavBar />
            <View style={[tw`pl-8 pr-8`, { flex: 1 }]}>
                <PatrolsListProvider>
                    <LocationProvider>
                        <IncidentProvider>
                            <PointsListProvider>
                                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                                    <AppStack.Screen name="PatrolListScreen" component={PatrolListScreen} />
                                    <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                                    <AppStack.Screen name="CeateReportScreen" component={CeateReportScreen} />
                                    <AppStack.Screen name="PointsListScreen" component={PointsListScreen} />
                                </AppStack.Navigator>
                            </PointsListProvider>
                        </IncidentProvider>
                    </LocationProvider>
                </PatrolsListProvider>
            </View>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

