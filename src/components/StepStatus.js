import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import StepIndicator from 'react-native-step-indicator';
import { Icon } from 'react-native-elements'

const StepStatus = () => {

    const navigation = useNavigation();
    
   const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#012442',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#012442',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#012442',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#012442',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#012442',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#012442'
    }
  
    return (
        <StepIndicator
            customStyles={customStyles}
            stepCount={3}
            currentPosition={2}
        />
    )
}

export default StepStatus
