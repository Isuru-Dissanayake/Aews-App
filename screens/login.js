import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen() {
    const storeUserName = async (val) => {
        try {
          await AsyncStorage.setItem('@user_name', val)
        } catch (e) {
        }
    }
    const storePassWord = async (val) => {
        try {
          await AsyncStorage.setItem('@user_password', val)
        } catch (e) {
        }
    }

    const checkData = async () => {
      try {
        const user_name = await AsyncStorage.getItem('@user_name')
        const user_password = await AsyncStorage.getItem('@user_password')
        console.log(user_name)
        console.log(user_password)
        if ( user_name !== null && user_password !==null ){
          try {
            await AsyncStorage.setItem('@logedIn', 'notNull')
          } catch (e) {
          }
        }else{
          Alert.alert('OOPS!', 'Incorrect username or password', [
            {text: 'Understood'}
          ]);
        }
      } catch (e) {
      }
    }

    const changeUserName = (val) => {
        storeUserName(val);
    }
    const changePassWord = (val) => {
        storePassWord(val);
    }

    return(
        <TouchableWithoutFeedback onPress = {() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard');
          }}>
            <View style={styles.inputScreen}>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(changeUserName)}
                    placeholder={"Username"}
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(changePassWord)}
                    placeholder={"Password"}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={()=>checkData()} style={styles.login}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles=StyleSheet.create({
    inputScreen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputText: {
        width: '80%',
        height: 50,
        margin: 20,
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: '#dcdcdc'
    },
    login:{
      height: 50,
      width: 100,
      height: 50,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      borderRadius: 8,
      backgroundColor: '#dcdcdc',
      fontWeight: 'bold',
    }
});