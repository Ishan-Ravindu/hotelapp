import { create } from "apisauce"

const apiClient = create({
    baseURL: 'https://hotelappbackend.herokuapp.com/api/',

})

export default apiClient