import client from "./client"

const getBanner = () => client.get("banner/")

export default getBanner