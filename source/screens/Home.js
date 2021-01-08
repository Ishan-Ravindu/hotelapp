import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Text, ActivityIndicator } from 'react-native'
import MainButton from '../components/MainButton'
import Banner from '../components/Banner'
import Card from "../components/Card"
import getProducts from "../api/products"


import colors from '../config/color'
import ErrorContext from '../context/errorContext'
import ProductsContext from "../context/produstContext"
import LordingContext from "../context/lordingContext"
import getBanner from '../api/banner'
import { TextInput } from 'react-native-gesture-handler'
import AvatorIcon from '../components/AvatorIcon'
import RiceCard from '../components/RiceCard'
import CheckBoxList from "../components/CheckBoxList"


function Home({ navigation }) {
    const [banner, setBaner] = useState(["https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "https://images.pexels.com/photos/286283/pexels-photo-286283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"])
    const { products, setProducts } = useContext(ProductsContext)
    const { error, setError } = useContext(ErrorContext)
    const { lording, setLording } = useContext(LordingContext)

    useEffect(() => {
        loadProducts()
        loadBanner()

    }, [])

    const loadProducts = async () => {
        setError(false)
        setLording(true)
        const responce = await getProducts()
        setLording(false)

        if (!responce.ok) return setError(true)

        setError(false)
        setProducts(responce.data)

    }
    const loadBanner = async () => {

        let Allbanner = []

        const responce = await getBanner()

        if (!responce.ok) return console.log(responce.status)

        responce.data.map(banner => {
            Allbanner.push(banner.image)
        })

        setBaner(Allbanner)

    }



    return (
        <ScrollView style={styles.container}>
            <View >
                <Banner
                    bannerImage={banner}
                />
                <View style={styles.iconList}>
                    <AvatorIcon
                        name="home"
                        size={35}
                        tagName="Home Made"
                        color="green"
                    />
                    <AvatorIcon
                        name="rocket"
                        size={40}
                        color="green"
                        tagName="Fast Delivery"
                    />
                    <AvatorIcon
                        name="logo-whatsapp"
                        size={40}
                        tagName="Contact Now"
                        // onPress={() => navigation.navigate("contact")}
                        color="green"
                        subTagName="(075454850)"
                    />
                </View>

                <View style={styles.body}>
                    {error && <View style={{ justifyContent: "center", alignItems: "center", marginTop: 25 }}>
                        <Text style={{ fontSize: 25, marginVertical: 15 }}>දත්ත ලබා ගත නොහැකියි</Text>
                        <MainButton title="නැවත උත්සහ කිරීමට" onPress={loadProducts} />
                    </View>}






                    {lording && <ActivityIndicator animating={lording} size={50} color="tomato" />}
                    {!lording && !error && <RiceCard />}


                    {products.map(product => <Card
                        key={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                    />)}
                </View>
            </View>
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 10
    },
    body: {
        paddingHorizontal: 10
    },
    iconList: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 10,
        marginBottom: 20

        // backgroundColor: "white",
        // paddingVertical: 10,
        // marginHorizontal: 10,
        // borderRadius: 10
    }


});

export default Home;