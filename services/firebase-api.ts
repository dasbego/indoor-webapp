import axios from 'axios'

// The firebase base url ( Cloud functions )
const BASE_URL = 'https://us-central1-indoorv2.cloudfunctions.net/indoorapi/';

const instance = axios.create({
    baseURL: BASE_URL
})

export const getAllRecords = (): Promise<any> => {
    return instance
        .get('/records')
        .then((response) => {
            return response.data.records
        })
        .catch(() => {
            return {}
        })
}