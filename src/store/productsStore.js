import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'
import { colors } from '@mui/material'
import { toast } from 'sonner'

export const useProductsStore = create((set, get) => ({
	products: [],
	colors: [],
	categories: [],
	subCategories: [],
	brands: [],

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
			toast.success('The product is deleted!')
		} catch (error) {
			console.log(error)
			toast.error('There is something go wrong!')
		}
	},

	getColors: async () => {
		try {
			let { data } = await axiosStandart('Color/get-colors')
			// console.log(data.data)
			set(() => ({ colors: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	getCategories: async () => {
		try {
			let { data } = await axiosStandart('Category/get-categories')
			// console.log(data.data)
			set(() => ({ categories: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	getSubcategories: async () => {
		try {
			let { data } = await axiosStandart.get('SubCategory/get-sub-category')
			// console.log('SUB: ', data.data)
			set(() => ({ subCategories: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	getBrands: async () => {
		try {
			let { data } = await axiosStandart.get('Brand/get-brands')
			console.log('BRANDS: ', data.data)
			set(() => ({ brands: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	postProduct: async formData => {
		try {
			await axiosRequest.post('Product/add-product', formData)
			get().getProducts()
			toast.success('The product is succesfully added!')
		} catch (error) {
			console.log(error)
			toast.error('There is go something wrong!')
		}
	},

	searchProduct: async name => {
		console.log(name)
		try {
			let { data } = await axiosStandart(
				`Product/get-products?ProductName=${name}`
			)
			set(() => ({ products: data.data.products }))
			get().getProducts()
		} catch (error) {
			console.log(error)
		}
	},
}))
