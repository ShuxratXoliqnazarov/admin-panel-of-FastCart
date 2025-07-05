import axios from 'axios'
import { API } from './config'

const axiosStandart = axios.create({
	baseURL: API,
})

const axiosRequest = axios.create({
	baseURL: API,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})

// const axiosFormData = axios.create({
// 	baseURL: API,
// 	headers: {
// 		"Authorization": `Bearer ${localStorage.getItem('token')}`,
// 		"Content-Type": "multipart/form-data",
// 	},
// })

export { axiosRequest, axiosStandart }
