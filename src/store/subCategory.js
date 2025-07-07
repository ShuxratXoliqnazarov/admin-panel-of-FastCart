import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'
import { toast } from 'sonner'

export const useSub = create((set, get) => ({
	subCategories: [],
	getSub: async () => {
		try {
			let { data } = await axiosStandart.get('SubCategory/get-sub-category')
			console.log(data.data)
			set(() => ({ subCategories: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	addSub: async newSub => {
		try {
			await axiosRequest.post(
				`SubCategory/add-sub-category?CategoryId=${newSub.CategoryId}&SubCategoryName=${newSub.SubCategoryName}`
			)
			get().getSub()
			toast.success('Subcategory is succesfully added !')
		} catch (error) {
			console.log(error)
			toast.error('Something is go wrong !')
		}
	},

	delSub: async id => {
		try {
			await axiosRequest.delete(`SubCategory/delete-sub-category?id=${id}`)
			get().getSub()
			toast.success('Subcategory is succesfully deleted !')
		} catch (error) {
			console.log(error)
			toast.error('Something is go wrong !')
		}
	},

	editFunc: async el => {
		try {
			await axiosRequest.put(
				`SubCategory/update-sub-category?Id=${el.Id}&CategoryId=${el.CategoryId}&SubCategoryName=${el.SubCategoryName}`
			)
			get().getSub()
			toast.success('Subcategory is succesfully edited !')
		} catch (error) {
			console.log(error)
			toast.error('Something is go wrong !')
		}
	},
}))
