import client from "./client"

const getRice = () => client.get("rice/rice/")

export default getRice