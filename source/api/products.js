import client from "./client"

const getProducts = () => client.get("product/")

export default getProducts
