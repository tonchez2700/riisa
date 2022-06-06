import React, { useReducer, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Camera } from 'expo-camera';
import { Button, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const initialState = { 
    isPreview: false,
    isVisibleCamera: false,
    processingPreview: false,
    hasPermission: null,
    source: null,
    heightImg: 720,
    previews: []
};

const attachmentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CLEAR_STATE':
            return initialState
        case 'SET_CAMERA_PERMISSIONS':
            return { ...state, hasPermission: action.payload.hasPermission }
        case 'DELETE_IMAGE':
            let oldPreviews = state.previews
            oldPreviews.splice(action.payload.key, 1)
            return { ...state, previews: [ ...oldPreviews ] }
        case 'PROCESSING_IMAGE':
            return { ...state, processingPreview: action.payload.processingPreview }
        case 'SET_PHOTO_DATA':
            return { 
                ...state, 
                isVisibleCamera: false,
                source: action.payload.source,
                processingPreview: false,
                previews: [
                    ...state.previews, 
                    { 
                        preview: action.payload.preview, 
                        source: action.payload.source 
                    }
                ]
            }
        case 'SET_IS_VISIBLE_CAMERA':
            return { ...state, isVisibleCamera: action.payload.isVisibleCamera }
        default:
            return state
    }
}

const PhotoAttachmentArea = ({ onTakePicture, onCameraStart }) => {
    const [state, dispatch] = useReducer(attachmentReducer, initialState);
    const absoluteFillObjectCamera = state.isVisibleCamera ?  { ...StyleSheet.absoluteFillObject } : null
    const cameraRef = useRef()

    useEffect(() => {
        onHandlePermission()
    }, []);

    useEffect(() => {
        onTakePicture(state.previews)
    }, [state.previews]);

    useEffect(() => {
        onCameraStart(state.isVisibleCamera)
    }, [state.isVisibleCamera]);

    const onHandlePermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if(status === 'granted')
        dispatch({ 
            type: 'SET_CAMERA_PERMISSIONS', 
            payload: { 
                hasPermission: status === 'granted'
            } 
        })
    }

    const onSnap = async () => {
        if (!cameraRef.current) return
        dispatch({ 
            type: 'PROCESSING_IMAGE', 
            payload: { processingPreview: true } 
        })
        const params = { quality: 0.7, base64: true }
        const photo = await cameraRef.current.takePictureAsync(params)
        if(photo.base64){
            dispatch({ 
                type: 'SET_PHOTO_DATA', 
                payload: { preview: photo.uri, source: photo.base64 } 
            })
        }
    }

    const isVisibleCamera = () => {
        dispatch({ 
            type: 'SET_IS_VISIBLE_CAMERA', 
            payload: { isVisibleCamera: !state.isVisibleCamera } 
        })
    }

    const deleteImage = (key) => {
        dispatch({ 
            type: 'DELETE_IMAGE', 
            payload: { key } 
        })
    }

    if(state.hasPermission === null){
        return <View />
    }

    if(state.hasPermission === false){
        return <Text>No tiene acceso a la camara</Text>
    }

    return (
        <View style={styles.container, absoluteFillObjectCamera }>
            <TouchableOpacity onPress={() => isVisibleCamera()}>
                <View style={tw`border border-blue-300 p-5 pt-10 pb-10 bg-blue-100 mb-5`}>
                    <Text style={{color: '#133C60', textAlign: 'center', fontWeight: 'bold'}}>Tomar fotografía.</Text>
                </View>
            </TouchableOpacity>
            {
                state.previews.map((item, key)=> {
                    return (
                        <View key={key} style={{ flex: 1, marginBottom: 15, height: state.heightImg }}>
                            <TouchableOpacity 
                                onPress={() => deleteImage(key)}
                                style={{ position:'absolute', zIndex: 2 }}>
                                    <Icon
                                    raised
                                    name='trash-o'
                                    type='font-awesome'
                                    color='#f50' />
                            </TouchableOpacity>
                            <ImageBackground
                                source={{ uri: item.preview }}
                                style={{
                                    flex: 1
                                }}
                            />
                        </View>
                    )
                })
            }

            {state.isVisibleCamera &&
                <Camera 
                    ref={cameraRef} 
                    style={styles.camera}
                    pictureSize="1280x720" >
                        <View style={styles.buttonContainer}>
                        <Button 
                            buttonStyle={{ backgroundColor: '#ffffff' }}
                            containerStyle={{ marginBottom: 30 }}
                            titleStyle={{ color: '#000000' }}
                            loadingProps={{ color: '#000000' }}
                            onPress={() => isVisibleCamera()}
                            icon={
                                <Icon
                                    name="close"
                                    size={25}
                                    color="black"
                                />
                                }/>
                            <Button 
                                buttonStyle={{ backgroundColor: '#ffffff' }}
                                titleStyle={{ color: '#000000' }}
                                loadingProps={{ color: '#000000' }}
                                onPress={() => onSnap()}
                                title="Capturar Imagen" 
                                loading={ state.processingPreview ? true : false }/>  
                        </View>
                </Camera>
            }
        </View>
      );
}

export default PhotoAttachmentArea

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        zIndex: 3,
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 40,
    },
    text: {
        fontSize: 18,
        padding: 10,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5
    },
})
