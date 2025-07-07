import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Form, Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useProductsStore } from '../../store/productsStore'
import { useEffect, useState } from 'react'
import './add.css'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Upload } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Toaster } from 'sonner'

export default function Add() {
	const {
		getProducts,
		products,
		colors,
		getColors,
		getCategories,
		categories,
		getSubcategories,
		subCategories,
		getBrands,
		brands,
		postProduct,
	} = useProductsStore()

	const [productName, setProductName] = useState('')
	const [code, setCode] = useState(null)
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState(null)
	const [subCategory, setSubCategory] = useState(null)
	const [brand, setBrand] = useState(null)
	const [price, setPrice] = useState(null)
	const [count, setCount] = useState(null)
	const [color, setColor] = useState(null)

	const [image, setImage] = useState('')

	function handleDeleteImage(index) {
		setImage(image.filter((el, i) => i != index))
	}

	const navigate = useNavigate()

	function handleAdd() {
		const formData = new FormData()

		formData.append('BrandId', brand)
		formData.append('HasDiscount', false)
		formData.append('Price', price)
		formData.append('Quantity', count)
		formData.append('Code', code)
		formData.append('SubCategoryId', subCategory)
		formData.append('ProductName', productName)
		formData.append('Description', description)
		formData.append('ColorId', color)
		for (let i = 0; i < image.length; i++) {
			formData.append('Images', image[i])
		}

		postProduct(formData)
		navigate('/products')

		setProductName('')
		setCode(null)
		setDescription('')
		setCategory(null)
		setSubCategory(null)
		setBrand(null)
		setPrice(null)
		setCount(null)
		setColor(null)
		// setImage([])
	}

	const [selectedColor, setSelectedColor] = useState(null)

	useEffect(() => {
		getProducts()
		getColors()
		getCategories()
		getSubcategories()
		getBrands()
	}, [])

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '40px',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<Button color='white'>
						<Link to={'/products'}>
							<ArrowBackIcon sx={{ fontSize: '35px' }} />
						</Link>
					</Button>
					<h1> Add New</h1>
				</div>
				<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
					<Button variant='outlined'>Cancel</Button>
					<Button variant='contained' onClick={handleAdd}>
						Save
					</Button>
				</div>
			</div>

			<section className='sec_1'>
				<aside className='leftSec'>
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
					>
						<h2>Information</h2>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<TextField
								id='outlined-basic'
								label='Product name'
								variant='outlined'
								sx={{ width: '65%' }}
								value={productName}
								onChange={e => setProductName(e.target.value)}
							/>
							<TextField
								id='outlined-basic'
								label='Code'
								variant='outlined'
								value={code}
								onChange={e => setCode(e.target.value)}
							/>
						</div>
						<TextareaAutosize
							aria-label='minimum height'
							minRows={3}
							placeholder='Description'
							style={{
								width: '100%',
								maxWidth: '770px',
								height: '100px',
								borderRadius: '10px',
								padding: '10px',
								maxHeight: '250px',
								fontSize: '18px',
							}}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<div className='selects'>
							<Box sx={{ minWidth: 120, width: '250px' }}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Categories
									</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={category}
										label='Categories'
										onChange={e => setCategory(e.target.value)}
									>
										{categories?.map(category => (
											<MenuItem key={category.id} value={category.categoryName}>
												{category.categoryName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 120, width: '250px' }}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Subcategories
									</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={subCategory}
										label='Subcategories'
										onChange={e => setSubCategory(e.target.value)}
									>
										{subCategories?.map(sub => (
											<MenuItem key={sub.id} value={sub.id}>
												{sub.subCategoryName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 120, width: '250px' }}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>Brands</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={brand}
										label='Subcatofories '
										onChange={e => setBrand(e.target.value)}
									>
										{brands?.map(brand => (
											<MenuItem key={brand.id} value={brand.id}>
												{brand.brandName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<TextField
								id='outlined-basic'
								label='Product price'
								variant='outlined'
								type='number'
								value={price}
								onChange={e => setPrice(e.target.value)}
							/>
							<TextField
								id='outlined-basic'
								label='Discount'
								variant='outlined'
								type='number'
							/>
							<TextField
								id='outlined-basic'
								label='Count'
								variant='outlined'
								type='number'
								value={count}
								onChange={e => setCount(e.target.value)}
							/>
						</div>
					</div>
				</aside>

				<aside className='rightSec'>
					<div
						className='colors'
						style={{
							border: '1px solid gray',
							padding: '20px',
							borderRadius: '10px',
						}}
					>
						<p style={{ fontWeight: 'bold' }}>Color: </p>
						<div className='color'>
							{colors?.map(color => (
								<div
									onClick={() => setColor(color.id)}
									key={color.id}
									style={{
										backgroundColor: color.colorName,
										width: '50px',
										height: '50px',
										borderRadius: '50%',
										border:
											selectedColor === color.id
												? '3px solid yellow'
												: '1px solid gray',
										boxShadow: selectedColor === color.id ? '0 0 4px yellow' : '',
										cursor: 'pointer',
										transition: '0.2s',
									}}
								></div>
							))}
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '20px',
						}}
					>
						<h2>Images</h2>
						<div>
							<Paper
								variant='outlined'
								sx={{
									p: 2,
									textAlign: 'center',
									position: 'relative',
									cursor: 'pointer',
									border: '2px dashed #ccc',
									'&:hover': { borderColor: '#999' },
								}}
								onClick={() => document.getElementById('file-upload')?.click()}
							>
								<input
									id='file-upload'
									type='file'
									accept='image/*'
									multiple
									hidden
									// value={image}
									onChange={e => setImage(e.target.files)}
								/>
								<Upload size={20} style={{ marginBottom: 4, margin: 'auto' }} />
								<Typography variant='body2'>
									Click to upload or drag and drop
								</Typography>
								<Typography variant='caption'>
									(SVG, JPG, PNG, or GIF maximum 900×400)
								</Typography>
							</Paper>
						</div>
						{/* <TableContainer component={Paper}>
							<Table sx={{ minWidth: 130 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell align='right'>File name</TableCell>
										<TableCell align='right'>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{image.map((elem, i) => (
										<TableRow
											key={elem.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component='th' scope='row'>
												<img src={elem.base64} alt='' />
											</TableCell>
											<TableCell align='right'>{elem.name}</TableCell>
											<TableCell align='right'>
												<div>
													<Button
														color='error'
														onClick={() => {
															handleDeleteImage(i)
														}}
													>
														<DeleteOutlineIcon />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer> */}
					</div>
				</aside>
			</section>
			<Toaster richColors position='bottom-right' />
		</>
	)
}
