// const Orders = () => {
// 	return (
// 		<>
// 			<h1>orders</h1>
// 		</>
// 	)
// }

// export default Orders


import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Pagination,
  IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';

const orders = [
  { id: '#12512B', date: 'May 5, 4:20 PM', customer: 'Tom Anderson', payment: 'Paid', status: 'Ready', total: '$49.90' },
  { id: '#12523C', date: 'May 5, 4:15 PM', customer: 'Jayden Walker', payment: 'Paid', status: 'Ready', total: '$34.36' },
  { id: '#51232A', date: 'May 5, 4:15 PM', customer: 'Inez Kim', payment: 'Paid', status: 'Ready', total: '$5.51' },
  { id: '#23534D', date: 'May 5, 4:12 PM', customer: 'Francisco Henry', payment: 'Paid', status: 'Shipped', total: '$29.74' },
  { id: '#51323C', date: 'May 5, 4:12 PM', customer: 'Violet Phillips', payment: 'Paid', status: 'Shipped', total: '$23.06' },
  { id: '#35622A', date: 'May 5, 4:12 PM', customer: 'Rosetta Becker', payment: 'Paid', status: 'Shipped', total: '$87.44' },
  { id: '#34232D', date: 'May 5, 4:10 PM', customer: 'Dean Love', payment: 'Paid', status: 'Ready', total: '$44.55' },
  { id: '#56212D', date: 'May 5, 4:08 PM', customer: 'Nettie Tyler', payment: 'Paid', status: 'Ready', total: '$36.79' },
  { id: '#23534D', date: 'May 5, 4:04 PM', customer: 'Miguel Harris', payment: 'Pending', status: 'Ready', total: '$50.54' },
  { id: '#12523C', date: 'May 5, 4:04 PM', customer: 'Angel Conner', payment: 'Pending', status: 'Ready', total: '$63.47' },
  { id: '#51232A', date: 'May 5, 4:03 PM', customer: 'Rosalie Singleton', payment: 'Pending', status: 'Received', total: '$91.63' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Paid': return 'success';
    case 'Pending': return 'warning';
    default: return 'default';
  }
};

const getOrderColor = (status) => {
  switch (status) {
    case 'Ready': return 'warning';
    case 'Shipped': return 'info';
    case 'Received': return 'primary';
    default: return 'default';
  }
};

export default function Orders() {
  const [filter, setFilter] = useState('Newest');

  return (
    <Box p={4}>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
        <Typography variant='h5' fontWeight='bold'>Orders</Typography>
        <Button variant='contained' startIcon={<Add />}>
          Add order
        </Button>
      </Box>

      <Box display='flex' gap={2} mb={3}>
        <TextField placeholder='Search…' variant='outlined' size='small' />
        <FormControl size='small'>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} label='Filter' onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value='Newest'>Newest</MenuItem>
            <MenuItem value='Oldest'>Oldest</MenuItem>
          </Select>
        </FormControl>

        <IconButton><Edit /></IconButton>
        <IconButton><Delete /></IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'><Checkbox /></TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment status</TableCell>
              <TableCell>Order status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow hover key={index}>
                <TableCell padding='checkbox'><Checkbox /></TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Chip label={order.payment} color={getStatusColor(order.payment)} variant='outlined' />
                </TableCell>
                <TableCell>
                  <Chip label={order.status} color={getOrderColor(order.status)} variant='outlined' />
                </TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display='flex' justifyContent='space-between' alignItems='center' mt={2}>
        <Pagination count={24} page={2} color='primary' />
        <Typography variant='body2'>274 Results</Typography>
      </Box>
    </Box>
  );
}