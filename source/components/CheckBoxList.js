import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import color from '../config/color';
import MyCheckBox from './MyCheckBox';



function CheckBoxList({ totalPrice, setTotalPrice, order, setOrder, rices, currys }) {

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Text}>RICE</Text>
            </View>

            {rices.map(rice =>
                <MyCheckBox

                    key={rice.id}
                    unitPrice={rice.price}
                    name={rice.name}
                    total={totalPrice}
                    setTotal={setTotalPrice}
                    order={order}
                    setOrder={setOrder}

                />
            )}

            <View style={styles.Header}>

                <Text style={styles.Text}>CURRY</Text>
            </View>

            {currys.map((curry =>
                <MyCheckBox
                    key={curry.id}
                    unitPrice={curry.price}
                    name={curry.name}
                    total={totalPrice}
                    setTotal={setTotalPrice}
                    order={order}
                    setOrder={setOrder}
                />
            ))}
            {/* <Text>{order}</Text>
            <Text>{totalPrice}</Text> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingBottom: 50
    },
    Header: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    Text: {
        fontSize: 25,
        color: color.red
    }
});

export default CheckBoxList;