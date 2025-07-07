import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'
import { toast } from 'sonner'

export const useBrandStore = create((set, get) => ({
	brands: [],
	getBrands: async () => {
		try {
			let { data } = await axiosStandart.get('Brand/get-brands')

			set(() => ({ brands: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	addBrand: async brand => {
		try {
			await axiosRequest.post(`Brand/add-brand?BrandName=${brand.BrandName}`)
			get().getBrands()
			toast.success('Brand is succefully addeed !')
		} catch (error) {
			console.log(error)
			toast.error('Something is go wrong !')
		}
	},

	delBrand: async id => {
		try {
			await axiosRequest.delete(`Brand/delete-brand?id=${id}`)
			toast.success('Brand is succefully deleted !')
			get().getBrands()
		} catch (error) {
			console.log(error)
			toast.error('Something is go wrong !')
		}
	},
	
	editBrand: async product => {
		try {
			await axiosRequest.put(
				`Brand/update-brand?Id=${product.Id}&BrandName=${product.BrandName}`
			)
			get().getBrands()
			toast.success('Brand is succefully edited !')
		} catch (error) {
			console.log(error)
			toast.error('Something is go wrong !')
		}
	},
}))
