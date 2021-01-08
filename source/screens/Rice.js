import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image, Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'

import color from "../config/color"
import OrderContext from "../context/orderContext"

import CheckBoxList from "../components/CheckBoxList"
import MainButton from "../components/MainButton"
import getRice from '../api/rice';
import getCurry from "../api/curry"

function Rice({ navigation }) {

    const { orders, setOrders } = useContext(OrderContext)
    const [totalRicePrice, setTotalRicePrice] = useState(0)
    const [riceOrder, setRiceOrder] = useState([])
    const [count, setCount] = useState(1)
    const [total, setTotal] = useState(totalRicePrice)
    const [alertVisible, setAlertVisible] = useState(false)

    const [rices, setRices] = useState([])
    const [currys, setCurrys] = useState([])
    const [loarding, setLoarding] = useState(false)

    useEffect(() => {
        setTotal(totalRicePrice * count)
    }, [totalRicePrice])

    useEffect(() => {


        loadRice()
        loadCurry()


    }, [])

    const loadRice = async () => {
        setLoarding(true)

        let AllRice = []

        const responce = await getRice()

        if (!responce.ok) return console.log(responce.status)

        responce.data.map(rice => {
            AllRice.push(rice)
        })

        setRices(AllRice)

    }

    const loadCurry = async () => {
        let allCurry = []

        const responce = await getCurry()

        if (!responce.ok) return console.log(responce.status)

        responce.data.map(curry => {
            allCurry.push(curry)
        })

        setCurrys(allCurry)
        setLoarding(false)
    }

    const createTwoButtonAlert = () => {
        setAlertVisible(!alertVisible)

        let newRiceOrder = " "
        riceOrder.map((order) => {
            newRiceOrder = newRiceOrder + " " + order + " "
        })

        const newOrders = [...orders]
        var d = new Date();
        newOrders.push(
            {
                "id": d.getTime(),
                "name": newRiceOrder,
                "unit_price": totalRicePrice,
                "unit": count,
                "total": total,
                "image": "https://media.istockphoto.com/photos/traditional-sri-lanka-cuisine-carry-rise-picture-id493078530?k=6&m=493078530&s=612x612&w=0&h=uBByBdrBn06A6Dr-G5KPusSNYWF6Pwojg-n7wUM3J70=",

            }
        )
        setOrders(newOrders)


    }


    return (
        <>
            {loarding == true ? <ActivityIndicator animating={loarding} size={50} color="tomato" /> : <>
                <ScrollView style={styles.container}>


                    {/* ------------------------avator---------------------------------- */}
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 25, overflow: "hidden" }}>
                        <Image style={{ height: 150, width: "100%", borderRadius: 15 }} source={{ uri: "https://media.istockphoto.com/photos/traditional-sri-lanka-cuisine-carry-rise-picture-id493078530?k=6&m=493078530&s=612x612&w=0&h=uBByBdrBn06A6Dr-G5KPusSNYWF6Pwojg-n7wUM3J70=" }} />
                    </View>
                    {/* ------------------------end avator---------------------------------- */}


                    <CheckBoxList
                        totalPrice={totalRicePrice}
                        setTotalPrice={setTotalRicePrice}
                        order={riceOrder}
                        setOrder={setRiceOrder}
                        rices={rices}
                        currys={currys}
                    />

                </ScrollView>


                <View style={styles.fotter}>
                    {/* -----------------------unit price---------------------------- */}
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>එකක මිළ</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", }}>
                            <Text>{totalRicePrice}</Text>
                        </View>
                    </View>
                    {/* -----------------------end unit price---------------------------- */}


                    {/* --------------------------quantity----------------------------------- */}
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>ඒකක ගණන</Text>
                        </View>
                        <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                            <Icon name="ios-remove-circle" size={30} color={color.secondary} onPress={() => setCount(
                                count - 1,
                                setTotal(total - totalRicePrice)
                            )} />
                            <Text style={{ marginHorizontal: 10 }}>{count}</Text>
                            <Icon name="add-circle" size={30} color={color.secondary} onPress={() => setCount(
                                count + 1,
                                setTotal(total + totalRicePrice))} />


                        </View>
                    </View>
                    {/* --------------------------end quantity----------------------------------- */}


                    {/* -----------------------------total----------------------------------------- */}
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
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

                        <MainButton onPress={createTwoButtonAlert} disabled={total === 0} title="තහවුරු කරන්න" />
                    </View>
                </View>
                {/* --------------------------------------end button-------------------------- */}
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
                                <MainButton
                                    title="ඔව්" onPress={() => {
                                        setAlertVisible(!alertVisible)
                                        navigation.goBack()
                                    }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 25 }}>
                                <MainButton title="නැත" onPress={() => {
                                    setAlertVisible(!alertVisible)
                                    navigation.goBack()
                                    navigation.navigate("Cart")
                                }} />
                            </View>
                        </View>
                    </View>
                </Modal>

            </>}



        </>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 22,
        borderRadius: 3,
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


    buttonContainer: {
        marginVertical: 5,
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
    },
    fotter: {
        backgroundColor: "white"
    }

});

export default Rice;