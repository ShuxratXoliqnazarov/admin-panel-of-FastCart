import { jwtDecode } from 'jwt-decode'

function saveToken(token) {
	localStorage.setItem('token', token)
}

function getToken() {
	return jwtDecode(localStorage.getItem('token'))
}

function removeToken() {
	localStorage.removeItem('token')
}



export { saveToken, getToken, removeToken }