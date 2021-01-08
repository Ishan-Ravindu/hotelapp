import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import colors from "../config/color"
import Icon from 'react-native-vector-icons/Ionicons';

function CartCard({ image, name, unitPrice, total, unit, onCancelPress, onDecreasePress, onIncreasePress }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={{ flex: 1 }}>


                {/* <Text style={{ textAlign: "right" }}>x</Text> */}
                <View style={{ alignItems: "flex-end" }}>

                    <Icon
                        name="close-circle-sharp"
                        size={25}
                        color={colors.red}
                        onPress={onCancelPress}
                    />
                </View>
                <Text style={styles.titleText} >{name}</Text>

                <Text style={styles.unitPrice} >එකක මිළ = රු:{unitPrice}</Text>
                <View style={styles.quntity}>
                    <Icon
                        name="ios-remove-circle"
                        size={30}
                        color={colors.secondary}
                        onPress={onDecreasePress}
                    />
                    <Text> {unit} </Text>
                    <Icon
                        name="add-circle"
                        size={30}
                        color={colors.secondary}
                        onPress={onIncreasePress}
                    />
                </View>
                <Text style={styles.totalText}>එකතුව = රු:{total}</Text>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: "row",
        marginVertical: 10,
        paddingLeft: 5,
        borderRadius: 10

    },
    quntity: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",


    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 2.5
    },
    totalText: {
        textAlign: "right",
        fontSize: 15,
        fontWeight: "bold"
    },
    unitPrice: {
        marginBottom: 2.5,
        fontSize: 15
    }

});

export default CartCard;