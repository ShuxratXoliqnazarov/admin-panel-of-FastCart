import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashbord from './components/layouts/dashboard/dashboard'
// import Dashboard from '/src/pages/Dashboard/dashboard'
// import Orders from '/src/pages/Orders/orders'
import Dashboard from './pages/dashboard/dashboard'
import Orders from './pages/orders/orders'
import Products from './pages/products/products'
import Other from './pages/other/other'
import Sub from './pages/subCategories/subCategories'
import Edit from './pages/edit/edit'
import Add from './pages/add/add'
import Category from './pages/category/category'
import Brands from './pages/brands/brands'
import Login from './pages/login/login'

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Dashbord />,
			children: [
				{
					path: '/',
					index: true,
					element: <Dashboard />,
				},
				{
					path: '/orders',
					element: <Orders />,
				},
				{
					path: '/products',
					element: <Products />,
				},
				{
					path: '/other',
					element: <Other />,
				},
				{
					path: '/addProduct',
					element: <Add />,
				},
				{
					path: '/category',
					element: <Category />,
				},
				{
					path: '/brands',
					element: <Brands />,
				},
				{
					path: '/edit/:id',
					element: <Edit />,
				},
				{
					path: '/subCategories',
					element: <Sub />,
				},
			],
		},
		{
			path: '/login',
			element: <Login />,
		},
	])
	return <RouterProvider router={router} />
}

export default App
