import { Button } from '@mui/material'
import './brands.css'
import { Link } from 'react-router-dom'

export default function Brands() {
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
					<Button variant='contained'>Add New</Button>
				</div>
			</div>
		</>
	)
}
