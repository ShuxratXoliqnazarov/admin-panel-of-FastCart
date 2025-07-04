import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'

export const categoryStore = create((set, get) => ({
	categories: [],
	addModal: false,

	setAddModal: value => set(() => ({ addModal: value })),

	getCategory: async () => {
		try {
			let { data } = await axiosStandart.get('Category/get-categories')
			console.log('categories', data.data)
			set(() => ({ categories: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	addCategory: async formData => {
		try {
			await axiosRequest.post('Category/add-category', formData)
			get().getCategory()
			set(() => ({ addModal: false }))
		} catch (error) {
			console.log(error)
		}
	},

	delCategory: async id => {
		try {
			await axiosRequest.delete(`Category/delete-category?id=${id}`)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
}))
