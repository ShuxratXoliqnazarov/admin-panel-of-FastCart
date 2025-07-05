import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import './brands.css'
import { Link } from 'react-router-dom'
import { useBrandStore } from '../../store/brandStore'
import { useEffect, useState } from 'react'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'

export default function Brands() {
	const { brands, getBrands, addBrand, delBrand, editBrand } = useBrandStore()

	const [addModal, setAddModal] = useState(false)
	const [brandName, setBrandName] = useState('')

	const handleClose = () => {
		onClose(selectedValue)
	}

	function handleAdd() {
		let brand = {
			BrandName: brandName,
		}

		addBrand(brand)
		setBrandName('')
		setAddModal(false)
	}

	const [editModal, setEditModal] = useState(false)
	const [editName, setEditName] = useState('')
	const [idx, setIdx] = useState(null)

	function handleEdit(el) {
		setEditModal(true)
		setIdx(el.id)
		setEditName(el.brandName)
	}

	function editFunc() {
		let editUser = {
			Id: idx,
			BrandName: editName,
		}

		editBrand(editUser)
		setEditModal(false)
		setEditName('')
		setIdx(null)
	}

	useEffect(() => {
		getBrands()
	}, [])

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: '30px 0px',
				}}
			>
				<div style={{ display: 'flex', gap: '10px' }}>
					<Button variant='outlined'>
						<Link style={{ textDecoration: 'none' }} to={'/other'}>
							Categories
						</Link>
					</Button>
					<Button variant='contained' color='inherit'>
						<Link style={{ textDecoration: 'none' }} to={'/brands'}>
							Brands
						</Link>
					</Button>
				</div>

				<div>
					<Button variant='contained' onClick={() => setAddModal(true)}>
						Add New
					</Button>
				</div>
			</div>

			<section className='brandsSec'>
				{brands?.map(el => (
					<article className='brand' key={el.id}>
						<h1>{el.brandName}</h1>
						<div>
							<Button onClick={() => handleEdit(el)}>
								<BorderColorOutlinedIcon />
							</Button>
							<Button color='error' onClick={() => delBrand(el.id)}>
								<DeleteOutlineIcon />
							</Button>
						</div>
					</article>
				))}
			</section>

			{/* //! add Modal  */}

			<Dialog onClose={handleClose} open={addModal}>
				<DialogTitle>Add New Category</DialogTitle>
				<Box
					style={{
						padding: 20,
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						alignItems: 'end',
					}}
				>
					<TextField
						id='outlined-basic'
						label='Category name'
						variant='outlined'
						value={brandName}
						onChange={e => setBrandName(e.target.value)}
						sx={{ width: '100%' }}
					/>

					<div style={{ display: 'flex', gap: '20px' }}>
						<Button
							color='error'
							variant='text'
							onClick={() => setAddModal(false)}
						>
							Cancel
						</Button>
						<Button color='' variant='contained' onClick={handleAdd}>
							Save
						</Button>
					</div>
				</Box>
			</Dialog>

			{/* //! eidt Modal  */}
			<Dialog onClose={handleClose} open={editModal}>
				<DialogTitle>Add New Category</DialogTitle>
				<Box
					style={{
						padding: 20,
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						alignItems: 'end',
					}}
				>
					<TextField
						id='outlined-basic'
						label='Category name'
						variant='outlined'
						value={editName}
						onChange={e => setEditName(e.target.value)}
						sx={{ width: '100%' }}
					/>

					<div style={{ display: 'flex', gap: '20px' }}>
						<Button
							color='error'
							variant='text'
							onClick={() => setEditModal(false)}
						>
							Cancel
						</Button>
						<Button color='' variant='contained' onClick={editFunc}>
							Save
						</Button>
					</div>
				</Box>
			</Dialog>
		</>
	)
}
