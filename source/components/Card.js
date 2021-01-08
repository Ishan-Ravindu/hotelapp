import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../config/color';
import MainButton from './MainButton';
import OrderContext from "../context/orderContext"
import { useNavigation } from '@react-navigation/native';

function Card({ image, name, price }) {
    const { orders, setOrders } = useContext(OrderContext)

    const [isModelVisible, setModalVisible] = React.useState(false)
    const [count, setCount] = React.useState(1)
    const [total, setTotal] = React.useState(price)
    const [alertVisible, setAlertVisible] = React.useState(false)
    const navigation = useNavigation();

    const createTwoButtonAlert = () => {
        setAlertVisible(!alertVisible)

        const newOrders = [...orders]
        var d = new Date();
        newOrders.push(
            {
                "id": d.getTime(),
                "name": name,
                "unit_price": price,
                "unit": count,
                "total": total,
                "image": image

            }
        )
        setOrders(newOrders)
        setModalVisible(false)
    }


    return (
        <>
            {/* ###########################item card#################################### */}
            <TouchableOpacity onPress={() => setModalVisible(!isModelVisible)} style={styles.container}>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 2 }}>

                        <Image style={styles.image} source={{ uri: image }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <Text style={styles.foodName}>{name}</Text>
                        <Text style={styles.foodPrice}>රු: {price}.00</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* ################################end item card ################################ */}


            {/* ###################################Modal############################## */}

            <Modal
                isVisible={isModelVisible}
                style={styles.bottomModal}
                swipeDirection="down"
                onSwipeComplete={() => setModalVisible(!isModelVisible)}
                onBackButtonPress={() => setModalVisible(!isModelVisible)}
            >
                <View style={styles.modalContent}>

                    {/* ------------------------avator---------------------------------- */}
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 25, overflow: "hidden" }}>
                        <Image style={{ height: 150, width: "100%", borderRadius: 15 }} source={{ uri: image }} />
                    </View>
                    {/* ------------------------end avator---------------------------------- */}
                    {/* -----------------------unit price---------------------------- */}
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>එකක මිළ</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", }}>
                            <Text>{price}</Text>
                        </View>
                    </View>
                    {/* -----------------------end unit price---------------------------- */}
                    {/* --------------------------quantity----------------------------------- */}
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>ඒකක ගණන</Text>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                            <Icon name="ios-remove-circle" size={30} color={color.secondary} onPress={() => setCount(
                                count - 1,
                                setTotal(total - price)
                            )} />
                            <Text style={{ marginHorizontal: 10 }}>{count}</Text>
                            <Icon name="add-circle" size={30} color={color.secondary} onPress={() => setCount(
                                count + 1,
                                setTotal(total + price))} />


                        </View>
                    </View>
                    {/* --------------------------end quantity----------------------------------- */}
                    {/* -----------------------------total----------------------------------------- */}
                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>මුළු එකතුව</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Text>--------</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
                            <Text>--------</Text>
                        </View>

                    </View>
                    {/* ----------------------------------end total-------------------------------------------- */}

                    {/* --------------------------------------button-------------------------- */}
                    <View style={styles.buttonContainer}>

                        <MainButton onPress={createTwoButtonAlert} title="තහවුරු කරන්න" />
                    </View>
                    {/* --------------------------------------end button-------------------------- */}
                </View>
            </Modal>

            {/* ###################################end Modal############################## */}
            {/* ###################################alert Modal############################## */}
            <Modal
                isVisible={alertVisible}
                style={styles.alertModal}
            //  swipeDirection="down"
            //  onSwipeComplete={() => setModalVisible(!isModelVisible)}
            // onBackButtonPress={() => setModalVisible(!alertVisible)}
            >
                <View style={styles.alertModelContaint}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Icon name="checkmark-circle-outline" size={120} color={color.primary} />
                        <Text style={styles.alertText}>තෝරා ගැනීම සාර්ථකයි!!</Text>
                        <Text style={styles.alertText}>තවත් තෝරා ගැනීමක් කිරීමට අවශ්‍යද</Text>
                    </View>
                    <View style={styles.alertButtonContainer}>
                        <View style={{ flex: 1, marginRight: 25 }}>
                            <MainButton title="ඔව්" onPress={() => setAlertVisible(!alertVisible)} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 25 }}>
                            <MainButton title="නැත" onPress={() => {
                                setAlertVisible(!alertVisible)
                                navigation.navigate("Cart")
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>
            {/* ###################################end alert Modal############################## */}
        </>
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

    image: {
        height: "100%",
        width: "100%",
        borderRadius: 10,
        marginHorizontal: 20,
        // borderWidth: 0.5,
        // borderColor: color.red,


    },
    foodName: {
        fontSize: 20,
        fontWeight: "bold"
    },
    foodPrice: {
        fontSize: 20
    },

    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 3,

    },
    buttonContainer: {
        marginVertical: 15,
        // borderRadius: 10
    },

    alertModelContaint: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 15,

    },
    alertModal: {
        justifyContent: "center",
        alignItems: "center"
    },
    alertText: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5
    },
    alertButtonContainer: {
        marginTop: 20,
        // marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    }

});

export default Card;