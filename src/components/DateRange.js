import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import useDatePicker from './../hooks/useDatePicker'
import tw from 'tailwind-react-native-classnames';

const DateRange = ({ titleDate, titleTime, onChangeDate, onChangeTime }) => {
    const { state, handleVisibility, handleOnChangePicker } = useDatePicker()

    const onChangePicker = (event, selectedDate) => {
        handleOnChangePicker(selectedDate, state.mode)
    }

    useEffect(() => {
        onChangeTime(state.time)
    }, [state.time]);


    return (
        <View>

            <TouchableOpacity onPress={() => handleVisibility('time')}>
                <View >
                    <Input
                        rightIcon={
                            <TouchableOpacity onPress={() => handleVisibility('time')}>
                                <Icon type='font-awesome' name='clock-o' size={25} color='black' />
                            </TouchableOpacity>
                        }
                        inputStyle={{fontSize: 20}}
                        inputContainerStyle={{
                            borderBottomColor: 'white',
                            borderRadius: 5,
                            height: '4%',

                        }}
                        placeholder="Hora de salida"
                        editable={false}
                        containerStyle={styles.containerInput}
                        label={titleTime}
                        labelStyle={{ color: '#005691',marginBottom: 10, }}
                        value={state.time ? state.time.toString() : null}
                    />
                </View>
            </TouchableOpacity>
            {state.isVisible && (
                <DateTimePicker
                    testID="tmpDate"
                    dateFormat="year month day"
                    value={state.tmpDate}
                    mode={state.mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChangePicker}
                />
            )}
        </View>
    )
}

export default DateRange

const styles = StyleSheet.create({

    containerInput: {
        paddingLeft: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
})
