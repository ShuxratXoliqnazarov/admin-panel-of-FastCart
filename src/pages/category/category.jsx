import { categoryStore } from '../../store/categoryStore'
import { API } from '../../utils/config'
import './category.css'
import { useEffect, useState } from 'react'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Upload } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default function Category() {
	const {
		categories,
		getCategory,
		setAddModal,
		addModal,
		addCategory,
		delCategory,
		editModal,
		setEditModal,
		editCotegory,
	} = categoryStore()

	const [image, setImage] = useState('')
	const [categoryName, setCategoryName] = useState('')

	const handleClose = () => {
		onClose(selectedValue)
	}

	function handleAdd() {
		const formData = new FormData()
		formData.append('CategoryName', categoryName)
		for (let i = 0; i < image.length; i++) {
			formData.append('CategoryImage', image[i])
		}

		addCategory(formData)

		setImage('')
		setCategoryName('')
	}

	const [editName, setEditName] = useState('')
	const [idx, setIdx] = useState(null)
	const [editImage, setEditImage] = useState(null)

	function handleEdit(el) {
		setEditModal(true)
		setIdx(el.id)
		setEditName(el.categoryName)
	}

	function editFunc() {
	const formData = new FormData()
	formData.append('CategoryName', editName)
	formData.append('id', idx)

	if (editImage) {
		for (let i = 0; i < editImage.length; i++) {
			formData.append('CategoryImage', editImage[i])
		}
	}

	editCotegory(formData)
	setEditName('')
	setIdx(null)
	setImage('')
	setEditModal(false)
}


	useEffect(() => {
		getCategory()
	}, [])

	return (
		<>
			<section className='catSec'>
				{categories?.map(el => (
					<article className='category' key={el.id}>
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
						>
							<img src={`${API}/images/${el.categoryImage}`} alt='' />
							<h1>{el.categoryName}</h1>
						</div>
						<div
							style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
						>
							<Button onClick={() => handleEdit(el)}>
								<BorderColorOutlinedIcon />
							</Button>
							<Button color='error' onClick={() => delCategory(el.id)}>
								<DeleteOutlineIcon />
							</Button>
						</div>
					</article>
				))}
			</section>

			{/* //! Add Modal */}

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
						value={categoryName}
						onChange={e => setCategoryName(e.target.value)}
						sx={{ width: '100%' }}
					/>
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

			{/* //! Edit Modal */}
			<Dialog onClose={handleClose} open={editModal}>
				<DialogTitle>Edit Category</DialogTitle>
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
							// multiple
							hidden
							// value={image}
							onChange={e => setEditImage(e.target.files)}
						/>
						<Upload size={20} style={{ marginBottom: 4, margin: 'auto' }} />
						<Typography variant='body2'>
							Click to upload or drag and drop
						</Typography>
						<Typography variant='caption'>
							(SVG, JPG, PNG, or GIF maximum 900×400)
						</Typography>
					</Paper>

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
