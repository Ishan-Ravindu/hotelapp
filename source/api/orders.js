import client from "./client"

const addOrders = data => client.post("order/", data)

export default addOrders