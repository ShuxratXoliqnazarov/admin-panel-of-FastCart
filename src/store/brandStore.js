import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'

export const useBrandStore = create((set, get) => ({
	brands: [],
	getBrands: async () => {
		try {
			let { data } = await axiosStandart.get('Brand/get-brands')
			console.log('BRANDS: ', data.data)
			set(() => ({ brands: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	addBrand: async brand => {
		try {
			await axiosRequest.post(`Brand/add-brand?BrandName=${brand.BrandName}`)
			get().getBrands()
		} catch (error) {
			console.log(error)
		}
	},

	delBrand: async id => {
		try {
			await axiosRequest.delete(`Brand/delete-brand?id=${id}`)
			get().getBrands()
		} catch (error) {
			console.log(error)
		}
	},

	editBrand: async product => {
		try {
			await axiosRequest.put(
				`Brand/update-brand?Id=${product.Id}&BrandName=${product.BrandName}`
			)
			get().getBrands()
		} catch (error) {
			console.log(error)
		}
	},
}))
