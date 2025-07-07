import './sub.css'
import { Link } from 'react-router-dom'
import { useSub } from '../../store/subCategory'
import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { categoryStore } from '../../store/categoryStore'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Toaster } from 'sonner'

export default function Sub() {
	const { getSub, subCategories, addSub, delSub, editFunc } = useSub()
	const { getCategory, categories } = categoryStore()

	const handleClose = () => {
		onClose(selectedValue)
	}

	// ! Add

	const [addModal, setAddModal] = useState(false)
	const [subName, setSubName] = useState('')
	const [categoryId, setCategoryId] = useState(null)

	function handleSave() {
		let newSub = {
			CategoryId: categoryId,
			SubCategoryName: subName,
		}
		addSub(newSub)

		setAddModal(false)
		setSubName('')
		setCategoryId(null)
	}

	//! Edit

	const [editModal, setEditModal] = useState(false)
	const [editName, setEditName] = useState('')
	const [catId, setCatId] = useState(null)
	const [subId, setSubId] = useState(null)

	function handleEdit(el) {
		categories.find(cat =>
			cat.subCategories.find(sub => sub.id === el.id) ? setCatId(cat.id) : null
		)
		setSubId(el.id)
		setEditName(el.subCategoryName)
		setEditModal(true)
		console.log(el)
	}

	function edit() {
		const edited = {
			Id: subId,
			CategoryId: catId,
			SubCategoryName: editName,
		}

		editFunc(edited)
		setEditModal(false)
		setEditName('')
		setSubId(null)
		setCatId(null)
	}

	useEffect(() => {
		getSub()
		getCategory()
	}, [])

	return (
		<>
			<h1>Subcategories</h1>
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
					<Button variant='outlined' color='inherit'>
						<Link style={{ textDecoration: 'none' }} to={'/brands'}>
							Brands
						</Link>
					</Button>
					<Button variant='contained' color='inherit'>
						<Link style={{ textDecoration: 'none' }} to={'/subCategories'}>
							SubCategories
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
				{subCategories?.map(el => (
					<article className='brand' key={el.id}>
						<h1>{el.subCategoryName}</h1>
						<div>
							<Button onClick={() => handleEdit(el)}>
								<BorderColorOutlinedIcon />
							</Button>
							<Button color='error' onClick={() => delSub(el.id)}>
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
					<Box sx={{ minWidth: 120, width: '100%' }}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Categories</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={categoryId}
								label='Categories'
								onChange={e => setCategoryId(e.target.value)}
							>
								{categories?.map(el => (
									<MenuItem value={el.id}>{el.categoryName}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<TextField
						id='outlined-basic'
						label='Subcategory name'
						variant='outlined'
						value={subName}
						onChange={e => setSubName(e.target.value)}
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
						<Button color='' variant='contained' onClick={handleSave}>
							Save
						</Button>
					</div>
				</Box>
			</Dialog>

			{/* //! edit Modal */}

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
						<Button color='' variant='contained' onClick={edit}>
							Edit
						</Button>
					</div>
				</Box>
			</Dialog>
			<Toaster richColors position='bottom-right' />
		</>
	)
}
