import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import color from "../config/color"

function MainButton({ title, onPress, ...otherProps }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            {...otherProps}

        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.primary,
        width: "100%",
        height: 40,
        borderRadius: 15
    },
    text: {
        color: color.white,
        fontWeight: "bold",
        fontSize: 20
    }
});

export default MainButton;