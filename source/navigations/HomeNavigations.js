import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Contact from "../screens/Contact"
import Home from "../screens/Home"
import colors from "../config/color"
import Rice from '../screens/Rice';

const Stack = createStackNavigator();

function HomeNavigations(props) {
    return (
        <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: colors.primary, height: 50 } }}
        >
            <Stack.Screen
                name="home"
                component={Home}
                options={{ title: "LUNCH CHOICE", headerTitleAlign: "center", headerTintColor: "white" }}

            />
            <Stack.Screen
                name="contact"
                component={Contact}
                options={{ title: "Contact Now", headerTitleAlign: "center", headerTintColor: "white" }}

            />
            <Stack.Screen
                name="rice"
                component={Rice}
                options={{ title: "Rice", headerTitleAlign: "center", headerTintColor: "white" }}

            />
        </Stack.Navigator>
    );
}

export default HomeNavigations;