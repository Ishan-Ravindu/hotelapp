import React, { useContext } from 'react'
import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native'
import Card from '../../components/Card'

import ErrorContext from '../../context/errorContext'
import LordingContext from '../../context/lordingContext'
import ProductsContext from "../../context/produstContext"

function Dinner(props) {
    const { products } = useContext(ProductsContext)
    const { lording } = useContext(LordingContext)
    const { error } = useContext(ErrorContext)
    const dinner = products.filter(product => product.category == "DI" || product.category == "BF-DI" || product.category == "LU-DI" || product.category === "BF-LU-DI"
    )
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>

            {error && <View style={{ justifyContent: "center", alignItems: "center", marginTop: 25 }}>
                <Text style={{ fontSize: 25, marginVertical: 15 }}>දත්ත ලබා ගත නොහැකියි</Text>

            </View>}
            {lording && <ActivityIndicator animating={lording} size={50} color="tomato" />}
            {dinner.map(product => <Card
                key={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
            />)}


        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    }
});
export default Dinner;