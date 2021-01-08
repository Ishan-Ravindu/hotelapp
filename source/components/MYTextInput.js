import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import color from '../config/color';

function MYTextInput(props) {
    return (
        <View style={styles.container}>
            <TextInput {...props} style={styles.input} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "90%",
        borderRadius: 10,
        marginVertical: 5

    },
    input: {
        fontWeight: "bold",
        color: color.black
    }
});

export default MYTextInput;