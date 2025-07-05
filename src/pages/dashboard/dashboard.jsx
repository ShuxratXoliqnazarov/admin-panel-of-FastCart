// const Dashboard = () => {
//   return <div>Dashboard</div>;
// };

// export default Dashboard;

import {
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material'
import { useState } from 'react'
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
	{ month: 'Jan', orders: 5 },
	{ month: 'Feb', orders: 12 },
	{ month: 'Mar', orders: 8 },
	{ month: 'Apr', orders: 22 },
	{ month: 'May', orders: 35 },
	{ month: 'Jun', orders: 40 },
	{ month: 'Jul', orders: 47 },
	{ month: 'Aug', orders: 38 },
	{ month: 'Sep', orders: 20 },
	{ month: 'Oct', orders: 20 },
	{ month: 'Nov', orders: 25 },
	{ month: 'Dec', orders: 30 },
]

const topProducts = [
	{ name: 'Men Grey Hoodie', price: '$49.90', units: 204 },
	{ name: 'Women Striped T-Shirt', price: '$34.90', units: 155 },
	{ name: 'Women White T-Shirt', price: '$40.90', units: 120 },
	{ name: 'Men White T-Shirt', price: '$49.90', units: 90 },
	{ name: 'Women Red T-Shirt', price: '$34.90', units: 155 },
]

const recentTransactions = [
	{
		name: 'Jagarnath S.',
		date: '24.05.2023',
		amount: '$124.97',
		status: 'Paid',
	},
	{ name: 'Anand G.', date: '23.05.2023', amount: '$55.42', status: 'Pending' },
	{ name: 'Kartik S.', date: '23.05.2023', amount: '$89.90', status: 'Paid' },
	{
		name: 'Rakesh S.',
		date: '22.05.2023',
		amount: '$144.94',
		status: 'Pending',
	},
	{ name: 'Anup S.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
	{ name: 'Jimmy P.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
]

export default function Dashboard() {
	return (
		<Box p={4}>
			<Grid container spacing={3} mb={4}>
				{[
					{ label: 'Sales', value: '$152k', color: '#fda4af' },
					{ label: 'Cost', value: '$99.7k', color: '#fef08a' },
					{ label: 'Profit', value: '$32.1k', color: '#bbf7d0' },
				].map((item, i) => (
					<Grid item xs={12} md={4} key={i}>
						<Card
							sx={{
								borderLeft: `6px solid ${item.color}`,
								'&:hover': { boxShadow: 6 },
								transition: '0.3s',
							}}
						>
							<CardContent>
								<Typography color='text.secondary'>{item.label}</Typography>
								<Typography variant='h5' fontWeight='bold'>
									{item.value}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					<Card>
						<CardContent>
							<Typography variant='h6' fontWeight='bold' mb={2}>
								Sales Revenue
							</Typography>
							<ResponsiveContainer width='100%' height={200}>
								<LineChart data={salesData}>
									<XAxis dataKey='month' />
									<Tooltip formatter={value => `${value} Orders`} />
									<Line
										type='monotone'
										dataKey='orders'
										stroke='#3b82f6'
										strokeWidth={3}
										activeDot={{ r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={4}>
					<Card>
						<CardContent>
							<Typography variant='h6' fontWeight='bold' mb={2}>
								Top Selling Products
							</Typography>
							{Array(5)
								.fill()
								.map((_, i) => (
									<Box
										key={i}
										display='flex'
										justifyContent='space-between'
										alignItems='center'
										py={1}
										sx={{
											borderBottom: i !== 4 ? '1px solid #eee' : 'none',
											'&:hover': { backgroundColor: 'gray' },
										}}
									>
										<Box>
											<Typography fontWeight='medium'>
												Healthcare Erbology
											</Typography>
											<Typography variant='caption'>in Accessories</Typography>
										</Box>
										<Typography color='primary' fontWeight='bold'>
											13,153
										</Typography>
									</Box>
								))}
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h6' fontWeight='bold' mb={2}>
								Recent Transactions
							</Typography>
							<TableContainer>
								<Table size='small'>
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Date</TableCell>
											<TableCell>Amount</TableCell>
											<TableCell>Status</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{recentTransactions.map((row, i) => (
											<TableRow key={i} hover>
												<TableCell>{row.name}</TableCell>
												<TableCell>{row.date}</TableCell>
												<TableCell>{row.amount}</TableCell>
												<TableCell>
													<Chip
														label={row.status}
														color={
															row.status === 'Paid' ? 'success' : 'warning'
														}
														variant='outlined'
													/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h6' fontWeight='bold' mb={2}>
								Top Products by Units Sold
							</Typography>
							<TableContainer>
								<Table size='small'>
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Price</TableCell>
											<TableCell>Units</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{topProducts.map((row, i) => (
											<TableRow key={i} hover>
												<TableCell>{row.name}</TableCell>
												<TableCell>{row.price}</TableCell>
												<TableCell>{row.units}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	)
}
