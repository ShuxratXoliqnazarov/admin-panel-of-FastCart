import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Checkbox, TextField } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useEffect } from 'react'
import { useProductsStore } from '../../store/productsStore'
import { API } from '../../utils/config'
import './product.css'
import { Link } from 'react-router-dom'

const Products = () => {
	const { getProducts, products, deleteProduct } = useProductsStore()

	const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

	useEffect(() => {
		getProducts()
	}, [])

	return (
		<>
			<div>
				<Link
					to={'/addProduct'}
					style={{
						display: 'flex',
						justifyContent: 'end',
						marginTop: '-60px',
						textDecoration: 'none',
					}}
				>
					<Button variant='contained'>+ Add Product</Button>
				</Link>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						margin: '40px 0px',
					}}
				>
					<TextField id='outlined-basic' label='Search' variant='outlined' />
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Age</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								// value={age}
								label='Age'
								// onChange={handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
			</div>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>
								{' '}
								<Checkbox {...label} disabled />
								Product
							</TableCell>
							<TableCell align='right'>Inventory</TableCell>
							<TableCell align='right'>Category</TableCell>
							<TableCell align='right'>Price</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products?.map(product => (
							<TableRow
								key={product.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '20px',
											}}
										>
											<Checkbox />
											<img src={`${API}images/${product.image}`} alt='' />
											{product.productName}
										</div>
									}
								</TableCell>
								<TableCell align='right'>
									{product.quantity + ' in stock'}
								</TableCell>
								<TableCell align='right'>{product.categoryName}</TableCell>
								<TableCell align='right'>{product.price + ' tjs'}</TableCell>
								<TableCell align='right'>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<Button color='primary'>
											<Link to={`/edit/${product.id}`}>
												<BorderColorOutlinedIcon />
											</Link>
										</Button>
										<Button
											color='error'
											onClick={() => deleteProduct(product.id)}
										>
											<DeleteOutlineOutlinedIcon />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default Products
