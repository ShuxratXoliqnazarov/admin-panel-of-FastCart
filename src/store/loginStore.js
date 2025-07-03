import { create } from 'zustand'
import { axiosStandart } from '../utils/axios'
import { saveToken } from '../utils/token'

export const useLoginStore = create((set, get) => ({
	wrong: false,

	login: async user => {
		try {
			let responce = await axiosStandart.post('Account/login', user)
			saveToken(responce.data.data)
			set({ wrong: false })
			return { success: true }
		} catch (error) {
			console.log(error)
			set({ wrong: true })
			return { success: false }
		}
	},
}))
