import React from 'react'
import { StyleSheet } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllItem from "./TabScreen/AllItem"
import BreakFirst from "./TabScreen/BreakFirst"
import Lunch from "./TabScreen/Lunch"
import Dinner from "./TabScreen/Dinner"
import Snack from "./TabScreen/Snack"
import colors from "../config/color"
import Other from './TabScreen/Other';

const Tab = createMaterialTopTabNavigator();

function Category() {
    return (
        <Tab.Navigator

            tabBarOptions={{
                activeTintColor: colors.white,
                labelStyle: { fontSize: 13, fontWeight: "bold" },
                style: { backgroundColor: colors.primary, height: 50 },
            }}>
            <Tab.Screen name="සියල්ල" component={AllItem} />
            {/* <Tab.Screen name="උදේ" component={BreakFirst} /> */}
            <Tab.Screen name="දවල්" component={Lunch} />
            <Tab.Screen name="රාත්‍රි" component={Dinner} />
            <Tab.Screen name="බයිට්" component={Snack} />
            <Tab.Screen name="වෙනත්" component={Other} />

        </Tab.Navigator>
    );
}

export default Category;