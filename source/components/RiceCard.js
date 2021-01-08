import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function RiceCard() {
    const navigation = useNavigation();

    return (

        <TouchableOpacity
            onPress={() => navigation.navigate("rice")}
            style={styles.container}
        >

            <View style={{ flexDirection: "row" }}>
                <View style={styles.imageContainer}>

                    <Image style={styles.image} source={require("../assets/rice2.jpg")} />
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.foodName}>බත් ඈණවුම් කිරීම සදහා</Text>
                    {/* <Text style={styles.foodPrice}>රු: 150.00</Text> */}
                </View>
            </View>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {

        padding: 5,
        overflow: "hidden",
        borderRadius: 5,
        marginVertical: 7,
        backgroundColor: "white",
        width: "100%",
        height: 100,
        justifyContent: "center",
        elevation: 4
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, foodName: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },

    image: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
        marginHorizontal: 20,
        // borderWidth: 0.5,
        // borderColor: color.red,


    },
});

export default RiceCard;