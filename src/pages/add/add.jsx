import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useProductsStore } from '../../store/productsStore'
import { useEffect } from 'react'
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

export default function Add() {
	const { getProducts, products, colors, getColors } = useProductsStore()

	useEffect(() => {
		getProducts()
		getColors()
	}, [])
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between' , marginBottom: '40px' }}>
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
					<Button variant='contained'>Save</Button>
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
							/>
							<TextField id='outlined-basic' label='Code' variant='outlined' />
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
										// value={age}
										label='Categories'
										// onChange={handleChange}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 120, width: '250px' }}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Subcatofories
									</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										// value={age}
										label='Subcatofories '
										// onChange={handleChange}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ minWidth: 120, width: '250px' }}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>Brands</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										// value={age}
										label='Brands'
										// onChange={handleChange}
									>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
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
							/>
						</div>
					</div>
				</aside>

				<aside className='rightSec'>
					<div
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
									key={color.id}
									style={{
										backgroundColor: color.colorName,
										width: '70px',
										height: '70px',
										borderRadius: '50%',
										border: '1px solid gray',
									}}
								></div>
							))}
						</div>
					</div>

					<div style={{
						display:'flex',
						flexDirection:'column',
						gap:'20px'
					}}>
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
									// onChange={e => setFiles(e.target.files)}
								/>
								<Upload size={20} style={{ marginBottom: 4, margin: 'auto' }} />
								<Typography variant='body2'>
									Click to upload or drag and drop
								</Typography>
								<Typography variant='caption'>
									(SVG, JPG, PNG, or GIF maximum 900×400)
								</Typography>
							</Paper>

							{/* <Button>
								<DownloadOutlinedIcon />
							</Button>
							<p>Click to upload or drag and drop</p>
							<p>(SVG, JPG, PNG, or gif maximum 900x400)</p> */}
						</div>
						{/* <TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell align='right'>File name</TableCell>
										<TableCell align='right'>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map(row => (
										<TableRow
											key={row.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component='th' scope='row'>
												{row.name}
											</TableCell>
											<TableCell align='right'>{row.calories}</TableCell>
											<TableCell align='right'>{row.fat}</TableCell>
											<TableCell align='right'>{row.carbs}</TableCell>
											<TableCell align='right'>{row.protein}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer> */}
					</div>
				</aside>
			</section>
		</>
	)
}
