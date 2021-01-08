import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, Button } from 'react-native'
import CartCard from '../components/CartCard'
import OrderContext from "../context/orderContext"
import colors from "../config/color"
import MainButton from '../components/MainButton'

function Cart({ navigation }) {
    const { orders, setOrders } = useContext(OrderContext)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let total = 0
        orders.map(order => {
            total = total + order.total
            setTotal(total)
        })
    }, [orders])

    function onCancelPress(id) {
        let newOrders = [...orders]
        newOrders = newOrders.filter((order) => order.id != id)
        setOrders(newOrders)
    }

    function onDecreasePress(id) {
        let newOrders = [...orders]
        let selectedOrder = newOrders.find((order) => order.id === id)
        selectedOrder.unit = selectedOrder.unit - 1
        selectedOrder.total = selectedOrder.total - selectedOrder.unit_price
        setOrders(newOrders)
    }

    function onIncreasePress(id) {
        let newOrders = [...orders]
        let selectedOrder = newOrders.find((order) => order.id === id)
        selectedOrder.unit = selectedOrder.unit + 1
        selectedOrder.total = selectedOrder.total + selectedOrder.unit_price
        setOrders(newOrders)
    }

    return (

        <>
            <ScrollView style={styles.container}>
                {orders.length == 0 ?
                    <View style={styles.worningTextContainer}>
                        <View style={styles.messageContainer}>
                            <Text style={styles.worningText}>ඔබ තවමත් තෝරා ගැනිමක් සිදු කර නැත</Text>
                        </View>
                        <View style={styles.worningButtonContainer}>
                            <MainButton
                                onPress={() => navigation.navigate('Category')}
                                title="තෝරා ගැනීමට" />
                        </View>
                    </View>
                    :
                    <View>

                        {orders.map(order =>
                            <CartCard
                                key={order.id}
                                name={order.name}
                                unitPrice={order.unit_price}
                                unit={order.unit}
                                image={order.image}
                                total={order.total}
                                onCancelPress={() => onCancelPress(order.id)}
                                onDecreasePress={() => onDecreasePress(order.id)}
                                onIncreasePress={() => onIncreasePress(order.id)}
                            />
                        )}
                    </View>}
            </ScrollView>
            <View style={styles.fotter}>
                <View style={styles.totalTextContainer}>
                    <Text style={styles.totalText}>මුළු එකතුව = රු : {orders.length == 0 ? "00" : total}

                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button disabled={orders.length == 0 ? true : false} color={colors.primary} onPress={() => navigation.navigate('form')} title="ඇණවුම් කරන්න" />
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {

        paddingHorizontal: 10
    },
    fotter: {
        backgroundColor: colors.red,
        height: 50,
        flexDirection: "row"
    },
    totalText: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    totalTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    worningTextContainer: {
        flex: 1,
        // backgroundColor: "red",
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    messageContainer: {
        marginVertical: 20
    },
    worningButtonContainer: {
        width: 250,
        marginVertical: 10
    },
    worningText: {
        fontSize: 20,
        textAlign: "center"
    }
});

export default Cart;