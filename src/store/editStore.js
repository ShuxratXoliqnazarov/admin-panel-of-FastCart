import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'
import { toast } from 'sonner'

export const useEditStore = create((set, get) => ({
	product: [],

	getProductById: async id => {
		try {
			let { data } = await axiosRequest.get(
				`Product/get-product-by-id?id=${id}`
			)
			console.log('product:,,', data)
			set(() => ({ product: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	editProduct: async product => {
		try {
			await axiosRequest.put(
				`Product/update-product?Id=${product.Id}&BrandId=${product.BrandId}&ColorId=${product.ColorId}&ProductName=${product.ProductName}&Description=${product.Description}&Quantity=${product.Quantity}&Code=${product.Code}&Price=${product.Price}&HasDiscount=false&DiscountPrice=0&SubCategoryId=${product.SubCategoryId}`
			)
			toast.success('The product is succesfully edited!')
		} catch (error) {
			console.log(error)
			toast.error('There is something go wrong on editting!')
		}
	},
}))
