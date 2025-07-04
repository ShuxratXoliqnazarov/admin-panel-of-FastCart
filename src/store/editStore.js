import { create } from 'zustand'
import { axiosRequest, axiosStandart } from '../utils/axios'

export const useEditStore = create((set, get) => ({
	product: [],

	getProductById: async id => {
		try {
			let { data } = await axiosRequest.get(
				`Product/get-product-by-id?id=${id}`
			)
			console.log('product:,,', data.data)
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
		} catch (error) {
			console.log(error)
		}
	},
}))
