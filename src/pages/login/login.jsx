import { useState } from 'react'
import logo from '../../assets/logo.png'
import './login.css'
import { Button, TextField } from '@mui/material'
import { useLoginStore } from '../../store/loginStore'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../../utils/token'

export default function Login() {
	const { login, wrong } = useLoginStore()

	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	async function handleLogin() {
		const user = {
			userName: name,
			password: password,
		}
		let result = await login(user)
		// console.log(result.success)
		if (result.success) {
			navigate('/')
			setName('')
			setPassword('')
		} else {
			console.log(result.error)
		}
	}

	return (
		<>
			<section className='loginSec'>
				<aside className='loginDarkSide'>
					<div style={{ marginTop: '300px', marginLeft: '50px' }}>
						<h1 className='' style={{ fontSize: '25px' }}>
							Welcome to admin panel
						</h1>
						<img src={logo} className='logo' alt='' />
					</div>
				</aside>
				<aside className='loginSide'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
							gap: '20px',
							width: '50%',
							marginTop: '250px',
						}}
					>
						<h2>Login</h2>
						<TextField
							id='outlined-basic'
							label='Name'
							variant='outlined'
							sx={{ width: '100%' }}
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<TextField
							id='outlined-basic'
							label='Password'
							variant='outlined'
							sx={{ width: '100%' }}
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '50%',
							gap: '20px',
						}}
					>
						<Button>Forgot password?</Button>
						<Button
							variant='contained'
							sx={{ width: '100%' }}
							onClick={handleLogin}
						>
							Login
						</Button>
						{wrong && <p style={{ color: 'red' }}>Something is go wrong❗</p>}
					</div>
				</aside>
			</section>
		</>
	)
}
