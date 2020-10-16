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
  TouchableHighlight,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';

export default function LoginScreen({navigation}) {
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

    const checkData = async ({navigation}) => {
      try {
        const user_name = await AsyncStorage.getItem('@user_name')
        const user_password = await AsyncStorage.getItem('@user_password')
        console.log(user_name)
        console.log(user_password)
        if ( user_name !== null && user_password !==null ){
          try {
            await AsyncStorage.setItem('@logedIn', 'notNull')
            navigation.reset({
              index: 0,
              routes: [{ name: 'Headlines' }],
            });
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
                <Text style={styles.welcomeText}>
                  Get Started
                </Text>
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
                <TouchableHighlight onPress={()=>checkData({navigation})} style={styles.loginButton} >
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableHighlight>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles=StyleSheet.create({
    inputScreen:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        fontFamily: 'ProductSans-Regular',
    },
    welcomeText:{
        //alignItems: 'flex-start',
        fontFamily: 'ProductSans-Bold',
        fontSize: 32,
    },
    inputText: {
        width: '80%',
        margin: 20,
        padding: 20,
        borderWidth: 0,
        borderRadius: 40,
        fontFamily: 'ProductSans-Regular',
        backgroundColor: '#dcdcdc'
    },
    textStyle: {
      color: "white",
      fontFamily: 'ProductSans-Bold',
      textAlign: "center"
    },
    loginButton: {
      backgroundColor: "#000",
      width: '30%',
      borderRadius: 20,
      padding: 10,
      margin: 20,
      marginBottom: 50,
      elevation: 2,
    },
});