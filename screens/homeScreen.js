import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
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
  ActivityIndicator,
} from 'react-native';

import DetailScreen from "./detailScreen";
import LoginScreen from "./login";

import Latest from "./tabs/latest";
import Business from "./tabs/business";
import Sports from "./tabs/sports";
import Health from "./tabs/health";
import Entertainment from "./tabs/entertainment"

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeScreenTabs() {
    return(
        <Tab.Navigator
         tabBarOptions={{
            scrollEnabled: true,
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'ProductSans-Regular',
                textTransform: 'none',
            },
            tabStyle: { width: 130},
         }}
         >
            <Tab.Screen name='Latest' component={Latest} />
            <Tab.Screen name='Health' component={Health} />
            <Tab.Screen name='Business' component={Business} />
            <Tab.Screen name='Entertainment' component={Entertainment} />
            <Tab.Screen name='Sports' component={Sports} />
        </Tab.Navigator>
    );
}

export default function Home(){
    
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
      setTimeout(async()=>{
        try {
          const logedIn = await AsyncStorage.getItem('@logedIn')
          setUserToken(logedIn);
          console.log(logedIn)
        } catch (e) {
        }
        setIsLoading(false);
      },1000);
    }, []);

    if (isLoading) {
      return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size='large'/>
        </View>
      );
    }

    return(
      <NavigationContainer>
        <StatusBar
          backgroundColor = "#fff"
          barStyle = "dark-content"
        />
          {userToken !== null ?(
            <Stack.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
                borderBottomWidth: 0,
                height: 30,
              },   
              headerTitleStyle: {
                color: '#000',
                fontFamily: 'ProductSans-Bold',
                fontWeight: 'bold',
                alignSelf: 'center',
              }
            }}>
              <Stack.Screen name="Headlines" component={HomeScreenTabs} />
              <Stack.Screen name="Details" component={DetailScreen} />
            </Stack.Navigator>
          )
            :
            <Stack.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
                borderBottomWidth: 0,
                height: 30,
              },   
              headerTitleStyle: {
                color: '#000',  
                fontFamily: 'ProductSans-Bold',
                fontWeight: 'bold',
                alignSelf: 'center',
              }
            }}>
              <Stack.Screen  options={{headerShown: false}}  name="Login" component={LoginScreen}/>
            </Stack.Navigator>
          }
      </NavigationContainer>     
    );
}
