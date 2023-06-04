import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const getUser = async (id) => {
    console.log('UserId in users service: ', id)
    const request = axios.get(`${baseUrl}/${id}`)
    const response = await request
    return response.data
}

const userService = {
    getAll,
    getUser,
}

export default userService
