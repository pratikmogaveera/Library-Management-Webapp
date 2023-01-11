import { useState } from 'react'
import axios from 'axios'
import styles from '../styles'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ username, password }).unwrap()
            dispatch(setCredentials({ ...res, user: username }))
            setUsername('')
            setPassword('')
            navigate('/home')
        } catch (err) {
            if (!err?.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Check credentials.')
            } else {
                setErrMsg('Login Failed')
            }
        }
    }


    return (
        <div className={`${styles.fullScreen}`}>
            <Navbar />
            <div className={`${styles.flexCenter} h-full bg-gradient-to-b from-[#5F50a9] to-[#2f1c7c]`}>
                <form className="w-[300px] h-fit bg-[#ededed] rounded-lg p-4 flex flex-col justify-center gap-4">
                    {errMsg && <p className="errmsg">{errMsg}</p>}
                    <h1 className="text-[#5F50a9] font-bold text-[40px] mb-2 mt-5">Sign In:</h1>

                    <div className="w-full">
                        <label htmlFor="usernameField" className="font-semibold text-[#5F50a9]">Username:</label>
                        <input
                            id="usernameField"
                            name="username"
                            value={username}
                            className="form-input"
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className="w-full">
                        <label htmlFor="passwordField" className="font-semibold text-[#5F50a9]">Password:</label>
                        <input
                            id="passwordField"
                            name="password"
                            value={password}
                            className="form-input"
                            placeholder='Password'
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <button type="submit" className="form-button w-full mb-4" onClick={(e) => handleSubmit(e)}>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login