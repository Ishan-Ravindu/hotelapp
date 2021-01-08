import React, { useState } from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

function MyCheckBox({ unitPrice, name, total, setTotal, order, setOrder }) {

    const [value, setValue] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.textCotainer}>

                <Text style={styles.titleText}>{name}</Text>
                <Text>( රු:{unitPrice})</Text>
            </View>

            <View style={styles.checkBoxContainer}>
                <CheckBox
                    disabled={false}
                    value={value}
                    onValueChange={(newValue) => {

                        if (newValue == true) {
                            let newTotal = total + unitPrice
                            setTotal(newTotal)

                            let newOrder = [...order]
                            newOrder.push(name)
                            setOrder(newOrder)

                            setValue(true)

                        } else if (newValue == false) {
                            let newTotal = total - unitPrice
                            setTotal(newTotal)

                            let newOrder = [...order]
                            setOrder(newOrder.filter((order) => order !== name))

                            setValue(false)
                        }
                    }
                    }
                />
            </View>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    textCotainer: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    checkBoxContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MyCheckBox;