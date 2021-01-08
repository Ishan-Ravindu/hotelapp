import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../config/color';

function AvatorIcon({ tagName, subTagName, ...otherProps }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>

                <Icon {...otherProps} />
            </View>
            <Text style={styles.tagText}>{tagName}</Text>
            <Text style={styles.tagText}>{subTagName}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: 65,
        height: 65,
        borderRadius: 32,
        borderWidth: 0.5,
    },
    tagText: {
        fontSize: 15,
        fontWeight: "bold",
        fontStyle: "italic"
    }
});

export default AvatorIcon;