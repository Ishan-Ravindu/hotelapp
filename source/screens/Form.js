import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import FormContext from "../context/formContext"
import MainButton from "../components/MainButton"
import color from '../config/color'
import MYTextInput from '../components/MYTextInput'
import OrderContext from "../context/orderContext"
import addOrders from '../api/orders'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Form() {
    const { form, setForm } = useContext(FormContext)
    const [userName, setUserName] = useState()
    const [pNO, setPNO] = useState()
    const [no, setNo] = useState()
    const [addressLine1, setaddressLine1] = useState()
    const [city, setCity] = useState()
    const [isCardVisible, setCardVisible] = useState(true)
    const { orders, setOrders } = useContext(OrderContext)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const navigation = useNavigation();

    const submitOrders = async () => {

        let total = 0
        let orderName = ""
        orders.map((order) => {
            total = total + order.total
            orderName = orderName + order.name + "*" + order.unit + " , "
        })


        const data = {
            "name": userName,
            "phone_no": pNO,
            "orders": orderName,
            "total": total,
            "adress": `${no},${addressLine1},${city}`,
            "status": "pending"
        }
        setActivityIndicator(true)
        const result = await addOrders(data)
        if (!result.ok) {
            return alert(result.problem), setActivityIndicator(false)
        } else if (result.ok) {
            console.log("resul ok")
            setActivityIndicator(false)
            setOrders([])

            setUserName()
            setPNO()
            setNo()
            setaddressLine1()
            setCity()

            // store address (form) in to  AsyncStorage

            const newForm = []
            const newAddress = {
                "address_line_1": addressLine1,
                "city": city,
                "name": userName,
                "no": no,
                "p_no": pNO,
            }




            newForm.push(newAddress)
            setForm(newForm)

            try {
                const jsonValue = JSON.stringify(newForm)
                await AsyncStorage.setItem('form', jsonValue)

            } catch (e) {
                console.log(e)
            }


            //end store address (form) in to  AsyncStorage



            Alert.alert(
                "ඇණවුම් කිරීම සාර්ථකයි",
                "",
                [
                    {
                        text: "OK", onPress: () => {
                            navigation.goBack()
                            navigation.navigate("Home")
                        }
                    }
                ],
                { cancelable: false }
            );


        }

    }

    return (
        <View style={styles.container}>
            {!form.length == 0 && isCardVisible ? <><View>


                {form.map(form =>
                    <TouchableOpacity style={styles.cardContainer} key={form.name} onPress={(() => (

                        setUserName(form.name),
                        setPNO(form.pNO),
                        setPNO(form.p_no),
                        setNo(form.no),
                        setaddressLine1(form.address_line_1),
                        setCity(form.city),
                        setCardVisible(false)
                    )

                    )} >
                        <Text style={styles.text}>{form.name}</Text>
                        <Text style={styles.text}>{form.p_no}</Text>
                        <Text style={styles.text}>{form.no}</Text>
                        <Text style={styles.text}>{form.address_line_1}</Text>
                        <Text style={styles.text}>{form.city}</Text>
                    </TouchableOpacity>

                )}

                <View style={styles.buttonContainer}>

                    <MainButton title="නව තොරතුරු ඇතුළත් කිරීමට" onPress={() => setCardVisible(false)} />
                </View>
            </View>
            </>

                : <><View style={styles.formContainer} key={form.name}>
                    <MYTextInput value={userName} placeholder="නම" onChangeText={text => setUserName(text)} />
                    <MYTextInput value={pNO} placeholder="දුරකතන අංකය" onChangeText={text => setPNO(text)} />
                    <MYTextInput value={no} placeholder="ලිපින අංකය" onChangeText={text => setNo(text)} />
                    <MYTextInput value={addressLine1} placeholder="ගම" onChangeText={text => setaddressLine1(text)} />
                    <MYTextInput value={city} placeholder="නගරය" onChangeText={text => setCity(text)} />
                </View>
                    {activityIndicator && <ActivityIndicator size="large" color="#00ff00" animating={activityIndicator} />}
                    <MainButton title="තහවුරු කරන්න" onPress={submitOrders} />

                </>}


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    cardContainer: {
        backgroundColor: color.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
        marginBottom: 20,
        paddingVertical: 10,
        marginHorizontal: 30
    },
    text: {
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonContainer: {
        width: "100%"
    },
    formContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20

    }
});

export default Form;