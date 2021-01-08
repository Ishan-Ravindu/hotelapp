import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Button, Image } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Ionicons';


import MainButton from "../components/MainButton"
import colors from "../config/color"

const elementButton = (value) => (
    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} >

        <Icon name="close-circle-sharp" size={30} color={colors.red} />
    </TouchableOpacity>
);

const elementImage = () => (

    <View style={{ justifyContent: "center", alignItems: "center" }} >
        <Image style={{ width: 50, height: 50, borderRadius: 38, margin: 5 }} source={{ uri: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" }} />
    </View>

);

const elementQuantity = () => (

    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
        <Icon name="ios-remove-circle" size={30} color={colors.secondary} />
        <Text> 5 </Text>
        <Icon name="add-circle" size={30} color={colors.secondary} />
    </View>

);


function Cart({ navigation }) {
    return (
        <View style={styles.container}>
            {/* ------------------------------------table------------------------------- */}
            <Table
                borderStyle={styles.tableBorder}
                style={styles.table}
            >
                <Row
                    data={['වර්ගය', "මිළ\n(රුපියල්)", "ප්‍රමාණය", "මුළු මුදල\n(රුපියල්)", ""]}
                    style={styles.head} textStyle={styles.text}
                />

                <Rows
                    style={styles.tableRow}
                    data={[
                        [elementImage(), '25', elementQuantity(), '100', elementButton('1')],
                        [elementImage(), '50', elementQuantity(), '100', elementButton('1')],
                        [elementImage(), '10', elementQuantity(), '50', elementButton('1')],
                        [elementImage(), '80', elementQuantity(), '160', elementButton('1')]
                    ]}
                    textStyle={styles.dataText} />
                <Row data={['එකතුව', "රු: 2500/="]} style={styles.head} textStyle={styles.text} />

            </Table>
            {/* ------------------------------------endtable------------------------------- */}
            {/* ------------------------------button--------------------------------- */}
            <View style={styles.butonContainer}>

                <MainButton
                    title="ඇණවුම් කරන්න"
                    onPress={() => navigation.navigate('form')}
                />

            </View>
            {/* ------------------------------button--------------------------------- */}
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // paddingTop: 30,
        // backgroundColor: '#fff'
    },
    head: {
        height: 50,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        margin: 6,
        textAlign: "center",
        color: "white"
    },
    butonContainer: {
        marginTop: 50,
        paddingHorizontal: 10
    },
    tableBorder: {
        borderWidth: 0.5,
        borderColor: colors.primary
    },
    tableRow: {
        backgroundColor: colors.white
    },
    table: {
        borderRadius: 10,
        overflow: "hidden"
    },
    dataText: {
        color: "black",
        textAlign: "center"
    }

});

export default Cart;