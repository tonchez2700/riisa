import React from 'react'
import { View } from 'react-native'
import { Input, Icon } from 'react-native-elements'

const InputForm = ({ name, label, ...otherProps }) => {
    const { errors, values, touched, handleChange, handleBlur } = otherProps
    const errorMessage = errors[name] && touched[name] ? errors[name] : null
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <Input
                    error={errors[name]}
                    autoautoCapitalize='characters'
                    touched={touched[name]}
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    value={values[name]}
                    errorMessage={errorMessage}
                    color='#133C60'
                    labelStyle={{ color: '#133C60' }}
                    {...otherProps}
                />

            </View>
        </View>
    )
}

export default InputForm
