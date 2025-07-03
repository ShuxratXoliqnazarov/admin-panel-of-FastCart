import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'
import { colors } from '@mui/material'

export const useProductsStore = create((set, get) => ({
	products: [],
	colors: [],

	getProducts: async () => {
		try {
			let { data } = await axiosStandart.get('Product/get-products')
			console.log('DATAS: ', data.data.products)
			set(() => ({ products: data.data.products }))
		} catch (error) {
			console.log(error)
		}
	},

	deleteProduct: async id => {
		try {
			await axiosRequest.delete(`Product/delete-product?id=${id}`)
			get().getProducts()
		} catch (error) {
			console.log(error)
		}
	},

	getColors: async () => {
		try {
			let { data } = await axiosStandart('Color/get-colors')
			console.log(data.data)
			set(() => ({ colors: data.data }))
		} catch (error) {
			console.log(error)
		}
	},
}))
