import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Category from './source/screens/Category';
// import Home from "./source/screens/Home"
import CartNavigations from "./source/navigations/CartNavigations"
import colors from "./source/config/color"
import ProductContext from './source/context/produstContext';
import OrderContext from './source/context/orderContext';
import FormContext from './source/context/formContext';
import ErrorContext from './source/context/errorContext';
import LordingContext from './source/context/lordingContext';
import HomeNavigations from "./source/navigations/HomeNavigations"

const Tab = createBottomTabNavigator();

const App = () => {

  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState([])
  const [error, setError] = useState(false)
  const [lording, setLording] = useState(false)

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('form')
      if (jsonValue != null) {

        const formData = JSON.parse(jsonValue)
        setForm(formData)
      }

    } catch (e) {
      console.log(e)
    }
  }


  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      <OrderContext.Provider value={{ orders, setOrders }}>
        <FormContext.Provider value={{ form, setForm }}>
          <ErrorContext.Provider value={{ error, setError }}>
            <LordingContext.Provider value={{ lording, setLording }}>

              <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
              <NavigationContainer>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Home') {
                        iconName = focused
                          ? 'md-home'
                          : 'md-home-outline';

                      } else if (route.name === 'Category') {
                        iconName = focused ? 'apps-sharp' : 'apps-outline';

                      } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart-sharp' : 'cart-outline';
                      }

                      // You can return any component that you like here!
                      return (

                        <Icon name={iconName} size={size} color={color} />

                      )
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: colors.primary,
                    inactiveTintColor: colors.secondary,
                    keyboardHidesTabBar: true
                  }}
                >
                  <Tab.Screen name="Home" component={HomeNavigations} />
                  <Tab.Screen name="Category" component={Category} />
                  <Tab.Screen name="Cart" component={CartNavigations}
                    options={{ tabBarBadge: orders.length }} />
                </Tab.Navigator>
              </NavigationContainer>

            </LordingContext.Provider>
          </ErrorContext.Provider>
        </FormContext.Provider>
      </OrderContext.Provider>
    </ProductContext.Provider>
  );
};



export default App;


