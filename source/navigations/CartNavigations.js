import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Cart from "../screens/Cart"
import Form from "../screens/Form"
import colors from "../config/color"


const Stack = createStackNavigator();

function CartNavigations(props) {
    return (

        <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: colors.primary, height: 50 } }}
        >
            <Stack.Screen
                name="cart"
                component={Cart}
                options={{ title: 'තෝරාගැනිම් ලැයිස්තුව' }} />
            <Stack.Screen name="form" component={Form} />
        </Stack.Navigator>

    );
}


export default CartNavigations;