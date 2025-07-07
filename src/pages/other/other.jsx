import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Category from '../category/category'
import { categoryStore } from '../../store/categoryStore'
import { Toaster } from 'sonner'

const Other = () => {
	const { addModal, setAddModal } = categoryStore()

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
					<Button variant='contained' color='inherit'>
						<Link style={{ textDecoration: 'none' }} to={'/other'}>
							Categories
						</Link>
					</Button>
					<Button variant='outlined'>
						<Link style={{ textDecoration: 'none' }} to={'/brands'}>
							Brands
						</Link>
					</Button>
					<Button variant='outlined'>
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
			<Category />
		</>
	)
}
<Toaster richColors position='bottom-right' />

export default Other
